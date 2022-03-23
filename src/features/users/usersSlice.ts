import { createSlice } from "@reduxjs/toolkit";

interface StataInterface {
  loading: boolean;
  token: string;
  error: string;
}

const initialState: StataInterface = {
  loading: false,
  token: "",
  error: "",
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
