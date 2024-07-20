import { configureStore, Middleware } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(loggerMiddleware),
  });
};

const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  console.log("Dispatching:", action);
  const result = next(action);
  console.log("Next state:", store.getState());
  return result;
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
