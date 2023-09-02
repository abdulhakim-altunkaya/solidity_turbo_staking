import React, { useState } from 'react';
import { useAccount } from '../../Store';
import { AddressTurboStaking } from "../AddressABI/AddressTurboStaking";
import { useMediaQuery } from 'react-responsive';


function StakingRewardStake() {

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const {ethereum} = window;

  const contractTurboStaking = useAccount(state => state.contractTurboStaking2);
  const contractTokenA = useAccount(state => state.contractTokenA2);
  
  let [indexInput, setIndexInput] = useState("");
  let [message, setMessage] = useState("");

  const stakeReward = async () => {

    //LOCAL VARIABLES
    let indexInput1 = parseInt(indexInput);

    let userAccount;
    if(window.ethereum !== "undefined") {
      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      userAccount = accounts[0];
    }

    //AMOUNT CHECKS
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
        alert("The input is not a valid index number. Dont use negative sign or commas. (Security Check 4)");
        return;
    }

    //USER CHECKS
    let stakerStatus = await contractTurboStaking.isStaker();
    if(stakerStatus === false) {
      alert("You dont have any reward. Your staking balance is 0 (security check 5)");
      return;
    }

    //SYSTEM CHECKS
    let systemPause = await contractTurboStaking.isPaused();
    if(systemPause === true) {
      alert("System has been paused by owner. Contact him to unpause it (security check 6)");
      return;
    }

    await contractTurboStaking.stakeReward(indexInput1);
    setMessage(`You successfully staked your Reward of ${indexInput1} token`);
  }

  return (
    <div>
      <button className='button10' onClick={stakeReward}>Stake Reward</button>{isMobile ? <br /> : ""}
      <input type="number" className='inputFields' placeholder='stake number'
      value={indexInput} onChange={e => setIndexInput(e.target.value)}/> {message}
    </div>
  )
}

export default StakingRewardStake;


