import React, {useState} from 'react';
import OwnerMintA from "./OwnerMintA";
import OwnerPause from "./OwnerPause";
import OwnerSetAddr from "./OwnerSetAddr";
import OwnerWithdraw from "../../../RESERVE/OwnerWithdraw";
import OwnerChangeA from "./OwnerChangeA";
import OwnerChangeTS from "./OwnerChangeTS";
import OwnerFeeBalance from "./OwnerFeeBalance";
import { AddressOwner } from "../AddressABI/AddressOwner";

function Owner() {

  const {ethereum} = window;

  let [displayStatus, setDisplayStatus] = useState(false);

  const toggleDetails = async () => {
      if(window.ethereum !== "undefined") {
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        if(accounts[0].toLowerCase() !== AddressOwner.toLowerCase()) {
          alert("You are not owner, but as this project is an experiment, I will let you to see owner buttons");
          setDisplayStatus(true);//normally I will delete this line
          //return //Also I need to uncomment this line when in production
        } else {
          setDisplayStatus(true);
        }
      } else {
        alert("Please install Metamask");
        return;
      }
  }

  return (
    <div>
    <button className='button9' onClick={toggleDetails} id='btnRed'>Owner Operations</button>
    {
      displayStatus ? 
      <>
          <OwnerMintA />
          <OwnerPause />
          <OwnerSetAddr />
          <OwnerWithdraw />
          <OwnerFeeBalance />
          <OwnerChangeA />
          <OwnerChangeTS />
      </>
      :
      <></>
    }

    </div>
  )
}

export default Owner