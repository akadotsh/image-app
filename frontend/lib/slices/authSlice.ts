import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClientError } from "graphql-request";

interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  token: string | undefined;
  userId: string | undefined;
  name: string | undefined;
  email: string | undefined;
  error: ClientError | Error | null;
}

const initialState: AuthState = {
  isLoading: true,
  isLoggedIn: false,
  token: undefined,
  userId: undefined,
  name: undefined,
  email: undefined,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string; userId: string }>) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.error = null;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = undefined;
      state.userId = undefined;
    },
    updateAuthState(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    updateUserInfo(
      state,
      action: PayloadAction<{
        userId: string;
        name: string;
        email: string;
      }>
    ) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
      state.error = null;
    },
    setIsFetching(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setErrorState(state, action: PayloadAction<Error | ClientError>) {
      state.error = action.payload;
      state.isLoggedIn = false;
    },
  },
});

export const {
  login,
  logout,
  updateAuthState,
  updateUserInfo,
  setIsFetching,
  setErrorState,
} = authSlice.actions;
export default authSlice.reducer;
