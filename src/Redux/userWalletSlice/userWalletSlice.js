import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getWalletAddressOrConnect } from '../../wallet';
const initialState = {
  userWallet: "Connect Wallet",
  isWalletConnected: false,
  networkStatus: false,
}

export const walletConnection = createAsyncThunk(
  'connectWallet',
  async () => {
    let res = await getWalletAddressOrConnect();
    console.log('acc in slice', res)

    return res
  }
);

export const userWalletSlice = createSlice({
  name: 'userWallet',
  initialState,
  reducers: {
    // connectWallet: (state) => {



    // },

  },
  extraReducers: {
    [walletConnection.pending]: (state, action) => {
      state.isWalletConnected = false

    },
    [walletConnection.fulfilled]: (state, action) => {
      console.log('action', action.payload)
      state.userWallet = action.payload.walletaddress
      state.isWalletConnected = true
      state.networkStatus = action.payload.networkStatus
    }
  }
})


export const { } = userWalletSlice.actions

export default userWalletSlice.reducer