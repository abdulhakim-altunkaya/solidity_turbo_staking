import React, {useState} from 'react';
import { useAccount } from '../../Store';  
import { AddressOwner } from "../AddressABI/AddressOwner";

function OwnerPause() {

  const {ethereum} = window;

  const contractCoinFog = useAccount(state => state.contractCoinfog2);

  let[message, setMessage] = useState("");

  const togglePause = async () => {

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
    } else {
      await contractCoinFog.togglePause();
      setMessage("pause toggled");
    }
  }

  return (
    <div>
        <button onClick={togglePause} className='button4'>Pause System</button>&nbsp;&nbsp;{message}
    </div>
  )
}

export default OwnerPause