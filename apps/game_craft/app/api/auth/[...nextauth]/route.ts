import { BASE_URL } from "@ssc/core";
import { serverApi } from "lib/api/server/serverApi";
import NextAuth, { AuthOptions } from "next-auth";
import { Provider } from "next-auth/providers";
import { getRequestConfig } from "next-intl/server";

interface SSCProviderOptions {
  clientId: string;
  clientSecret?: string;
}

interface SSCProfile {
  success?: boolean;
  data?: {
    id?: number;
    email: string;
    first_name?: string;
    last_name?: string;
    profile_picture?: string;
    phone_number?: string;
    date_joined?: string;
    sky_username?: string;
    sky_password?: string;
  };

  // Direct fields for fallback
  id?: number;
  sub?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  profile_picture?: string;
  sky_username?: string;
  sky_password?: string;
}

function SSCProvider(options: SSCProviderOptions): Provider {
  return {
    id: "ssc",
    name: "SSC SSO",
    type: "oauth",
    authorization: {
      url: `${
        process.env.NEXT_PUBLIC_SSC_URL || "http://localhost:3000"
      }/login`,
      params: {
        scope: "read write",
        response_type: "code",
      },
    },
    token: {
      url: `${BASE_URL}/o/token/`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async request(context: any) {
        const { params, checks } = context;
        console.log("Full token request context:", context);

        const formData = new URLSearchParams();
        formData.append("grant_type", "authorization_code");
        formData.append("code", params.code);
        formData.append("client_id", process.env.SSC_CLIENT_ID!);
        formData.append(
          "redirect_uri",
          `${
            process.env.NEXTAUTH_URL || "http://localhost:3001"
          }/api/auth/callback/ssc`
        );

        const codeVerifier = checks?.code_verifier || params.code_verifier;
        if (codeVerifier) {
          formData.append("code_verifier", codeVerifier);
        } else {
          console.warn("PKCE code_verifier not found in context!");
        }

        console.log("Sending form data:", Object.fromEntries(formData));

        const response = await fetch(`${BASE_URL}/o/token/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          body: formData,
        });

        console.log("!@!", response);
        const result = await response.json();
        console.log("Token response from Django:", result);

        if (!response.ok) {
          const errorDetail =
            result.errors?.detail ||
            result.error_description ||
            result.error ||
            "Token exchange failed";
          throw new Error(`Token exchange failed: ${errorDetail}`);
        }

        const tokens = result.data || result;

        if (!tokens.access_token) {
          console.error("No access_token in response:", tokens);
          throw new Error("access_token not found in response");
        }

        return {
          tokens: {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            token_type: tokens.token_type || "Bearer",
            expires_in: tokens.expires_in,
            scope: tokens.scope,
          },
        };
      },
    },
    userinfo: {
      url: `${BASE_URL}/profile/`,
    },

    clientId: options.clientId,
    // Don't include clientSecret for PKCE flow
    client: {
      token_endpoint_auth_method: "none",
    },
    checks: ["pkce", "state"],
    profile(profile: SSCProfile) {
      console.log("Processing profile:", profile);

      const userData = profile.data || profile;

      return {
        id: userData.id?.toString() || userData.email || "",
        name: `${userData.first_name || ""} ${userData.last_name || ""}`.trim(),
        email: userData.email,
        image: userData.profile_picture,
        skyUsername: userData.sky_username,
        skyPassword: userData.sky_password,
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

    skyUsername?: string;
    skyPassword?: string;
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
    tokenType?: string;
    expiresIn?: number;
    scope?: string;

    skyUsername?: string;
    skyPassword?: string;
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

    skyUsername?: string;
    skyPassword?: string;
  }
}

const authOptions: AuthOptions = {
  providers: [
    SSCProvider({
      clientId: process.env.SSC_CLIENT_ID,
    }),
  ],
  // debug: true, // Enable debug mode
  // logger: {
  //   error(code, metadata) {
  //     console.error("NextAuth Error:", code, metadata);
  //   },
  //   warn(code) {
  //     console.warn("NextAuth Warning:", code);
  //   },
  //   debug(code, metadata) {
  //     console.log("NextAuth Debug:", code, metadata);
  //   },
  // },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("SignIn callback triggered:", {
        provider: account?.provider,
        user: user?.email,
        accountKeys: account ? Object.keys(account) : null,
        profile: profile,
      });

      if (account?.provider === "ssc") {
        try {
          console.log("SSC account data:", account);
          // Store OAuth tokens in user object
          const userWithTokens = user;
          userWithTokens.accessToken = account.access_token;
          userWithTokens.refreshToken = account.refresh_token;
          userWithTokens.tokenType = account.token_type || "Bearer";
          // Store expires_in as duration in seconds (not absolute timestamp)
          userWithTokens.expiresIn = (account.expires_in as number) || 900;
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
      // if (account?.provider === "credentials") {
      //   return true;
      // }

      return false;
    },

    async jwt({ token, user, account }) {
      if (user && account) {
        const userWithTokens = user;
        token.accessToken = userWithTokens.accessToken;
        token.refreshToken = userWithTokens.refreshToken;
        token.tokenType = userWithTokens.tokenType;
        token.expiresIn = userWithTokens.expiresIn; // Duration in seconds
        token.scope = userWithTokens.scope;
        token.provider = account.provider; // Store provider info for refresh logic

        token.skyUsername = user.skyUsername;
        token.skyPassword = user.skyPassword;

        // Calculate absolute expiry time in milliseconds
        const expiresAt = Date.now() + (userWithTokens.expiresIn || 0) * 1000;
        token.expiresAt = expiresAt;
      }

      if (Date.now() < (token.expiresAt || 0)) {
        return token;
      }

      // Access token has expired, try to refresh it
      try {
        // For SSC OAuth tokens, use OAuth2 refresh endpoint
        if (token.provider === "ssc" && token.refreshToken) {
          const response = await serverApi.auth.refresh(
            token.refreshToken,
            process.env.SSC_CLIENT_ID!
          );

          console.log("Refresh response:", response.status);

          if (response.status === 200) {
            console.log("Refreshed tokens:", response.data);

            if (response.data.success && response.data.data) {
              const newTokenData = response.data.data;
              token.accessToken = newTokenData.access_token;
              token.refreshToken =
                newTokenData.refresh_token ?? token.refreshToken;
              token.tokenType = newTokenData.token_type;
              token.expiresIn = newTokenData.expires_in; // Duration in seconds

              // Update expiry time - calculate absolute timestamp
              const expiresAt =
                Date.now() + (newTokenData.expires_in || 0) * 1000;
              token.expiresAt = expiresAt;

              console.log(
                "Token refreshed successfully, new expiry:",
                new Date(expiresAt).toISOString()
              );

              return token;
            }
          }
        }
      } catch (error) {
        console.error("Token refresh failed:", error);
        console.error("Token refresh failed:", error.response);
        console.error("Token refresh failed:", error.request);
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

        session.skyUsername = token.skyUsername;
        session.skyPassword = token.skyPassword;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
