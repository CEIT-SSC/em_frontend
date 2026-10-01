// ZarinPal returns through the registered SSC domain. LinuxFest then performs
// server-side verification using its stored authority and amount.
export async function GET(request: Request) {
  const incoming = new URL(request.url).searchParams;
  const backendOrigin =
    process.env.LINUXFEST_PAYMENT_BACKEND_ORIGIN ||
    "https://linuxfest.ceit-ssc.ir";
  const target = new URL("/api/payments/provider-callback/", backendOrigin);

  for (const key of ["Authority", "Status"]) {
    const value = incoming.get(key);
    if (value) target.searchParams.set(key, value);
  }

  return new Response(null, {
    status: 303,
    headers: {
      Location: target.href,
      "Cache-Control": "no-store",
      "Referrer-Policy": "no-referrer",
    },
  });
}
