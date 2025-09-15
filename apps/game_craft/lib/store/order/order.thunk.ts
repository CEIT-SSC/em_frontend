import { createAppAsyncThunk } from "../createAppAsyncThunk";

export const partialCheckout = createAppAsyncThunk(
  "order/partialCheckout",
  async (ids: number[], thunkAPI) => {
    try {
      const response = await thunkAPI.extra.Api.order.partialCheckout(ids);
      const data = response.data.data;
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const checkoutThunk = createAppAsyncThunk(
  "order/checkout",
  async (itemIds: number[], thunkAPI) => {
    try {
      console.log("!@! thunk called with", itemIds);
      const response = await thunkAPI
        .dispatch(partialCheckout(itemIds))
        .unwrap();
      console.log("!@! got it", response);
      console.log("!@! now do the next: ");
      const paymentRes = await thunkAPI.extra.Api.payment.initiatePayment(
        response[0].id
      );
      const paymentData = paymentRes.data.data;
      console.log("!@!", paymentData);
      return thunkAPI.fulfillWithValue(paymentData);
    } catch (error) {
      console.log("!@! failed", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
