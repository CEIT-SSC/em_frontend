"use client";

import { theme } from "antd";
import { PayBox } from "../../../../components/features/cart/PayBox";
import ProductCart from "components/features/cart/ProductCart";
import { useAppDispatch, useAppSelector } from "lib/store/store";
import {
  cartItemsSelector,
  cartLoadingSelector,
} from "lib/store/cart/cart.selectors";
import { useEffect } from "react";
import { fetchCartThunk } from "lib/store/cart/cart.thunk";
import { CgSpinnerTwoAlt } from "react-icons/cg";

// TODO: Hydrate redux with SSR, also make this component server component

export default function ShoppingBagPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(cartItemsSelector);
  const loading = useAppSelector(cartLoadingSelector);

  useEffect(() => {
    dispatch(fetchCartThunk());
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full overflow-hidden">
      <div className="flex-1 w-full overflow-auto">
        <div className="flex flex-col gap-4 w-full h-80 max-h-[80vh] px-8">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <CgSpinnerTwoAlt size={48} className="animate-spin " />
            </div>
          ) : (
            <>
              {cartItems.map((item, index) =>
                item.item_details.presentation ? (
                  <ProductCart
                    key={index}
                    imageUrl="/images/SuperMario.jpg"
                    title={item.item_details.presentation.title}
                    price={item.price}
                    onRemove={() => console.log("remove item")}
                  />
                ) : null
              )}
            </>
          )}
        </div>
      </div>

      <PayBox />
    </div>
  );
}
