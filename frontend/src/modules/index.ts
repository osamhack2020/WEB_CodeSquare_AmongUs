import { combineReducers } from "redux";
import core, { CoreState } from "./core";
export type RootState = {
  core: CoreState;
};

const rootReducer = combineReducers({
  core: core.reducer,
});

export default rootReducer;
