import { configureStore } from "@reduxjs/toolkit";
import { clientApi } from "../api/client/clientApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { teamsReducer } from "./teams/teams.slice";
import { userSlice } from "./Auth/user.slice";

export const store = configureStore({
  reducer: {
    teams: teamsReducer,
    user: userSlice.reducer,
  },
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
