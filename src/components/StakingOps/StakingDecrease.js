import React, { useState } from 'react';
import { useAccount } from '../../Store';
import { useMediaQuery } from 'react-responsive';


function StakingDecrease() {

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const {ethereum} = window;

  const contractTurboStaking = useAccount(state => state.contractTurboStaking2);
  
  let [indexInput, setIndexInput] = useState("");
  let [amountInput, setAmountInput] = useState("");
  let [receiverAddress, setReceiverAddress] = useState("");
  let [message, setMessage] = useState("");

  const stakeDecrease = async () => {

    //LOCAL VARIABLES
    let indexInput1 = parseInt(indexInput);
    let amountInput1 = parseInt(amountInput);


    if(window.ethereum !== "undefined") {
      await ethereum.request({method: "eth_requestAccounts"});
    } else {
      alert("dowload metamask please (Security Check 1)");
      return;
    }

    //INDEX and AMOUNT CHECKS
    if(indexInput1 === "" && amountInput1 === "") {
      alert("index number and amount cannot be empty (Security Check 2)");
      return;
    }

    if(indexInput === "" && amountInput === "") {
      alert("index number and amount cannot be empty (Security Check 3)");
      return;
    }

    if(indexInput1 < 0 && amountInput1 < 0) {
      alert("index number and amount cannot be less than 0 (Security Check 4)");
      return;
    }

    if(!/^\d+$/.test(indexInput1)) {
        alert("Index number not valid. Dont use negative sign or commas. (Security Check 5)");
        return;
    }
    if(!/^\d+$/.test(amountInput1)) {
        alert("Amount is not valid. Dont use negative sign or commas. (Security Check 6)");
        return;
    }

    //RECEIVER ADDRESS CHECKS
    if(receiverAddress.length < 39) {
      alert("invalid address length (security check 7)");
      return;
    }
    if(receiverAddress.slice(0, 2) !== "0x") {
      alert("invalid address (security check 8)");
      return;
    }

    //USER CHECKS
    let stakerStatus = await contractTurboStaking.isStaker();
    if(stakerStatus === false) {
      alert("Your staking balance is 0 (security check 9)");
      return;
    }

    let stakeAmount = await contractTurboStaking.displaySpecificStakeAmount(indexInput1);
    let stakeAmount2 = stakeAmount.toString();
    let stakeAmount3 = parseInt(stakeAmount2);
    if(stakeAmount3 < 1) {
        alert("Stake amount for this number is 0. Check you stake number. (security check 10)");
        return;
    }

    //SYSTEM CHECKS
    let systemPause = await contractTurboStaking.isPaused();
    if(systemPause === true) {
      alert("System has been paused by owner. Contact him to unpause it (security check 11)");
      return;
    }

    await contractTurboStaking.decreaseStake(indexInput1, amountInput1, receiverAddress);
    setMessage(`You successfully decreased your staking by ${amountInput1} token`);
  }

  return (
    <div>
      <button className='button10' onClick={stakeDecrease}>Decrease Stake</button>{isMobile ? <br /> : ""}
      <input type="number" className='inputFields' placeholder='Stake Number'
        value={indexInput} onChange={e => setIndexInput(e.target.value)}/>
      <input type="number" className='inputFields' placeholder='Decrease Amount'
        value={amountInput} onChange={e => setAmountInput(e.target.value)}/>
      <input type="string" className='inputFields' placeholder='Receiver Address'
        value={receiverAddress} onChange={e => setReceiverAddress(e.target.value)}/><br/>{message}
    </div>
  )
}

export default StakingDecrease;


