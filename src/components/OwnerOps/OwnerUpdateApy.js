import React, { useState } from 'react';
import { useAccount } from '../../Store';  
import { AddressOwner } from "../AddressABI/AddressOwner";

function OwnerUpdateApy() {
  const {ethereum} = window;

  const contractTurboStaking = useAccount(state => state.contractTurboStaking2);

  let [amount, setAmount] = useState("");
  let [message, setMessage] = useState("");

  const changeApy = async () => {
    let amount1 = parseInt(amount);
    if(amount1 === "") {
      alert("apy cannot be empty (Security Check 1)");
      return
    }
    if(amount === "") {
      alert("apy cannot be empty (Security Check 2)");
      return
    }
    if(amount1 < 1) {
      alert("apy cannot be less than 1 (Security Check 3)");
      return;
    }
    if(amount1 > 29) {
      alert("apy cannot be more than 29 (Security Check 4)");
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

    await contractTurboStaking.updateApy(amount1);
    setMessage(`Success, you changed apy to: ${amount1}`);
    
  }

  return (
    <div>
        <button onClick={changeApy} className='button4'>Change APY</button>
        <input type="number" className='inputFields' placeholder='enter new apy'
        value={amount} onChange={e => setAmount(e.target.value)}/> {message}
    </div>
  )
}

export default OwnerUpdateApy;