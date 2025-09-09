import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { serverApi } from "~/core/api/server/serverApi";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    tokenType?: string;
    expiresIn?: number;
    scope?: string;
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
  }
}

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await serverApi.auth.login(
            credentials.email,
            credentials.password
          );
          console.log("!@!", response);

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
        } catch (error: unknown) {
          console.error("Authentication error:", error);
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
            // Store backend tokens in user object
            const userWithTokens = user;
            userWithTokens.accessToken = tokenData.access_token;
            userWithTokens.refreshToken = tokenData.refresh_token;
            userWithTokens.tokenType = tokenData.token_type;
            userWithTokens.expiresIn = tokenData.expires_in;
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

        const expiresAt = Date.now() + (userWithTokens.expiresIn || 0) * 1000;
        token.expiresAt = expiresAt;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.expiresAt as number)) {
        return token;
      }

      // Access token has expired, try to refresh it
      try {
        const response = await serverApi.auth.refresh();

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
      } catch (error) {
        console.error("Token refresh failed:", error);
      }

      // Return null to force sign out
      return null;
    },

    async session({ session, token }) {
      if (token.accessToken) {
        const sessionWithTokens = session;
        sessionWithTokens.accessToken = token.accessToken;
        sessionWithTokens.tokenType = token.tokenType;
        sessionWithTokens.expiresIn = token.expiresIn;
        sessionWithTokens.scope = token.scope;
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
