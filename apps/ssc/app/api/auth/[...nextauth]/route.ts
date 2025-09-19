import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { serverApi } from "~/core/api/server/serverApi";
import axios from "axios";
import { BASE_URL } from "@ssc/core";
import { UserProfileResponse } from "@ssc/core/lib/types/api/User/user";
import { RequestResponse } from "@ssc/core/lib/types/api/general";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    tokenType?: string;
    expiresIn?: number;
    scope?: string;
    handshakeToken?: string;
    user: {
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null | undefined;
      image?: string | null | undefined;
    };
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
    tokenType?: string;
    expiresIn?: number;
    scope?: string;
    handshakeToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    tokenType?: string;
    expiresIn?: number;
    scope?: string;
    expiresAt?: number;
    handshakeToken?: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        client_id: { label: "Client ID", type: "text" },
        code_challenge: { label: "Code Challenge", type: "text" },
        redirect_uri: { label: "Redirect URI", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const redirectUri = credentials.redirect_uri;
        try {
          const response = await serverApi.auth.login(
            credentials.email,
            credentials.password,
            process.env.SSC_PUBLIC_CLIENT_ID
          );

          if (response.status === 200 && response.data?.success) {
            const tokenData = response.data.data;
            if (redirectUri !== "null") {
              const { data: handshakeResponse } =
                await serverApi.auth.authorizeWithToken(
                  tokenData.refresh_token
                );

              return {
                id: "1",
                email: credentials.email,
                accessToken: tokenData.access_token,
                refreshToken: tokenData.refresh_token,
                tokenType: tokenData.token_type,
                expiresIn: tokenData.expires_in,
                scope: tokenData.scope,
                handshakeToken: handshakeResponse.data.handshake_token,
              };
            }

            return {
              id: "1",
              accessToken: tokenData.access_token,
              refreshToken: tokenData.refresh_token,
              tokenType: tokenData.token_type,
              expiresIn: tokenData.expires_in,
              scope: tokenData.scope,
            };
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.error(
            "Authentication error:",
            error.message,
            error.request,
            error.response
          );
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const response = await serverApi.auth.googleAuth({
            access_token: account.access_token,
            id_token: account.id_token,
          });

          if (response.status === 200 && response.data?.success) {
            const tokenData = response.data.data;

            // Store tokens in user object for later use in jwt callback
            if (user) {
              user.accessToken = tokenData.access_token;
              user.refreshToken = tokenData.refresh_token;
              user.tokenType = tokenData.token_type;
              user.expiresIn = tokenData.expires_in;
              user.scope = tokenData.scope;

              // Get handshake token for OAuth redirect flow
              try {
                const { data: handshakeResponse } =
                  await serverApi.auth.authorizeWithToken(
                    tokenData.refresh_token
                  );
                user.handshakeToken = handshakeResponse.data.handshake_token;
              } catch (handshakeError) {
                console.error("Error getting handshake token:", handshakeError);
                // Continue without handshake token - it might not be required for all flows
              }
            }

            return true;
          } else {
            console.error(
              "Backend Google authentication failed:",
              response.data
            );
            return false;
          }
        } catch (error) {
          console.error("Error authenticating with backend:", error);
          return false;
        }
      }

      // Allow credentials provider sign in
      if (account?.provider === "credentials") {
        return true;
      }

      return false;
    },

    async jwt({ token, user, account }) {
      if (user && account) {
        const userWithTokens = user;
        token.accessToken = userWithTokens.accessToken;
        token.refreshToken = userWithTokens.refreshToken;
        token.tokenType = userWithTokens.tokenType;
        token.expiresIn = userWithTokens.expiresIn;
        token.scope = userWithTokens.scope;
        token.handshakeToken = userWithTokens.handshakeToken;

        const expiresAt = Date.now() + (userWithTokens.expiresIn || 0) * 1000;
        token.expiresAt = expiresAt;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() <= (token.expiresAt as number)) {
        return token;
      }

      // Access token has expired, try to refresh it
      console.log("!@! lets refresh", token);
      try {
        const response = await serverApi.auth.refresh(
          token.refreshToken,
          process.env.SSC_PUBLIC_CLIENT_ID
        );

        if (response.status === 200 && response.data?.success) {
          const newTokenData = response.data.data;

          token.accessToken = newTokenData.access_token;
          token.refreshToken = newTokenData.refresh_token;
          token.tokenType = newTokenData.token_type;
          token.expiresIn = newTokenData.expires_in;

          // Update expiry time
          const expiresAt = Date.now() + newTokenData.expires_in * 1000;
          token.expiresAt = expiresAt;

          return token;
        }
      } catch (_error) {
        return null;
        // console.error("Token refresh failed:", error);
      }

      // Return null to force sign out
      return null;
    },

    async session({ session, token }) {
      if (token.accessToken) {
        // hardcoded to be able to send token via request
        // it's not valuable to change axios instance (we should use next-auth getServerSession there)
        // if later we need more stuff like this, we will refactor core to support it
        const {
          data: { data: user },
        } = await axios.get<
          UserProfileResponse,
          RequestResponse<UserProfileResponse>
        >(`${BASE_URL}/profile/`, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        });

        const sessionWithTokens = session;
        sessionWithTokens.accessToken = token.accessToken;
        sessionWithTokens.tokenType = token.tokenType;
        sessionWithTokens.expiresIn = token.expiresIn;
        sessionWithTokens.scope = token.scope;
        sessionWithTokens.handshakeToken = token.handshakeToken;
        sessionWithTokens.user.firstName = user.first_name;
        sessionWithTokens.user.lastName = user.last_name;
        sessionWithTokens.user.email = user.email;
        sessionWithTokens.user.image = user.profile_picture;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
