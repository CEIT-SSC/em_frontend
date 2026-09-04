import { BASE_URL } from "@ssc/core";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "~/core/api/server/serverApi";

const AUTHORIZATION_PARAMETERS = [
  "client_id",
  "redirect_uri",
  "response_type",
  "scope",
  "state",
  "code_challenge",
  "code_challenge_method",
] as const;

function errorResponse(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

function isExpectedCallback(location: URL, redirectUri: URL) {
  if (
    location.origin !== redirectUri.origin ||
    location.pathname !== redirectUri.pathname
  ) {
    return false;
  }

  return [...redirectUri.searchParams].every(
    ([key, value]) => location.searchParams.get(key) === value
  );
}

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (
      !token?.refreshToken ||
      token.error === "RefreshAccessTokenError"
    ) {
      return errorResponse("Not authenticated", 401);
    }

    const clientId = req.nextUrl.searchParams.get("client_id");
    const redirectUriValue = req.nextUrl.searchParams.get("redirect_uri");
    const responseType = req.nextUrl.searchParams.get("response_type");
    const state = req.nextUrl.searchParams.get("state");
    const codeChallenge = req.nextUrl.searchParams.get("code_challenge");

    if (
      !clientId ||
      !redirectUriValue ||
      responseType !== "code" ||
      !state ||
      !codeChallenge
    ) {
      return errorResponse("Invalid authorization request", 400);
    }

    let redirectUri: URL;
    try {
      redirectUri = new URL(redirectUriValue);
    } catch {
      return errorResponse("Invalid redirect URI", 400);
    }

    const handshakeResponse = await serverApi.auth.authorizeWithToken(
      token.refreshToken
    );
    const handshakeToken = handshakeResponse.data?.data?.handshake_token;

    if (handshakeResponse.status !== 200 || !handshakeToken) {
      return errorResponse("Authorization could not be continued", 502);
    }

    const authorizeUrl = new URL("/api/o/authorize", BASE_URL);
    for (const name of AUTHORIZATION_PARAMETERS) {
      const value = req.nextUrl.searchParams.get(name);
      if (value !== null) authorizeUrl.searchParams.set(name, value);
    }
    authorizeUrl.searchParams.set("handshake_token", handshakeToken);

    const authorizationResponse = await fetch(authorizeUrl, {
      method: "GET",
      cache: "no-store",
      redirect: "manual",
      headers: { Accept: "text/html,application/xhtml+xml" },
    });
    const location = authorizationResponse.headers.get("location");

    if (
      !location ||
      authorizationResponse.status < 300 ||
      authorizationResponse.status >= 400
    ) {
      return errorResponse("Authorization server did not return a redirect", 502);
    }

    const callbackUrl = new URL(location, authorizeUrl);
    if (!isExpectedCallback(callbackUrl, redirectUri)) {
      return errorResponse("Authorization server returned an invalid redirect", 502);
    }

    return NextResponse.redirect(callbackUrl, 303);
  } catch {
    console.error("SSC authorization continuation failed");
    return errorResponse("Internal server error", 500);
  }
}
