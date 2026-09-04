import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { serverApi } from "~/core/api/server/serverApi";
import axios from "axios";
import { BASE_URL } from "@ssc/core";
import { UserProfileResponse } from "@ssc/core/lib/types/api/User/user";
import { RequestResponse } from "@ssc/core/lib/types/api/general";

declare module "next-auth" {
  interface Session {
    error?: "RefreshAccessTokenError";
    user: {
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null | undefined;
      image?: string | null | undefined;
      id?: string;
      skyUsername?: string;
      skyPassword?: string;
    };
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
    tokenType?: string;
    expiresIn?: number;
    scope?: string;
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
    error?: "RefreshAccessTokenError";
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

        try {
          const response = await serverApi.auth.login(
            credentials.email,
            credentials.password,
            process.env.SSC_PUBLIC_CLIENT_ID!
          );

          if (response.status === 200 && response.data?.success) {
            const tokenData = response.data.data;
            return {
              id: "1",
              email: credentials.email,
              accessToken: tokenData.access_token,
              refreshToken: tokenData.refresh_token,
              tokenType: tokenData.token_type,
              expiresIn: tokenData.expires_in,
              scope: tokenData.scope,
            };
          }
        } catch {
          console.error("SSC authentication failed");
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

            if (user) {
              user.accessToken = tokenData.access_token;
              user.refreshToken = tokenData.refresh_token;
              user.tokenType = tokenData.token_type;
              user.expiresIn = tokenData.expires_in;
              user.scope = tokenData.scope;
            }

            return true;
          } else {
            console.error("Backend social authentication failed");
            return false;
          }
        } catch {
          console.error("Backend social authentication failed");
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
        const expiresIn = user.expiresIn ?? 900;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.tokenType = user.tokenType ?? "Bearer";
        token.expiresIn = expiresIn;
        token.scope = user.scope;
        token.expiresAt = Date.now() + expiresIn * 1000;
        delete token.error;
      }

      if (token.accessToken && Date.now() < (token.expiresAt ?? 0)) {
        return token;
      }

      if (!token.refreshToken) {
        return {
          ...token,
          accessToken: undefined,
          error: "RefreshAccessTokenError",
        };
      }

      try {
        const response = await serverApi.auth.refresh(
          token.refreshToken,
          process.env.SSC_PUBLIC_CLIENT_ID!
        );

        if (response.status === 200 && response.data?.success) {
          const refreshed = response.data.data;
          const expiresIn = refreshed.expires_in ?? token.expiresIn ?? 900;
          return {
            ...token,
            accessToken: refreshed.access_token,
            refreshToken: refreshed.refresh_token ?? token.refreshToken,
            tokenType: refreshed.token_type ?? token.tokenType,
            expiresIn,
            scope: refreshed.scope ?? token.scope,
            expiresAt: Date.now() + expiresIn * 1000,
            error: undefined,
          };
        }
      } catch {
        console.error("SSC token refresh failed");
      }

      return {
        ...token,
        accessToken: undefined,
        error: "RefreshAccessTokenError",
      };
    },

    async session({ session, token }) {
      session.error = token.error;

      if (token.accessToken) {
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

        session.user.id = token.sub;
        session.user.firstName = user.first_name;
        session.user.lastName = user.last_name;
        session.user.email = user.email;
        session.user.image = user.profile_picture;
        session.user.skyUsername = user.sky_username;
        session.user.skyPassword = user.sky_password;
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
