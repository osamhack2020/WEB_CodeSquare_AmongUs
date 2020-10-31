import { combineReducers } from "redux";
import core, { CoreState } from "./core";
import qna, { QnaState } from "./qna";
import vm, { VmState } from "./vm";
export type RootState = {
  core: CoreState;
  qna: QnaState;
  vm: VmState;
};

const rootReducer = combineReducers({
  core: core.reducer,
  qna: qna.reducer,
  vm: vm.reducer,
});

export default rootReducer;
