import { createAppAsyncThunk } from "../createAppAsyncThunk";

export const checkoutCartThunk = createAppAsyncThunk(
  "order/checkout",
  async (eventId: number, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.Api.order.checkout(eventId);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Checkout failed"
      );
    }
  }
);
