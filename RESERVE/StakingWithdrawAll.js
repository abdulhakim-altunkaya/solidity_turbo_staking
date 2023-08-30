import React, { useState } from 'react';
import { useAccount } from '../../Store';  
import { useMediaQuery } from 'react-responsive';

function FogWithdrawAll() {

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const {ethereum} = window; //getting ethereum property of window object

  const contractCoinFog = useAccount(state => state.contractCoinfog2);

  let [message, setMessage] = useState("");
  let [privateWord, setPrivateWord] = useState("");
  let [receiver, setReceiver] = useState("");

  const withdrawAll = async () => {

    //private words checks
    if(privateWord === "" || receiver === "") {
      alert("You cannot leave input areas empty (security check 1)");
      return
    }

    //SYSTEM CHECKS
    let systemPause = await contractCoinFog.status();
    if(systemPause === true) {
      alert("System has been paused by owner. Contact him to unpause it");
      return;
    }

    //receiver address checks
    if(receiver.length < 39) {
      alert("invalid address length (security check 2)");
      return;
    }
    if(receiver.slice(0, 2) !== "0x") {
      alert("invalid hash (security check 3)");
      return;
    }

    //user checks
    let userAccount;
    if(window.ethereum !== "undefined") {
      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      userAccount = accounts[0];
    } else {
      alert("You need to install Metamask (security check 4)")
    }
    let feePaidStatus = await contractCoinFog.feePayers(userAccount);
    if(feePaidStatus === false) {
      alert("You need to pay transaction fee (security check 5)");
      return;
    }

    await contractCoinFog.withdrawAll(privateWord, receiver);
    setMessage("The Balance is withdrawn");
  }

  return (
    <div> 
        <button className='button10' onClick={withdrawAll}>Withdraw All</button>{isMobile ? <br /> : ""}
        <input type="text" className='inputFields' placeholder='private keyword'
        value={privateWord} onChange={e => setPrivateWord(e.target.value)} />
        <input type="text" className='inputFields' placeholder='receiver address'
        value={receiver} onChange={e => setReceiver(e.target.value)} /> {message}
    </div>
  )
}

export default FogWithdrawAll