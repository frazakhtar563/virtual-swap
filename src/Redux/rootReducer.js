import { combineReducers } from "redux";
import userWalletSlice from "./userWalletSlice/userWalletSlice";
import selectTokenA from './selectTokenASlice/selectTokenA'

const rootReducer = combineReducers({
  // connect: userWalletSlice,
  // selectTokenA: selectTokenA,
});

export default rootReducer;
