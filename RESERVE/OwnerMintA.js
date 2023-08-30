import React, { useState } from 'react';
import { useAccount } from '../../Store';  
import { AddressOwner } from "../AddressABI/AddressOwner";

function OwnerMintA() {
  const {ethereum} = window;

  const contractTokenA = useAccount(state => state.contractTokenA2);

  let [amount, setAmount] = useState("");
  let [message, setMessage] = useState("");

  const mintToken = async () => {
    let amount1 = parseInt(amount);
    if(amount1 === "") {
      alert("mint at least 1 token (Security Check 1)");
      return
    }
    if(amount === "") {
      alert("mint at least 1 token (Security Check 2)");
      return
    }
    if(amount1 < 1) {
      alert("Mint at least 1 token (Security Check 3)");
      return;
    }
    if(amount1 > 99999) {
      alert("You cannot mint this much (Security Check 4)");
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

    await contractTokenA.mintToken(amount1);
    setMessage(`Success, you minted ${amount1} tokenA`);
    
  }

  return (
    <div>
        <button onClick={mintToken} className='button4'>Mint TokenA</button>
        <input type="number" className='inputFields' placeholder='enter amount'
        value={amount} onChange={e => setAmount(e.target.value)}/> {message}
    </div>
  )
}

export default OwnerMintA;