import React, {useState} from 'react';
import { useAccount } from '../../Store';  
import { AddressOwner } from "../AddressABI/AddressOwner";
import { useMediaQuery } from 'react-responsive';

function OwnerSetAddr() {

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const { ethereum } = window;

  let contractTurboStaking = useAccount(state => state.contractTurboStaking2);

  let [addressA, setAddressA] = useState("");
  let [message, setMessage] = useState("");

  const setAddress = async () => {

    let accounts;
    if(window.ethereum !== "undefined") {
      accounts = await ethereum.request({ method: "eth_requestAccounts"});
    } else {
      alert("Please install Metamask");
      return;
    }

    if(addressA === "") {
      alert("You forgot to enter address TokenA (security check 1)");
      return;
    }
    if(addressA.slice(0, 2) !== "0x") {
      alert("Invalid address (security check 2)");
      return;
    }
    if(addressA.length < 20) {
      alert("Invalid address (security check 3)");
      return;
    }
    if(accounts[0].toLowerCase() !== AddressOwner.toLowerCase()) {
      alert("You are not owner (security check 4)");
      return;
    }

    await contractTurboStaking.setToken(addressA);
    setMessage("Address successfully set");
  }

  return (
    <div>
        <button className='button4' onClick={setAddress}>Set Address</button>
        <input type="text" className='inputFields' placeholder='Token Address'
        value={addressA} onChange={e => setAddressA(e.target.value)}/>{isMobile ? <br /> : " "}{message}
    </div>
  )
}

export default OwnerSetAddr;
