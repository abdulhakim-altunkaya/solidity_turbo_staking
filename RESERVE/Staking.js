import React from 'react';
import StakingBalances from "./StakingBalances";
import StakingApprove from "./StakingApprove";
import StakingHash from "./StakingHash";
import StakingDeposit from "./StakingDeposit";
import StakingWithdrawAll from "./StakingWithdrawAll";
import StakingWithdrawPart from "./StakingWithdrawPart";
import StakingFee from "./StakingFee";

function Staking() {
  return (
    <div>
      <StakingBalances />
      <StakingApprove />
      <StakingFee />
      <StakingHash />
      <StakingDeposit />
      <StakingWithdrawAll />
      <StakingWithdrawPart />
      <p id='aboutText'>Project created by Abdulhakim Altunkaya. 2023 August</p>
    </div>
  )
}

export default Staking;