import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import userWalletSlice from './userWalletSlice/userWalletSlice'
import selectTokenA from './selectTokenASlice/selectTokenA'
import selectTokenB from './selectTokenASlice/selectTokenB'
import allBalances from './tokenBalnces/allBalances'
import userLiquidityInfo from './userLiquidity/userLiquidityDataSlice'
import setting from './settingSlice/settingSlice'
import spotAllPairs from './spot/allPairs'
export const store = configureStore({
  reducer: {
    connect: userWalletSlice,
    selectTokenA: selectTokenA,
    selectTokenB: selectTokenB,
    allBalances: allBalances,
    userLiquidityInfo:userLiquidityInfo,
    setting:setting,
    allPairs:spotAllPairs
  },
})




// import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import rootReducer from './rootReducer'
// import userWalletSlice from './userWalletSlice/userWalletSlice'
// import selectTokenA from './selectTokenASlice/selectTokenA'
// import selectTokenB from './selectTokenASlice/selectTokenB'
// import allBalances from './tokenBalnces/allBalances'
// import userLiquidityInfo from './userLiquidity/userLiquidityDataSlice'
// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';
// const persistConfig = {
//   key: 'root',
//   storage: storage,
// }
// const allReducer = combineReducers({
//   connect: userWalletSlice,
//   selectTokenA: selectTokenA,
//   selectTokenB: selectTokenB,
//   allBalances: allBalances,
//   userLiquidityInfo: userLiquidityInfo
// })

// const persistedReducer = persistReducer(persistConfig, allReducer)
// export const store = configureStore({
//   reducer: persistedReducer,
// })
// export const persistor = persistStore(store)