import React, { useState } from 'react';
import { useAccount } from '../../Store';  
import { useMediaQuery } from 'react-responsive';

function FogWithdrawPart() {

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const {ethereum} = window; // getting ethereum property of window object
  const contractCoinFog = useAccount(state => state.contractCoinfog2);

  //variables
  let [privateWord, setPrivateWord] = useState("");
  let [receiverAddress, setReceiverAddress] = useState("");
  let [amount, setAmount] = useState("");
  let [newHash, setNewHash] = useState("");
  let [message, setMessage] = useState("");

  const withdrawPartly = async () => {

      //LOCAL VARIABLES
      let amount1 = parseInt(amount)

      let userAccount;
      if(window.ethereum !== "undefined") {
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        userAccount = accounts[0];
      }

      //receiver address checks
      if(receiverAddress.length < 39) {
        alert("invalid address length (security check 1)");
        return;
      }
      if(receiverAddress.slice(0, 2) !== "0x") {
        alert("invalid hash (security check 1)");
        return;
      }

      //AMOUNT CHECKS
      if(amount1 === "") {
        alert("amount area cannot be empty (Security Check 3)");
        return;
      }

      if(amount === "") {
        alert("amount area cannot be empty (Security Check 4)");
        return;
      }

      if(amount1 < 1) {
        alert("amount cannot be less than 1 (Security Check 5)");
        return;
      }

      //HASH CHECKS
      if(newHash.length < 64) {
        alert("invalid hash length (security check 6)");
        return;
      }
      
      if(newHash.slice(0, 2) !== "0x") {
        alert("invalid hash (security check 7)");
        return;
      }
      
      if(newHash === "") {
        alert("hash area cannot be empty (security check 8)");
        return;
      }

      //SYSTEM CHECKS
      let systemPause = await contractCoinFog.status();
      if(systemPause === true) {
        alert("System has been paused by owner. Contact him to unpause it");
        return;
      }

      //USER CHECKS
      let feePaidStatus = await contractCoinFog.feePayers(userAccount);
      if(feePaidStatus === false) {
        alert("You need to pay transaction fee (security check 9)");
        return;
      }

      let doesHashExist = await contractCoinFog.checkHashExist(newHash);
      if(doesHashExist === true) {
        alert("this hash already exists, create a new hash from another private keyword (security check 10)");
        return;
      }

      await contractCoinFog.withdrawPart(privateWord, newHash, receiverAddress, amount);
      setMessage("Part Withdrawal is successful");

  }

  return (
    <div>
      <button className='button10' onClick={withdrawPartly}>Withdraw Part</button>{isMobile ? <br/> : ""}
      <input type="text" className='inputFields' placeholder='private keyword' 
      value={privateWord} onChange={e => setPrivateWord(e.target.value)} />
      <input type="text" className='inputFields' placeholder='receiver address'
      value={receiverAddress} onChange={e => setReceiverAddress(e.target.value)} />{isMobile ? <br/> : ""}
      <input type="number" className='inputFields' placeholder='amount' 
      value={amount} onChange={e => setAmount(e.target.value)} />
      <input type="text" className='inputFields' placeholder='new hash' 
      value={newHash} onChange={e => setNewHash(e.target.value)} />{message}
    </div>
  )
}

export default FogWithdrawPart;
