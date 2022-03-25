import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StataInterface {
  loading: boolean;
  token: string;
  error: string;
  stayLogged: boolean;
  userName: string;
}

const initialState: StataInterface = {
  loading: false,
  token: "",
  error: "",
  stayLogged: false,
  userName: "",
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoginPending(state) {
      state.loading = true;
    },
    userLoginFulfilled(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = "";
      state.token = action.payload;
      state.stayLogged && localStorage.setItem("stayLogged", action.payload);
    },
    userLoginRejected(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = "";
      localStorage.setItem("stayLogged", "");
      localStorage.setItem("userName", "");
    },
    getStayLoggedState(state, action) {
      state.stayLogged = action.payload;
    },
    userNameEditPending(state) {
      state.loading = true;
      state.error = "";
    },
    userNameEditFulfilled(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = "";
      state.userName = action.payload;
      localStorage.setItem("userName", state.userName);
    },
    userNameEditRejected(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  userLoginPending,
  userLoginFulfilled,
  userLoginRejected,
  logout,
  getStayLoggedState,
  userNameEditPending,
  userNameEditFulfilled,
  userNameEditRejected,
} = usersSlice.actions;

export default usersSlice.reducer;
