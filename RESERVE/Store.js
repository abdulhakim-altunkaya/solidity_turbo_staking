import { create } from "zustand";
import { ethers } from "ethers";
import { AddressTurboStaking } from "./components/AddressABI/AddressTurboStaking";
import { AddressTokenA } from "./components/AddressABI/AddressTokenA";
import { ABITurboStaking } from "./components/AddressABI/ABITurboStaking";
import { ABITokenA } from "./components/AddressABI/ABITokenA";

let signer;
let provider;
let contractTokenA1;
let contractTurboStaking1;

const connectContract = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contractTokenA1 = new ethers.Contract(AddressTokenA, ABITokenA, signer);
    contractTurboStaking1 = new ethers.Contract(AddressTurboStaking, ABITurboStaking, signer);
}

connectContract();

export const useAccount = create( () => ({
  contractTokenA2: contractTokenA1,
  contractTurboStaking2: contractTurboStaking1, 
}))
