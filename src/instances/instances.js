import Web3 from 'web3';
import Contract from 'web3-eth-contract';
import { factoryContractAddress, virtualRouterAddress, wbnbAddress, earnFormAddress } from "./addresses"
import virtualFactoryAbi from "./abis/virtualFactory.json"
import virtualTokenAbi from "./abis/virtualToken.json"
import virtualRouterAbi from "./abis/virtualRouter.json"
import virtaualPairAbi from "./abis/virtualPairAbi.json"
import wbnbAbi from './abis/wbnb.json'
import earnFormAbi from './abis/earnFormAbi.json'



export const factoryContractRef = async () => {
    if (typeof window.web3 !== 'undefined') {
        window.web3 = new Web3(window.web3.currentProvider)
    } else {
        var web3Provider = new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/")
        window.web3 = new Web3(web3Provider)
    }
    Contract.setProvider(window.web3.currentProvider);
    return await new Contract(virtualFactoryAbi, factoryContractAddress);
}
export const routerContractRef = async () => {
    if (typeof window.web3 !== 'undefined') {
        window.web3 = new Web3(window.web3.currentProvider)
    } else {
        var web3Provider = new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/")
        window.web3 = new Web3(web3Provider)
    }
    Contract.setProvider(window.web3.currentProvider);
    return await new Contract(virtualRouterAbi, virtualRouterAddress);
}

export const WBNBContractRef = async () => {
    if (typeof window.web3 !== 'undefined') {
        window.web3 = new Web3(window.web3.currentProvider)
    } else {
        var web3Provider = new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/")
        window.web3 = new Web3(web3Provider)
    }
    Contract.setProvider(window.web3.currentProvider);
    return await new Contract(wbnbAbi, wbnbAddress);
}

export const createTokenInstance = async (address) => {
    if (typeof window.web3 !== 'undefined') {
        window.web3 = new Web3(window.web3.currentProvider)
    } else {
        var web3Provider = new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/")
        window.web3 = new Web3(web3Provider)
    }
    Contract.setProvider(window.web3.currentProvider);
    return await new Contract(virtualTokenAbi, address);
}
export const createPairInstance = async (address) => {
    if (typeof window.web3 !== 'undefined') {
        window.web3 = new Web3(window.web3.currentProvider)
    } else {
        var web3Provider = new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/")
        window.web3 = new Web3(web3Provider)
    }
    Contract.setProvider(window.web3.currentProvider);
    return await new Contract(virtaualPairAbi, address);
}
export const createEarnFormInstance = async () => {
    if (typeof window.web3 !== 'undefined') {
        window.web3 = new Web3(window.web3.currentProvider)
    } else {
        var web3Provider = new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/")
        window.web3 = new Web3(web3Provider)
    }
    Contract.setProvider(window.web3.currentProvider);
    return await new Contract(earnFormAbi, earnFormAddress);
}
