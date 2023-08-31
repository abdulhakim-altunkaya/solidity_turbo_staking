import React, {useState} from 'react';
import { useAccount } from '../../Store';  
import { AddressOwner } from "../AddressABI/AddressOwner";

function OwnerWithdraw() {

  const {ethereum} = window;

  const contractTurboStaking = useAccount(state => state.contractTurboStaking2);

  let[message, setMessage] = useState("");

  const withdrawBal = async () => {

    let accounts;
    if(window.ethereum !== "undefined") {
      accounts = await ethereum.request({ method: "eth_requestAccounts"});
    } else {
      alert("Please install Metamask");
      return;
    } 

    let contractBal = await contractTurboStaking.getContractTokenABalance();
    let contractBal2 = contractBal.toString();
    let contractBal3 = parseInt(contractBal2);
    if(contractBal3 < 1) {
        alert("Contract does not have enough balance");
        return;
    }

    if(accounts[0].toLowerCase() !== AddressOwner.toLowerCase()) {
      alert("You are not owner");
      return;
    } else {
      await contractTurboStaking.withdrawBalance();
      setMessage("balance withdrawn by Owner");
    }



  }

  return (
    <div>
        <button onClick={withdrawBal} className='button4'>Withdraw Balance</button>&nbsp;&nbsp;{message}
    </div>
  )
}

export default OwnerWithdraw