// Return a document, not a 302: Zarinpal needs this page's origin as its Referer.
// This page requires no shared login cookie with GameCraft.
export async function GET(request: Request) {
  const headers = {
    "Cache-Control": "no-store",
    "Referrer-Policy": "origin",
    "X-Robots-Tag": "noindex, nofollow",
    "Content-Type": "text/html; charset=utf-8",
    "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'",
  };
  let gateway: URL;
  try {
    gateway = new URL(new URL(request.url).searchParams.get("gateway") || "");
    if (
      gateway.protocol !== "https:" ||
      !["payment.zarinpal.com", "sandbox.zarinpal.com"].includes(gateway.hostname) ||
      gateway.port || gateway.username || gateway.password ||
      gateway.search || gateway.hash ||
      !/^\/pg\/StartPay\/[A-Za-z0-9]{1,128}$/.test(gateway.pathname)
    ) throw new Error("Invalid gateway");
  } catch {
    return new Response("لینک پرداخت معتبر نیست. لطفاً از صفحه سفارش دوباره اقدام کنید.", { status: 400, headers });
  }

  // The origin and path allowlists above exclude HTML metacharacters.
  return new Response(`<!doctype html>
<html lang="fa" dir="rtl"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="referrer" content="origin"><title>ادامه پرداخت | انجمن علمی</title>
<style>
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:#101827;color:#f8fafc;font-family:Tahoma,sans-serif;padding:24px}
main{width:100%;max-width:440px;padding:32px;background:#1e293b;border-radius:24px;text-align:center}h1{font-size:24px}p{line-height:2;color:#cbd5e1}a{display:block;padding:16px;margin-top:24px;border-radius:12px;background:#38bdf8;color:#082f49;font-weight:bold;text-decoration:none}a:focus-visible{outline:3px solid white;outline-offset:4px}
</style></head><body><main>
<h1>ادامه پرداخت</h1>
<p>برای ورود به درگاه امن زرین‌پال، دکمه زیر را بزنید. پس از پرداخت به سایت بازمی‌گردید.</p>
<a href="${gateway.href}" referrerpolicy="origin">ورود به درگاه پرداخت</a>
</main></body></html>`, { headers });
}
