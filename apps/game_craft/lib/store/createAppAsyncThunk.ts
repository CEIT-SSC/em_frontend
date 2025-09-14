import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientApi } from "../api/client/clientApi";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  extra: {
    Api: typeof clientApi;
  };
}>();
