import React, { useState } from 'react';
import { useAccount } from '../../Store';
import { useMediaQuery } from 'react-responsive';


function StakingRewardClaim() {

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const {ethereum} = window;

  const contractTurboStaking = useAccount(state => state.contractTurboStaking2);
  
  let [indexInput, setIndexInput] = useState("");
  let [receiverAddress, setReceiverAddress] = useState("");
  let [message, setMessage] = useState("");

  const claimYield = async () => {

    //LOCAL VARIABLES
    let indexInput1 = parseInt(indexInput) - 1;

    if(window.ethereum !== "undefined") {
      await ethereum.request({method: "eth_requestAccounts"});
    } else {
      alert("dowload metamask please");
      return;
    }

    //INDEX CHECKS
    if(indexInput1 === "") {
      alert("index number cannot be empty (Security Check 1)");
      return;
    }

    if(indexInput === "") {
      alert("index number cannot be empty (Security Check 2)");
      return;
    }

    if(indexInput1 < 0) {
      alert("index number cannot be less than 0 (Security Check 3)");
      return;
    }

    if(!/^\d+$/.test(indexInput1)) {
        alert("Index number not valid. Dont use negative sign or commas. (Security Check 4)");
        return;
    }

    //RECEIVER ADDRESS CHECKS
    if(receiverAddress.length < 39) {
      alert("invalid address length (security check 2)");
      return;
    }
    if(receiverAddress.slice(0, 2) !== "0x") {
      alert("invalid address (security check 3)");
      return;
    }

    //USER CHECKS
    let stakerStatus = await contractTurboStaking.isStaker();
    if(stakerStatus === false) {
      alert("You dont have any reward. Your staking balance is 0 (security check 5)");
      return;
    }

    let stakeAmount = await contractTurboStaking.displaySpecificStakeAmount(indexInput1);
    let stakeAmount2 = stakeAmount.toString();
    let stakeAmount3 = parseInt(stakeAmount2);
    if(stakeAmount3 < 1) {
        alert("Stake amount for this number is 0. Check you stake number. (security check 5)");
        return;
    }

    //SYSTEM CHECKS
    let systemPause = await contractTurboStaking.isPaused();
    if(systemPause === true) {
      alert("System has been paused by owner. Contact him to unpause it (security check 6)");
      return;
    }

    await contractTurboStaking.claimReward(receiverAddress, indexInput1);
    setMessage(`You successfully claimed reward`);
  }

  return (
    <div>
      <button className='button10' onClick={claimYield}>Claim Reward</button>{isMobile ? <br /> : ""}
      <input type="number" className='inputFields' placeholder='Stake Number'
      value={indexInput} onChange={e => setIndexInput(e.target.value)}/>
      <input type="string" className='inputFields' placeholder='Receiver Address'
      value={receiverAddress} onChange={e => setReceiverAddress(e.target.value)}/>{message}
    </div>
  )
}

export default StakingRewardClaim;


