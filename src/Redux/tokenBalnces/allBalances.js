import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fromWei, userWalletBal } from '../../constants';
import { createTokenInstance } from "../../instances/instances"

export const getATokenBalance = createAsyncThunk(
  'getATokenBalance',
  async ({ tokenAddress, userWallet }) => {
    try {

      const tokenAInstance = await createTokenInstance(tokenAddress);


      let tokenBal = await tokenAInstance.methods.balanceOf(userWallet).call();

      tokenBal = fromWei(tokenBal)
      return Number(tokenBal).toFixed(5)
    } catch (error) {
      console.error("error while get token balane A", error);
    }
  }
);
export const getBTokenBalance = createAsyncThunk(
  'getBTokenBalance',
  async ({ tokenAddress, userWallet }) => {
    const tokenBInstance = await createTokenInstance(tokenAddress);

    let tokenBal = await tokenBInstance.methods.balanceOf(userWallet).call();
    console.log('tokenBBBBal inside async function', tokenBal)

    tokenBal = fromWei(tokenBal)
    return Number(tokenBal).toFixed(5)
  }
);
export const getWalletBalance = createAsyncThunk(
  'getWalletBalance',
  async (walletAddress) => {
    let balance = await userWalletBal(walletAddress);

    balance = fromWei(balance);
    balance = Number(balance).toFixed(5);

    return balance
  }
);
const initialState = {
  tokenABalance: "",
  tokenBBalance: "",
  walletBalance: "",
}



export const allBalances = createSlice({
  name: 'allBalances',
  initialState,
  reducers: {},
  extraReducers: {
    [getATokenBalance.fulfilled]: (state, action) => {

      state.tokenABalance = action.payload
    },
    [getBTokenBalance.fulfilled]: (state, action) => {
      state.tokenBBalance = action.payload
    },
    [getWalletBalance.fulfilled]: (state, action) => {
      state.walletBalance = action.payload
    }
  }

})


export default allBalances.reducer