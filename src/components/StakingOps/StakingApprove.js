import React from 'react';
import { ethers } from "ethers";
import { useState } from 'react';
import { useAccount } from '../../Store';  
import { AddressTurboStaking } from "../AddressABI/AddressTurboStaking";


function StakingApprove() {

  let contractTokenA = useAccount(state => state.contractTokenA2);

  let [message, setMessage] = useState("");
  let [amount, setAmount] = useState("");

  const approvePlatform = async () => {

    let amount1 = amount;

    if(amount1 === "") {
      alert("Approve amount cannot be empty (security check 1)");
      return;
    }

    if(amount === "") {
      alert("Approve amount cannot be empty (security check 2)");
      return
    }

    if(amount1 < 1) {
      alert("Minimum amount is 1 (security check 3)");
      return;
    }

    let userBalance = await contractTokenA.getYourBalance();
    let userBalance2 = userBalance.toString();
    let userBalance3 = parseInt(userBalance2);

    if(userBalance3 < 1) {
      alert("You dont have TokenA to approve. First mint some TokenA (security check 3)");
      return;
    }

    const valueWithDecimals = ethers.utils.parseUnits(amount1, 18);
    await contractTokenA.approve(AddressTurboStaking, valueWithDecimals);
    setMessage(`Success, approval amount: ${amount1} Token`);

  }

  return (
    <div>
      <button className='button10' onClick={approvePlatform}>Approve</button>
      <input type="number" className='inputFields' placeholder='Token amount'
      value={amount} onChange={ e => setAmount(e.target.value)} /> {message}
    </div>
  )
}

export default StakingApprove;