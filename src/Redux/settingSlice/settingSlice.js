import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getWalletAddressOrConnect } from '../../wallet';
const initialState = {
    slippageTolerance: 0.1
}



export const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        updateSlipageAmount: (state, action) => {

            state.slippageTolerance = action.payload

        },

    },

})


export const { updateSlipageAmount } = settingSlice.actions

export default settingSlice.reducer