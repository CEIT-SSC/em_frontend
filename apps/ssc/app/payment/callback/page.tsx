"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button, ButtonSize, ButtonVariant } from "@ssc/ui";
import { HiArrowLeft, HiCheckCircle, HiXCircle } from "react-icons/hi";

interface PaymentState {
  success: boolean;
  message: string;
  orderId: string | null;
}

const PaymentCallbackContent = () => {
  const searchParams = useSearchParams();
  const [paymentState, setPaymentState] = useState<PaymentState>({
    success: false,
    message: "",
    orderId: null,
  });

  useEffect(() => {
    const success = searchParams.get("success") === "true";
    const message = searchParams.get("message") || "";
    const orderId = searchParams.get("order_id");

    setPaymentState({
      success,
      message,
      orderId,
    });
  }, [searchParams]);

  const handleRedirect = () => {
    const redirectUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://ceit-ssc.ir";
    window.location.href = redirectUrl;
  };

  const { success, message, orderId } = paymentState;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-secondary-background rounded-3xl p-8 shadow-[0px_0px_20px_0px_rgba(199,199,199,0.1)] border border-whiteText/10">
        {/* Status Icon */}
        <div className="flex justify-center mb-6">
          {success ? (
            <HiCheckCircle className="text-6xl text-green-500" />
          ) : (
            <HiXCircle className="text-6xl text-red-500" />
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-whiteText mb-4">
          {success ? "پرداخت موفق" : "پرداخت ناموفق"}
        </h1>

        {/* Message */}
        {message && (
          <p className="text-center text-whiteText/80 mb-6 leading-relaxed">
            {decodeURIComponent(message)}
          </p>
        )}

        {/* Order ID */}
        {orderId && (
          <div className="bg-background rounded-lg p-4 mb-6 border border-whiteText/10">
            <p className="text-sm text-whiteText/60 mb-1">شماره سفارش:</p>
            <p className="text-whiteText font-mono text-sm break-all">
              {orderId}
            </p>
          </div>
        )}

        {/* Status Description */}
        <div className="bg-background rounded-lg p-4 mb-8 border border-whiteText/10">
          <p className="text-whiteText/80 text-sm leading-relaxed">
            {success
              ? "پرداخت شما با موفقیت انجام شد. اطلاعات تراکنش برای شما ارسال خواهد شد."
              : "متأسفانه پرداخت شما انجام نشد. در صورت کسر وجه از حساب، مبلغ ظرف ۴۸ ساعت بازگردانده خواهد شد."}
          </p>
        </div>

        {/* Action Button */}
        <Button
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.LARGE}
          label="بازگشت به خانه"
          suffixIcon={HiArrowLeft}
          onClick={handleRedirect}
          className="w-full justify-center"
        />
      </div>
    </div>
  );
};

const PaymentCallbackPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-secondary-background rounded-3xl p-8 shadow-[0px_0px_20px_0px_rgba(199,199,199,0.1)] border border-whiteText/10">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 border-4 border-whiteText/20 border-t-whiteText rounded-full animate-spin"></div>
            </div>
            <p className="text-center text-whiteText">در حال بارگذاری...</p>
          </div>
        </div>
      }
    >
      <PaymentCallbackContent />
    </Suspense>
  );
};

export default PaymentCallbackPage;
