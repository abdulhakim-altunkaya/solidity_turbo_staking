import React, { useState } from 'react';
import { useAccount } from '../../Store';
import { AddressCoinfog } from "../AddressABI/AddressTurboStaking";
import { useMediaQuery } from 'react-responsive';


function FogDeposit() {

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const {ethereum} = window;

  const contractCoinFog = useAccount(state => state.contractCoinfog2);
  const contractTokenA = useAccount(state => state.contractTokenA2);
  
  let [hashInput, setHashInput] = useState("");
  let [amountInput, setAmountInput] = useState("");
  let [message, setMessage] = useState("");

  const depositAmount = async () => {

    //LOCAL VARIABLES
    let amountInput1 = parseInt(amountInput);

    let userAccount;
    if(window.ethereum !== "undefined") {
      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      userAccount = accounts[0];
    }

    //AMOUNT CHECKS
    if(amountInput1 === "") {
      alert("amount area cannot be empty (Security Check 1)");
      return;
    }

    if(amountInput === "") {
      alert("amount area cannot be empty (Security Check 2)");
      return;
    }

    if(amountInput1 < 1) {
      alert("amount cannot be less than 1 (Security Check 3)");
      return;
    }

    let depositorBalance = await contractTokenA.getYourBalance();
    let depositorBalance2 = depositorBalance.toString();
    let depositorBalance3 = parseInt(depositorBalance2);
    if(depositorBalance3 < 1) {
      alert("You dont have enough TokenA. You can mint them in the mint area (Security Check 4)");
      return;
    }

    let allowanceAmount = await contractTokenA.allowance(userAccount, AddressCoinfog);
    let allowanceAmount2 = allowanceAmount / (10**18);
    let allowanceAmount3 = allowanceAmount2.toString()
    if(allowanceAmount3 < amountInput1) {
      alert("You approve amount is less than your deposit amount. Go to Approve button and approve the contract with amount you want to deposit (Security Check 5)");
      return;
    }

    //HASH CHECKS
    if(hashInput.length < 64) {
      alert("invalid hash length (security check 6)");
      return;
    }
    
    if(hashInput.slice(0, 2) !== "0x") {
      alert("invalid hash (security check 7)");
      return;
    }
    
    if(hashInput === "") {
      alert("hash area cannot be empty (security check 8)");
      return;
    }

    let doesHashExist = await contractCoinFog.checkHashExist(hashInput);
    if(doesHashExist === true) {
      alert("this hash already exists, create a new hash from another private keyword (security check 9)");
      return;
    }

    //USER CHECKS
    let feePaidStatus = await contractCoinFog.feePayers(userAccount);
    if(feePaidStatus === false) {
      alert("You need to pay transaction fee (security check 10)");
      return;
    }

    //SYSTEM CHECKS
    let systemPause = await contractCoinFog.status();
    if(systemPause === true) {
      alert("System has been paused by owner. Contact him to unpause it (security check 11)");
      return;
    }

    await contractCoinFog.deposit(hashInput, amountInput1);
    setMessage(`You successfully deposited ${amountInput1} toka`);

  }
  return (
    <div>
      <button className='button10' onClick={depositAmount}>Deposit</button>{isMobile ? <br /> : ""}
      <input type="text" className='inputFields' placeholder='hash'
      value={hashInput} onChange={e => setHashInput(e.target.value)}/>
      <input type="number" className='inputFields' placeholder='amount'
      value={amountInput} onChange={e => setAmountInput(e.target.value)}/> {message}
    </div>
  )
}

export default FogDeposit;


