import { getWalletAddressOrConnect } from "../../wallet";
import { ActionTypes } from "../types";

export const connectionAction = () => {
  return async (dispatch) => {
    let acc = await getWalletAddressOrConnect();
    console.log("acccccc", acc);
    let myAcc;
    if (acc === "No Wallet") {
      myAcc = "No Wallet";
    } else if (acc === "Wrong Network") {
      myAcc = "Wrong Network";
    } else {
      myAcc = acc;
    }
    await dispatch({
      type: ActionTypes.CONNECT,
      payload: {
        address: myAcc,
        isWalletConnected: true
      }
    });
  };
};
export const userLiquidityInformation = (value) => {

  return async (dispatch) => {
    await dispatch({
      type: ActionTypes.userLiquidityInfo,
      payload: value
    });
  };
};
