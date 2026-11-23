// ZarinPal returns through the registered SSC domain. ACPC then performs
// server-side verification using its stored authority and amount.
export async function GET(request: Request) {
  const incoming = new URL(request.url).searchParams;
  const backendOrigin =
    process.env.ACPC_PAYMENT_BACKEND_ORIGIN ||
    "https://aut-icpc.ir";
  const target = new URL("/api/payment/callback/", backendOrigin);

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
