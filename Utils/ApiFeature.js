

import Web3 from 'web3';
import { ChatAppAddress, ChatAppABI } from '../Context/Constants';

// Check if MetaMask is installed and has a connected account
export const CheckWalletConnection = async () => {
    try {
        if (!window.ethereum) return console.log('Install MetaMask');
        
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.requestAccounts();
        const firstAccount = accounts[5];
        
        console.log(firstAccount);
        return firstAccount;
    } catch (error) {
        console.log(error);
    }
};

// Explicitly request the user to connect their wallet and return the first account
export const connectWallet = async () => {
    try {
        if (!window.ethereum) return console.log('Install MetaMask');
        
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.requestAccounts();
        const firstAccount = accounts[5];
        
        return firstAccount;
    } catch (error) {
        console.log(error);
    }
};

// Fetch the contract using web3.js
const fetchContract = (web3) => new web3.eth.Contract(ChatAppABI, ChatAppAddress);

// Connect with contract using web3.js
export const connectingWithContract = async () => {
    try {
        console.log("ABI", ChatAppABI)
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.requestAccounts();
        const firstAccount = accounts[0];
        console.log(firstAccount);
        const contract = fetchContract(web3);
        console.log(contract);
        return contract;
    } catch (error) {
        console.error('Error connecting with contract:', error);
        return null;
    }
};

export const convertTime = (time) => {
    const newTime = new Date(time * 1000); // Convert seconds to milliseconds
    const realTime = `${newTime.getHours()}/${newTime.getMinutes()}/${newTime.getSeconds()}  Date:${newTime.getDate()}/${newTime.getMonth() + 1}/${newTime.getFullYear()}`;
    return realTime;
};
