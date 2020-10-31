import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  username: string;
}

export interface CoreState {
  user: User | null;
}

const initialState: CoreState = { user: null };
// const initialState: CoreState =
//   process.env.NODE_ENV === "development"
//     ? {
//         user: { username: "seowook12" },
//       }
//     : { user: null };

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
