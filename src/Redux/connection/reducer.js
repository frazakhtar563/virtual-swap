import { ActionTypes } from "../types";

const INITIAL_STATE = {
  userWallet: "Connect Wallet",
  isWalletConnected: false,
};

const connectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.CONNECT:
      return {
        ...state,
        userWallet: action.payload.address,
        isWalletConnected: action.payload.isWalletConnected
      };
    default:
      return state;
  }
};

export default connectReducer;
