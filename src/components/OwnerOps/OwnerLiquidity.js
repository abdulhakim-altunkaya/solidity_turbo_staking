import React, { useState } from 'react';
import { useAccount } from '../../Store';
import { AddressTurboStaking } from "../AddressABI/AddressTurboStaking";
import { useMediaQuery } from 'react-responsive';


function OwnerLiquidity() {

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const {ethereum} = window;

  const contractTurboStaking = useAccount(state => state.contractTurboStaking2);
  const contractTokenA = useAccount(state => state.contractTokenA2);
  
  let [amountInput, setAmountInput] = useState("");
  let [message, setMessage] = useState("");

  const provideLiq = async () => {

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
      alert("You dont have enough TokenA. Visit Token Operations section (Security Check 4)");
      return;
    }

    let allowanceAmount = await contractTokenA.allowance(userAccount, AddressTurboStaking);
    let allowanceAmount2 = allowanceAmount / (10**18);
    let allowanceAmount3 = allowanceAmount2.toString();
    if(allowanceAmount3 < amountInput1) {
      alert("You approve amount is less than your deposit amount. Approve the contract with deposit amount (Security Check 5)");
      return;
    } 

    //SYSTEM CHECKS
    let systemPause = await contractTurboStaking.isPaused();
    if(systemPause === true) {
      alert("System has been paused by owner. Contact him to unpause it (security check 6)");
      return;
    }

    await contractTurboStaking.provideLiquidity(amountInput1);
    setMessage(`Lİquidity provided: ${amountInput1} token`);
  }

  return (
    <div>
      <button className='button10' onClick={provideLiq}>Provide Liquidity</button>{isMobile ? <br /> : ""}
      <input type="number" className='inputFields' placeholder='amount'
      value={amountInput} onChange={e => setAmountInput(e.target.value)}/> {message}
    </div>
  )
}

export default OwnerLiquidity;


