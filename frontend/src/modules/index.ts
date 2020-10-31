import { combineReducers } from "redux";
import core, { CoreState } from "./core";
import qna, { QnaState } from "./qna";
export type RootState = {
  core: CoreState;
  qna: QnaState;
};

const rootReducer = combineReducers({
  core: core.reducer,
  qna: qna.reducer,
});

export default rootReducer;
