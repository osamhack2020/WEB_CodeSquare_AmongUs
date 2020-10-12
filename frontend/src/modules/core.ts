import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
}

export interface CoreState {
  user: User | null;
}

const initialState: CoreState = {
  user: null,
};

const core = createSlice({
  name: "core",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
});

export default core;
