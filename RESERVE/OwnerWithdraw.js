import React, {useState} from 'react';
import { useAccount } from '../src/Store';  
import { AddressOwner } from "../src/components/AddressABI/AddressOwner";

function OwnerWithdraw() {

  const {ethereum} = window;

  const contractCoinFog = useAccount(state => state.contractCoinfog2);

  let [message, setMessage] = useState("");

  const withdraw = async () => {
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

    let ftmBalance = await contractCoinFog.getContractEtherBalance();
    let ftmBalance2 = ftmBalance.toString();
    let ftmBalance3 = parseInt(ftmBalance2);
    if(ftmBalance3 < 1) {
      alert("Sytem is empty, no fee collected yet");
      return;
    }

    await contractCoinFog.collectFees();
    setMessage("Success, All fees collected and sent to owner");
  }
  return (
    <div>
      <button className='button4' onClick={withdraw}>Collect Fees</button>&nbsp;&nbsp;{message}
    </div>
  )
}

export default OwnerWithdraw