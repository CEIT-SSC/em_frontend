"use client";

import { Button, ButtonVariant } from "@ssc/ui";
import {
  cartItemsSelector,
  cartLoadingSelector,
  cartPaymentDataSelector,
} from "lib/store/cart/cart.selectors";
import { checkoutThunk, partialCheckout } from "lib/store/order/order.thunk";
import { useAppDispatch, useAppSelector } from "lib/store/store";
import { useCallback } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";

export function PayBox() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(cartItemsSelector);
  const paymentData = useAppSelector(cartPaymentDataSelector);
  const loading = useAppSelector(cartLoadingSelector);

  const applyDiscount = () => {
    // TODO: handling discount code
    // dispatch(applyBonusCodeThunk("DISCOUNT2024"));
  };

  const checkout = useCallback(() => {
    dispatch(checkoutThunk(cartItems.map((item) => item.id)))
      .unwrap()
      .then((res) => {
        window.open(res.payment_url, "_blank");
      })
      .catch((error) => {
        console.error(error);
      });
  }, [cartItems]);

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 pt-0 z-[1000] gap-3">
      {/* Dashed Divider */}
      <div className="w-full border-t border-dashed border-antd-border-primary dark:border-antd-dark-border-primary"></div>

      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <CgSpinnerTwoAlt size={48} className="animate-spin " />
        </div>
      ) : null}

      {!loading && (
        <>
          <div className="w-full flex items-center justify-between gap-4">
            {!paymentData.discountCode ? (
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
            <Button
              className="w-full bg-antd-primary hover:bg-antd-primary-hover border-0"
              label="پرداخت"
              variant={ButtonVariant.PRIMARY}
              onClick={checkout}
            ></Button>
          </div>
        </>
      )}
    </div>
  );
}
