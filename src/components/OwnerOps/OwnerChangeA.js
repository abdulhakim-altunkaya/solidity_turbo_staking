import React, {useState} from 'react';
import { useAccount } from '../../Store';  
import { AddressOwner } from "../AddressABI/AddressOwner";
import { useMediaQuery } from 'react-responsive';

function OwnerChangeA() {

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const {ethereum} = window;

  const contractTokenA = useAccount(state => state.contractTokenA2);

  let[message, setMessage] = useState("");
  let[newAddress, setNewAddress] = useState("");

  const transferOwner = async () => {
    let accounts;
    if(window.ethereum !== "undefined") {
      accounts = await ethereum.request({ method: "eth_requestAccounts"});
    } else {
      alert("Please install metamask");
      return;
    }

    if(newAddress === "") {
      alert("You forgot to enter address (Security Check 1)");
      return;
    }

    if(newAddress.length < 20) {
      alert("Invalid address (Security Check 2)");
      return;
    }

    if(newAddress.slice(0,2) !== "0x") {
      alert("Invalid address type (Security Check 3)");
      return;
    }

    if(accounts[0].toLowerCase() !== AddressOwner.toLowerCase()) {
      alert("You are not owner (Security Check 4)");
      return;
    }

    await contractTokenA.transferOwnership(newAddress);
    setMessage("Success, owner changed");

  }


  return (
    <div>
      <button onClick={transferOwner} className='button4'>Change Owner TokenA</button>
      <input type="text" className='inputFields' placeholder='new owner address'
      value={newAddress} onChange={e => setNewAddress(e.target.value)} />{isMobile ? <br /> : " "}{message}
    </div>
  )
}

export default OwnerChangeA;