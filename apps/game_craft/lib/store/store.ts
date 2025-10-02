"use client";

import {
  combineReducers,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { cartReducer } from "./cart/cart.slice";
import { clientApi } from "lib/api/client/clientApi";
import { orderReducer } from "./order/order.slice";
import { purchasesReducer } from "./purchases/purchases.slice";
import { teamsReducer } from "./teams/teams.slice";

export const store = configureStore({
  reducer: combineReducers({
    cart: cartReducer,
    order: orderReducer,
    purchases: purchasesReducer,
    teams: teamsReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          Api: clientApi,
        },
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  extra: {
    Api: typeof clientApi;
  };
}>();
