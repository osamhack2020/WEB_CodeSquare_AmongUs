import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QnaState {
  postId: number | null;
}

const initialState: QnaState = {
  postId: null,
};

const qna = createSlice({
  name: "qna",
  initialState,
  reducers: {
    setPostId(state, action: PayloadAction<number>) {
      state.postId = action.payload;
    },
  },
});

export default qna;
