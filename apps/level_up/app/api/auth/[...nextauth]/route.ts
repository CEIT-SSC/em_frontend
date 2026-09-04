import { BASE_URL } from "@ssc/core";
import { serverApi } from "lib/api/server/serverApi";
import NextAuth, { AuthOptions } from "next-auth";
import { Provider } from "next-auth/providers";

interface SSCProviderOptions {
  clientId: string;
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

        const response = await fetch(`${BASE_URL}/o/token/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          body: formData,
        });

        const result = await response.json();

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
    // This is a public PKCE client; no client secret is sent.
    client: {
      token_endpoint_auth_method: "none",
    },
    checks: ["pkce", "state"],
    profile(profile: SSCProfile) {
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
    error?: "RefreshAccessTokenError";

    skyUsername?: string;
    skyPassword?: string;
  }
}

const authOptions: AuthOptions = {
  providers: [
    SSCProvider({
      clientId: process.env.SSC_CLIENT_ID!,
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
    async jwt({ token, user, account }) {
      if (account) {
        const expiresIn = Number(account.expires_in ?? 900);
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.tokenType = account.token_type ?? "Bearer";
        token.expiresIn = expiresIn;
        token.scope = account.scope;
        token.expiresAt = account.expires_at
          ? account.expires_at * 1000
          : Date.now() + expiresIn * 1000;
        token.provider = account.provider;
        token.skyUsername = user?.skyUsername;
        token.skyPassword = user?.skyPassword;
        delete token.error;
      }

      if (token.accessToken && Date.now() < (token.expiresAt ?? 0)) {
        return token;
      }

      if (token.provider !== "ssc" || !token.refreshToken) {
        return {
          ...token,
          accessToken: undefined,
          error: "RefreshAccessTokenError",
        };
      }

      try {
        const response = await serverApi.auth.refresh(
          token.refreshToken,
          process.env.SSC_CLIENT_ID!
        );

        if (response.status === 200 && response.data.success) {
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
      session.skyUsername = token.skyUsername;
      session.skyPassword = token.skyPassword;
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
