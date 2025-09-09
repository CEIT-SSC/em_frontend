import NextAuth, { AuthOptions } from "next-auth";
import { serverApi } from "@/lib/api/server/serverApi";
import { Provider } from "next-auth/providers";
import { getRequestConfig } from "next-intl/server";

// Types for SSC OAuth provider
interface SSCProviderOptions {
  clientId: string;
  clientSecret: string;
}

interface SSCProfile {
  id?: number;
  sub?: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

// Custom OAuth2 Provider for SSC SSO
function SSCProvider(options: SSCProviderOptions): Provider {
  return {
    id: "ssc",
    name: "SSC SSO",
    type: "oauth",
    authorization: {
      url: "http://localhost:3000/login",
      params: {
        client_id: options.clientId,
        scope: "read write",
        response_type: "code",
      },
    },
    token: {
      url: "https://aut-ssc.ir/api/o/token/",
    },
    userinfo: {
      url: "https://aut-ssc.ir/api/profile/",
    },

    clientId: options.clientId,
    clientSecret: options.clientSecret,
    checks: ["pkce"],
    profile(profile: SSCProfile) {
      return {
        id: profile.id?.toString() || profile.sub || "",
        name: `${profile.first_name || ""} ${profile.last_name || ""}`.trim(),
        email: profile.email,
        image: null,
      };
    },
  };
}

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
    provider?: string;
  }
}

const authOptions: AuthOptions = {
  providers: [
    SSCProvider({
      clientId: process.env.SSC_CLIENT_ID,
      clientSecret: process.env.SSC_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "ssc") {
        try {
          // Store OAuth tokens in user object
          const userWithTokens = user;
          userWithTokens.accessToken = account.access_token;
          userWithTokens.refreshToken = account.refresh_token;
          userWithTokens.tokenType = account.token_type || "Bearer";
          userWithTokens.expiresIn = (account.expires_in as number) || 3600;
          return true;
        } catch (error) {
          console.error("Error handling SSC OAuth tokens:", error);
          return false;
        }
      }

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
        token.provider = account.provider; // Store provider info for refresh logic

        const expiresAt = Date.now() + (userWithTokens.expiresIn || 0) * 1000;
        token.expiresAt = expiresAt;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.expiresAt as number)) {
        return token;
      }

      // Access token has expired, try to refresh it
      try {
        // For SSC OAuth tokens, use OAuth2 refresh endpoint
        if (token.provider === "ssc" && token.refreshToken) {
          const response = await fetch("https://aut-ssc.ir/api/o/token/", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "refresh_token",
              refresh_token: token.refreshToken as string,
              client_id: "kdVriPPfTLS4LbwmKj18Q4iiVhhvii8qxVJKKEWp",
              client_secret: process.env.SSC_CLIENT_SECRET || "",
            }),
          });

          if (response.ok) {
            const refreshedTokens = await response.json();

            if (refreshedTokens.success && refreshedTokens.data) {
              const newTokenData = refreshedTokens.data;
              token.accessToken = newTokenData.access_token;
              token.refreshToken =
                newTokenData.refresh_token || token.refreshToken;
              token.tokenType = newTokenData.token_type;
              token.expiresIn = newTokenData.expires_in;

              // Update expiry time
              const expiresAt = Date.now() + newTokenData.expires_in * 1000;
              token.expiresAt = expiresAt;

              return token;
            }
          }
        } else {
          // For other providers, use serverApi refresh
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

    async redirect({ url, baseUrl }) {
      return `${baseUrl}/fa/auth/login`;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
