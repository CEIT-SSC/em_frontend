import { createAppAsyncThunk } from "../createAppAsyncThunk";

export const checkoutThunk = createAppAsyncThunk(
  "order/partialCheckout",
  async (eventID: number, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.Api.order.checkout(eventID);
      const data = response.data.data;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createAndCheckoutThunk = createAppAsyncThunk(
  "order/checkout",
  async (itemIds: number[], thunkAPI) => {
    try {
      const response = await thunkAPI
        .dispatch(checkoutThunk(Number(process.env.GAME_CRAFT_SSC_EVENT_ID)))
        .unwrap();
      const paymentRes = await thunkAPI.extra.Api.payment.initiatePayment(
        response.order_id
      );
      const paymentData = paymentRes.data.data;
      return thunkAPI.fulfillWithValue(paymentData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
