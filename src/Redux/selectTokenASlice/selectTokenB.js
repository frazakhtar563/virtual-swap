import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  tokenB: {
    coin: "",
    pic: '',
    address: ""
  },

}



export const selectTokenB = createSlice({
  name: 'selectTokenB',
  initialState,

  reducers: {
    setTokenBValues: (state, action) => {

      state.tokenB = action.payload
    },
    changeValuesForTokenBSwap: (state, action) => {
      state.tokenB = action.payload
    }

  },

})
export const { setTokenBValues, changeValuesForTokenBSwap } = selectTokenB.actions

export default selectTokenB.reducer