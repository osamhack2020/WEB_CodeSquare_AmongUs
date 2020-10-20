import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QnaState {
  postId: number | null;
  author: string | null;
}

const initialState: QnaState = {
  postId: null,
  author: null,
};

const qna = createSlice({
  name: "qna",
  initialState,
  reducers: {
    setPostId(state, action: PayloadAction<number>) {
      state.postId = action.payload;
    },
    setAuthor(state, action: PayloadAction<string>) {
      state.author = action.payload;
    },
  },
});

export default qna;
