import React, {useState} from 'react';
import { useAccount } from '../../Store';  
import { AddressOwner } from "../AddressABI/AddressOwner";

function OwnerFeeBalance() {

  const {ethereum} = window;

  const contractCoinFog = useAccount(state => state.contractCoinfog2);

  let[message, setMessage] = useState("");

  const getFeeBalance = async () => {

    let accounts;
    if(window.ethereum !== "undefined") {
      accounts = await ethereum.request({ method: "eth_requestAccounts"});
    } else {
      alert("Please install Metamask");
      return;
    }

    if(accounts[0].toLowerCase() !== AddressOwner.toLowerCase()) {
      alert("You are not owner");
      return;
    }

    let feeBalance = await contractCoinFog.getContractEtherBalance();
    let feeBalance2 = feeBalance.toString();
    setMessage(`So far collected fees: ${feeBalance2} FTM`);
  }

  return (
    <div>
        <button onClick={getFeeBalance} className='button4'>Fee Balance</button>&nbsp;&nbsp;{message}
    </div>
  )
}

export default OwnerFeeBalance;