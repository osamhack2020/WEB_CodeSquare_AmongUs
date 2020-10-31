import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface VmStatus {
  status: string;
  data: {
    url: string | null;
    created_at: string | null;
    latest: string | null;
  } | null;
}

export interface VmState {
  vm: VmStatus | null;
}

const initialState: VmState = { vm: null };

const vm = createSlice({
  name: "vm",
  initialState,
  reducers: {
    setVm(state, action: PayloadAction<VmStatus | null>) {
      state.vm = action.payload;
    },
  },
});

export default vm;
