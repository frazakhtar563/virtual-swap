import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { nativeCurrency } from '../../utils'

const initialState = {
  tokenA: {
    coin: "",
    pic: '',
    address: ""
  }
}



export const selectTokenA = createSlice({
  name: 'selectTokenA',
  initialState,

  reducers: {
    setTokenAValues: (state, action) => {
      
      state.tokenA = action.payload
    },
    changeValuesForTokenASwap:(state,action)=>{
      state.tokenA=action.payload
    }

  },

})

export const { setTokenAValues,changeValuesForTokenASwap } = selectTokenA.actions

export default selectTokenA.reducer