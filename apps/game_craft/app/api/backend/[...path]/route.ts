import { BASE_URL } from "@ssc/core";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

const BODYLESS_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
const SAFE_RESPONSE_HEADERS = [
  "cache-control",
  "content-disposition",
  "content-type",
  "etag",
  "last-modified",
] as const;

async function proxyRequest(req: NextRequest, context: RouteContext) {
  const origin = req.headers.get("origin");
  const fetchSite = req.headers.get("sec-fetch-site");
  if (
    !BODYLESS_METHODS.has(req.method) &&
    ((origin && origin !== req.nextUrl.origin) || fetchSite === "cross-site")
  ) {
    return NextResponse.json(
      { error: "Cross-origin request rejected" },
      { status: 403 }
    );
  }

  const { path } = await context.params;
  const normalizedPath = `/${path.join("/")}`;
  if (
    /^\/(?:api\/)?o\/(?:token|authorize|revoke-token)(?:\/|$)/.test(
      normalizedPath
    ) ||
    /^\/auth\/social(?:\/|$)/.test(normalizedPath)
  ) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const upstream = new URL(
    path.map((segment) => encodeURIComponent(segment)).join("/"),
    BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`
  );
  upstream.search = req.nextUrl.search;

  const headers = new Headers();
  const contentType = req.headers.get("content-type");
  const accept = req.headers.get("accept");
  if (contentType) headers.set("content-type", contentType);
  if (accept) headers.set("accept", accept);

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (
    token?.accessToken &&
    token.error !== "RefreshAccessTokenError" &&
    Date.now() < (token.expiresAt ?? 0)
  ) {
    headers.set(
      "authorization",
      `${token.tokenType ?? "Bearer"} ${token.accessToken}`
    );
  }

  try {
    const response = await fetch(upstream, {
      method: req.method,
      headers,
      body: BODYLESS_METHODS.has(req.method) ? undefined : await req.arrayBuffer(),
      cache: "no-store",
      redirect: "manual",
    });

    const responseHeaders = new Headers();
    for (const name of SAFE_RESPONSE_HEADERS) {
      const value = response.headers.get(name);
      if (value) responseHeaders.set(name, value);
    }

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch {
    return NextResponse.json({ error: "Backend request failed" }, { status: 502 });
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
export const OPTIONS = proxyRequest;
