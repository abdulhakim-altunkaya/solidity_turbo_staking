import React, { useState } from 'react';
import { useAccount } from '../../Store';  
import { AddressOwner } from "../AddressABI/AddressOwner";
import { useMediaQuery } from 'react-responsive';

function OwnerUpdateApy() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

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

    await contractTurboStaking.updateApy(amount1);
    setMessage(`Success, new APY: ${amount1}`);
    
  }

  return (
    <div>
        <button onClick={changeApy} className='button4'>Change APY</button>
        <input type="number" className='inputFields' placeholder='enter new apy'
        value={amount} onChange={e => setAmount(e.target.value)}/>{isMobile ? <br /> : " "}{message}
    </div>
  )
}

export default OwnerUpdateApy;