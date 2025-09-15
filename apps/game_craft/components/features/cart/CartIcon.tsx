"use client ";
import { useFormatter } from "lib/hooks/useFormatter";
import {
  cartErrorSelector,
  cartPresentationsCountSelector,
  cartLoadingSelector,
} from "lib/store/cart/cart.selectors";
import { useAppDispatch, useAppSelector } from "lib/store/store";
import { useEffect, useMemo } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { fetchCartThunk } from "lib/store/cart/cart.thunk";
import { useRouter as nextIntlRouter } from "lib/routing";
import { useRouter } from "@bprogress/next";

const CartIcon = () => {
  const { formatNumberToMoney } = useFormatter();
  const router = useRouter({ customRouter: nextIntlRouter });
  const dispatch = useAppDispatch();
  const counter = useAppSelector(cartPresentationsCountSelector);
  const error = useAppSelector(cartErrorSelector);
  const loading = useAppSelector(cartLoadingSelector);

  useEffect(() => {
    dispatch(fetchCartThunk());
  }, []);

  const badge = useMemo(() => {
    if (loading) {
      return <CgSpinnerTwoAlt size={16} className="animate-spin " />;
    } else {
      if (error) {
        return "!";
      } else {
        return formatNumberToMoney(counter);
      }
    }
  }, [counter, error, loading]);

  return (
    <div
      className="relative flex items-center px-2 h-max rounded-full cursor-pointer"
      onClick={() => router.push("/dashboard/shopping-bag")}
    >
      <FaShoppingCart size={24} />
      <div className="absolute -top-2 -right-1 bg-red-500 text-white text-lg w-5 h-5 flex items-center justify-center rounded-full">
        {badge}
      </div>
    </div>
  );
};

export default CartIcon;
