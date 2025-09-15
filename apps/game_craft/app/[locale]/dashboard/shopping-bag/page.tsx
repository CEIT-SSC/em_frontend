"use client";

import { PayBox } from "../../../../components/features/cart/PayBox";
import ProductCart from "components/features/cart/ProductCart";
import { useAppDispatch, useAppSelector } from "lib/store/store";
import {
  cartPresentationsSelector,
  cartLoadingSelector,
  cartErrorSelector,
} from "lib/store/cart/cart.selectors";
import { useEffect } from "react";
import {
  fetchCartThunk,
  removeItemFromCartThunk,
} from "lib/store/cart/cart.thunk";
import { Flex, theme, Row, Col, Spin, Empty, Alert, message } from "antd";
import { ItemType } from "@ssc/core";

const { useToken } = theme;

// TODO: Hydrate redux with SSR, also make this component server component

export default function ShoppingBagPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(cartPresentationsSelector);
  const loading = useAppSelector(cartLoadingSelector);
  const error = useAppSelector(cartErrorSelector);
  const { token } = useToken();

  useEffect(() => {
    dispatch(fetchCartThunk());
  }, [dispatch]);

  const handleRemoveItem = async (item_id: number, item_type: ItemType) => {
    try {
      await dispatch(removeItemFromCartThunk({ item_id, item_type })).unwrap();
      message.success("محصول از سبد خرید حذف شد");
    } catch (error) {
      message.error("خطا در حذف محصول");
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Flex
          justify="center"
          align="center"
          style={{
            height: "400px",
            width: "100%",
          }}
        >
          <Spin size="large" />
        </Flex>
      );
    }

    if (error) {
      return (
        <Alert
          message="خطا در بارگذاری سبد خرید"
          description={error}
          type="error"
          showIcon
          style={{ margin: token.margin }}
        />
      );
    }

    if (!cartItems || cartItems.length === 0) {
      return (
        <Flex
          justify="center"
          align="center"
          style={{
            height: "400px",
            width: "100%",
          }}
        >
          <Empty
            description="سبد خرید شما خالی است"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </Flex>
      );
    }

    return (
      <Row gutter={[16, 16]} style={{ width: "100%" }}>
        {cartItems.map((item) => (
          <Col key={item.id} xs={24} sm={24} lg={24}>
            <ProductCart
              imageUrl="/images/SuperMario.jpg"
              title={item.title}
              price={item.price}
              onRemove={() => handleRemoveItem(item.id, ItemType.PRESENTATION)}
            />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <Flex
      vertical
      flex={1}
      style={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Flex
        flex={1}
        style={{
          width: "100%",
          padding: token.padding,
          overflow: "auto",
        }}
      >
        {renderContent()}
      </Flex>
      <PayBox />
    </Flex>
  );
}
