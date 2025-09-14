"use client";

import { cartPaymentDataSelector } from "lib/store/cart/cart.selectors";
import { useAppSelector } from "lib/store/store";

export function PayBox() {
  const paymentData = useAppSelector(cartPaymentDataSelector);

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 pt-0 z-[1000] gap-3">
      {/* Dashed Divider */}
      <div className="w-full border-t border-dashed border-antd-border-primary dark:border-antd-dark-border-primary"></div>

      {/* Discount Code Section */}
      <div className="w-full flex items-center justify-between gap-4">
        {paymentData.discountCode ? (
          <>
            <span className="text-antd-text dark:text-antd-dark-text">
              کد تخفیف دارید؟
            </span>
            <button className="px-3 py-2 border-3 border-antd-border-primary dark:border-antd-dark-border-primary rounded-full border-dashed text-antd-text dark:text-antd-dark-text bg-transparent transition-colors duration-200 text-sm hover:bg-antd-primary cursor-pointer">
              وارد کردن
            </button>
          </>
        ) : (
          <span className="text-antd-text-secondary dark:text-antd-dark-text-secondary">
            کد تخفیف شما: {paymentData.discountCode}
          </span>
        )}
      </div>

      {/* Totals Section */}
      <div className="w-full flex flex-col items-center justify-center gap-3">
        {/* Subtotal */}
        <div className="w-full flex items-center justify-between">
          <span className="text-antd-text dark:text-antd-dark-text">
            جمع کل:
          </span>
          <span className="font-semibold text-antd-text dark:text-antd-dark-text">
            {paymentData.subTotal.toLocaleString()} تومان
          </span>
        </div>

        {/* Discount (only show if discount > 0) */}
        {paymentData.discountAmount > 0 && (
          <div className="w-full flex items-center justify-between">
            <span className="text-antd-text-secondary dark:text-antd-dark-text-secondary">
              تخفیف:
            </span>
            <span className="text-antd-success">
              -{paymentData.discountAmount.toLocaleString()} تومان
            </span>
          </div>
        )}

        {/* Solid Divider */}
        <div className="w-full border-t border-solid border-antd-border-primary dark:border-antd-dark-border-primary my-2"></div>

        {/* Final Total */}
        <div className="w-full flex items-center justify-between">
          <h5 className="text-lg font-semibold text-antd-text dark:text-antd-dark-text m-0">
            مبلغ نهایی:
          </h5>
          <h5 className="text-lg font-semibold text-antd-primary m-0">
            {paymentData.total.toLocaleString()} تومان
          </h5>
        </div>

        {/* Payment Button */}
        <button className="w-full bg-antd-primary hover:bg-antd-primary-hover active:bg-antd-primary-active text-white font-bold py-3 px-6 rounded-lg mt-4 transition-colors duration-200 flex items-center justify-center">
          <span className="font-black">پرداخت</span>
        </button>
      </div>
    </div>
  );
}
