import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QnaPost } from "../lib/api/qna";

export interface QnaState {
  post: QnaPost | null;
  replies: QnaPost[] | null;
}

const initialState: QnaState = {
  post: null,
  replies: null,
};

const qna = createSlice({
  name: "qna",
  initialState,
  reducers: {
    setPost(state, action: PayloadAction<QnaPost>) {
      state.post = action.payload;
    },
    setReplies(state, action: PayloadAction<QnaPost[]>) {
      state.replies = action.payload;
    },
    acceptReply(state, action: PayloadAction<number>) {
      const reply = state.replies?.find((reply) => reply.id === action.payload);
      if (reply) {
        reply.accepted = true;
      }
    },
  },
});

export default qna;
