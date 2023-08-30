import React from 'react';
import { useState } from 'react';
import { useAccount } from '../../Store';  
import { AddressCoinfog } from "../AddressABI/AddressTurboStaking";


function FogApprove() {

  let contractTokenA = useAccount(state => state.contractTokenA2);

  let [message, setMessage] = useState("");
  let [amount, setAmount] = useState("");

  const approveCoinFog = async () => {

    let amount1 = parseInt(amount);

    if(amount1 === "") {
      alert("Approve amount cannot be empty (security check 1)");
      return;
    }

    if(amount === "") {
      alert("Approve amount cannot be empty (security check 2)");
      return
    }

    if(amount1 < 1) {
      alert("Minimum amount is 1 toka (security check 3)");
      return;
    }

    let userBalance = await contractTokenA.getYourBalance();
    let userBalance2 = userBalance.toString();
    let userBalance3 = parseInt(userBalance2);

    if(userBalance3 < 1) {
      alert("You dont have TokenA to approve. First mint some TokenA (security check 3)");
      return;
    }

    await contractTokenA.approveCoinFog(AddressCoinfog, amount1);
    setMessage(`Success, approval amount: ${amount1} TOKA`);

  }

  return (
    <div>
      <button className='button10' onClick={approveCoinFog}>Approve</button>
      <input type="number" className='inputFields' placeholder='TokenA amount'
      value={amount} onChange={ e => setAmount(e.target.value)} /> {message}
    </div>
  )
}

export default FogApprove;




    