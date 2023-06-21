import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fromWei, isAddress, userWalletBal } from '../../constants';
import { createPairInstance, createTokenInstance, factoryContractRef } from '../../instances/instances';
import API from '../../client';

const getData = async (pair, token0Address, token1Address, token0Symbol, token1Symbol, pairContract, balance, userWallet) => {
    let liquidity = balance;
    let totalSupply = await pairContract.methods.totalSupply().call();


    let token0Contract = await createTokenInstance(token0Address);
    let token1Contract = await createTokenInstance(token1Address);

    let { _reserve0, _reserve1 } = await pairContract.methods.getReserves().call();

    let token0Pooled = fromWei(_reserve0) * fromWei(liquidity) / fromWei(totalSupply);
    let token1Pooled = fromWei(_reserve1) * fromWei(liquidity) / fromWei(totalSupply);

    let rateFromAtoB = _reserve1 / _reserve0;
    let rateFromBtoA = _reserve0 / _reserve1;

    let token0Balance = token0Symbol === 'WBNB' ? await userWalletBal(userWallet) : await token0Contract.methods.balanceOf(userWallet).call();
    let token1Balance = token1Symbol === 'WBNB' ? await userWalletBal(userWallet) : await token1Contract.methods.balanceOf(userWallet).call();


    let shareInPool = token0Pooled / fromWei(_reserve0) * 100;

    return {
        pairAddress: pair,
        token0Address: token0Address,
        token1Address: token1Address,
        token0Symbol,
        token1Symbol,
        rateFromAtoB: rateFromAtoB,
        rateFromBtoA: rateFromBtoA,
        totalSupply: totalSupply,
        reserve0: _reserve0,
        reserve1: _reserve1,
        liquidity: Number(fromWei(liquidity)),
        token0Pooled: token0Pooled,
        token1Pooled: token1Pooled,
        token0Balance: Number(fromWei(token0Balance)),
        token1Balance: Number(fromWei(token1Balance)),
        shareInPool: shareInPool,
    }
}
export const getAllPairs = createAsyncThunk(
    "getAllPairs",
    async (userWallet) => {
        try {
            let arr = [];
            let { data } = await API.get(`getPairs?address=${userWallet}`)
            console.log("data", data);
            for (let i = 0; i < data.data.length; i++) {
                let { pairAddress, token0Address, token1Address, token0Symbol, token1Symbol } = data.data[i]
                console.log("data.data[i].pairAddress", data.data[i].pairAddress);
                let pairContract = await createPairInstance(data.data[i].pairAddress);
                let balance = await pairContract.methods.balanceOf(userWallet).call();

                // in which pair user has some balance.
                if (Number(balance) != 0) {
                    // get further details
                    let obj = await getData(pairAddress, token0Address, token1Address, token0Symbol, token1Symbol, pairContract, balance, userWallet);
                    arr.push(obj);
                }
            }
            return arr;
        } catch (error) {
            console.error("error while get all pairs", error);
        }
    }
)

export const getDataOfPair = createAsyncThunk(
    "getDataOfPair",
    async ({ pairAddress, userWallet }) => {
        try {
            if (isAddress(pairAddress)) {
                const pairContract = await createPairInstance(pairAddress);

                let liquidity = await pairContract.methods.balanceOf(userWallet).call();

                if (Number(liquidity) != 0) {

                    let totalSupply = await pairContract.methods.totalSupply().call();

                    let token0 = await pairContract.methods.token0().call();
                    let token1 = await pairContract.methods.token1().call();

                    let token0Contract = await createTokenInstance(token0);
                    let token1Contract = await createTokenInstance(token1);

                    let { _reserve0, _reserve1 } = await pairContract.methods.getReserves().call();

                    let token0Pooled = fromWei(_reserve0) * fromWei(liquidity) / fromWei(totalSupply);
                    let token1Pooled = fromWei(_reserve1) * fromWei(liquidity) / fromWei(totalSupply);


                    let rateFromAtoB = _reserve1 / _reserve0;
                    let rateFromBtoA = _reserve0 / _reserve1;

                    let symbol0 = await token0Contract.methods.symbol().call();
                    let symbol1 = await token1Contract.methods.symbol().call();

                    let token0Balance = symbol0 === 'WBNB' ? await userWalletBal(userWallet) : await token0Contract.methods.balanceOf(userWallet).call();
                    let token1Balance = symbol1 === 'WBNB' ? await userWalletBal(userWallet) : await token1Contract.methods.balanceOf(userWallet).call();

                    let shareInPool = token0Pooled / fromWei(_reserve0) * 100;

                    return {
                        token0Address: token0,
                        token1Address: token1,
                        token0Symbol: symbol0 === 'WBNB' ? 'BNB' : symbol0,
                        token1Symbol: symbol1 === 'WBNB' ? 'BNB' : symbol1,
                        rateFromAtoB: rateFromAtoB,
                        rateFromBtoA: rateFromBtoA,
                        totalSupply: totalSupply,
                        reserve0: _reserve0,
                        reserve1: _reserve1,
                        liquidity: Number(fromWei(liquidity)),
                        token0Pooled: token0Pooled,
                        token1Pooled: token1Pooled,
                        token0Balance: Number(fromWei(token0Balance)),
                        token1Balance: Number(fromWei(token1Balance)),
                        shareInPool: shareInPool,
                        isPairData: true,
                    }
                } else {
                    return {
                        isPairData: false,
                    }
                }
            } else {
                return {
                    isPairData: false,
                }
            }
        } catch (error) {
            console.error("error while get data of pair", error);
        }
    }
)

let initialState = {
    userLiquidityInfo: [],
    isUserLiquidityFound: false,
    pairAddressData: {},
    isPairAddressData: false
}

const userLiquidityInfoSlice = createSlice({
    name: 'userLiquidityInfo',
    initialState,
    reducers: {
        getFilterPairOfData: (state, action) => {
            console.log('getFilterPairOfData', action.payload)
            state.pairAddressData = action.payload;
            state.isPairAddressData = true;
        }
    },
    extraReducers: {
        [getAllPairs.fulfilled]: (state, action) => {
            state.userLiquidityInfo = action.payload;
            state.isUserLiquidityFound = true;
        },
        [getDataOfPair.fulfilled]: (state, { payload }) => {
            if (!payload.isPairData) {
                state.isPairAddressData = payload.isPairData;
                state.pairAddressData = {};
            } else {
                state.isPairAddressData = payload.isPairData;
                delete payload.isPairData
                state.pairAddressData = payload;
            }
        }
    }
})

export const { getFilterPairOfData } = userLiquidityInfoSlice.actions
export default userLiquidityInfoSlice.reducer