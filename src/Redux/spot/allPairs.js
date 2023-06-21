import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../client';

export const spotgetAllPairs = createAsyncThunk(
    "spotgetAllPairs",
    async () => {
        try {
            let { data } = await API.get(`getPairs`)
            let newData = data.data?.map((pair) => {
                return {
                    label: `${pair.token0Symbol}/${pair.token1Symbol}`,
                    value: pair.pairAddress
                }
            })
            return newData;
        } catch (error) {
            console.error("error while get all pairs", error);
        }
    }
)

let initialState = {
    allPairs: [],
    isAllPairs: false
}

const spotAllPairs = createSlice({
    name: 'spotAllPairs',
    initialState,
    extraReducers: {
        [spotgetAllPairs.fulfilled]: (state, action) => {
            state.allPairs = action.payload;
            state.isAllPairs = true;
        }
    }
})

export default spotAllPairs.reducer