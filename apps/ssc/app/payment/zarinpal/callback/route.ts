// Zarinpal returns to the registered domain first. The backend then verifies
// the stored authority and amount, settles once, and returns to the app.
export async function GET(request: Request) {
  const incoming = new URL(request.url).searchParams;
  const backendOrigin = process.env.PAYMENT_BACKEND_ORIGIN || "https://api.ceit-ssc.ir";
  const target = new URL("/api/wallet/top-ups/callback/", backendOrigin);
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
