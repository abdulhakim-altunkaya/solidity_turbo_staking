import React, { useState } from 'react';
import { ethers } from "ethers";
import { useAccount } from '../../Store';  
import { AddressOwner } from "../AddressABI/AddressOwner";
import { AddressTurboStaking } from "../AddressABI/AddressTurboStaking";


function OwnerLiquidity() {
  const {ethereum} = window;

  const contractTokenA = useAccount(state => state.contractTokenA2);
  let contractTurboStaking = useAccount(state => state.contractTurboStaking2);

  let [amount, setAmount] = useState("");
  let [message, setMessage] = useState("");
  let [addressStaking, setAddressStaking] = useState("");

  const provideLiquidity = async () => {
    let amount1 = amount;
    let amount2 = amount.toString();
    let amount3 = parseInt(amount2);

    if(amount1 === "") {
      alert("liquidity amount cannot be empty (Security Check 1)");
      return
    }
    if(amount === "") {
      alert("liquidity amount cannot be empty (Security Check 2)");
      return
    }
    if(amount1 < 100) {
      alert("liquidity amount cannot be less than 100 (Security Check 3)");
      return;
    }
    if(amount1 > 10000) {
      alert("liquidity amount cannot be less than 10000 (Security Check 4)");
      return;
    }
    if(!/^\d+$/.test(amount1)) {
      alert("Amount not valid. Dont use negative sign or commas. (Security Check 4)");
      return;
    }

    let accounts;
    if(window.ethereum !== "undefined") {
      accounts = await ethereum.request({ method: "eth_requestAccounts"});
    } else {
      alert("Please install Metamask");
      return;
    }
    
    if(accounts[0].toLowerCase() !== AddressOwner.toLowerCase()) {
      setMessage("You are not owner");
      return; 
    }
  
    let ownerBal = await contractTokenA.getYourBalance();
    let ownerBal2 = ownerBal.toString();
    let ownerBal3 = parseInt(ownerBal2);
    if(ownerBal3 < amount1) {
        alert("You don't have enough balance");
        return;
    }


    const valueWithDecimals = ethers.utils.parseUnits(amount3, 18);
    console.log(valueWithDecimals);
    await contractTokenA.provide1(addressStaking, amount3);
    setMessage(`Success, ${amount1} tokenA liquidity provided`);  
  }

  return (
    <div>
        <button onClick={provideLiquidity} className='button4'>Provide Liquidity</button>
        <input type="text" className='inputFields' placeholder='Token Address'
        value={addressStaking} onChange={e => setAddressStaking(e.target.value)}/>
        <input type="number" className='inputFields' placeholder='enter amount'
        value={amount} onChange={e => setAmount(e.target.value)}/> {message}
    </div>
  )
}

export default OwnerLiquidity;