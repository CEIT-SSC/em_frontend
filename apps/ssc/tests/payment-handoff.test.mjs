import assert from "node:assert/strict";
import test from "node:test";
import { GET as start } from "../app/payment/start/route.ts";
import { GET as callback } from "../app/payment/zarinpal/callback/route.ts";
import { GET as linuxfestCallback } from "../app/payment/linuxfest/zarinpal/callback/route.ts";

test("handoff loads a document, automatically navigates, and sends the merchant origin to Zarinpal", async () => {
  for (const host of ["payment.zarinpal.com", "sandbox.zarinpal.com"]) {
    const gateway = `https://${host}/pg/StartPay/A123`;
    const response = await start(new Request(`https://ceit-ssc.ir/payment/start?${new URLSearchParams({ gateway })}`));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("Location"), null);
    assert.equal(response.headers.get("Referrer-Policy"), "origin");
    assert.equal(response.headers.get("Cache-Control"), "no-store");
    const body = await response.text();
    assert.match(body, new RegExp(`http-equiv="refresh" content="0; URL=${gateway}"`));
    assert.match(body, new RegExp(`href="${gateway}" referrerpolicy="origin"`));
  }
});

test("handoff rejects arbitrary destinations and HTML injection", async () => {
  for (const gateway of [
    "", "https://evil.example/pg/StartPay/A123",
    "https://payment.zarinpal.com.evil.example/pg/StartPay/A123",
    "http://payment.zarinpal.com/pg/StartPay/A123",
    "https://evil@payment.zarinpal.com/pg/StartPay/A123",
    "https://payment.zarinpal.com:444/pg/StartPay/A123",
    "https://payment.zarinpal.com/pg/StartPay/A123?redirect=https://evil.example",
    "https://payment.zarinpal.com/pg/StartPay/A123#fragment",
    'https://payment.zarinpal.com/pg/StartPay/A123"><script>alert(1)</script>',
    "javascript:alert(1)",
  ]) {
    const response = await start(new Request(`https://ceit-ssc.ir/payment/start?${new URLSearchParams({ gateway })}`));
    assert.equal(response.status, 400, gateway);
  }
});

test("callback forwards only provider fields to the configured verification endpoint", async () => {
  const previous = process.env.PAYMENT_BACKEND_ORIGIN;
  process.env.PAYMENT_BACKEND_ORIGIN = "https://api.ceit-ssc.ir";
  try {
    const response = await callback(new Request("https://ceit-ssc.ir/payment/zarinpal/callback?Authority=A123&Status=NOK&success=true&return_url=https://evil.example"));
    assert.equal(response.status, 303);
    assert.equal(response.headers.get("Location"), "https://api.ceit-ssc.ir/api/wallet/top-ups/callback/?Authority=A123&Status=NOK");
    assert.equal(response.headers.get("Cache-Control"), "no-store");
    const missing = await callback(new Request("https://ceit-ssc.ir/payment/zarinpal/callback"));
    assert.equal(missing.headers.get("Location"), "https://api.ceit-ssc.ir/api/wallet/top-ups/callback/");
  } finally {
    if (previous === undefined) delete process.env.PAYMENT_BACKEND_ORIGIN;
    else process.env.PAYMENT_BACKEND_ORIGIN = previous;
  }
});

test("LinuxFest callback forwards only provider fields to LinuxFest verification", async () => {
  const previous = process.env.LINUXFEST_PAYMENT_BACKEND_ORIGIN;
  process.env.LINUXFEST_PAYMENT_BACKEND_ORIGIN = "https://linuxfest.ceit-ssc.ir";
  try {
    const response = await linuxfestCallback(new Request(
      "https://ceit-ssc.ir/payment/linuxfest/zarinpal/callback?Authority=LNX123&Status=OK&return_url=https://evil.example",
    ));
    assert.equal(response.status, 303);
    assert.equal(
      response.headers.get("Location"),
      "https://linuxfest.ceit-ssc.ir/api/payments/provider-callback/?Authority=LNX123&Status=OK",
    );
    assert.equal(response.headers.get("Cache-Control"), "no-store");
  } finally {
    if (previous === undefined) delete process.env.LINUXFEST_PAYMENT_BACKEND_ORIGIN;
    else process.env.LINUXFEST_PAYMENT_BACKEND_ORIGIN = previous;
  }
});
