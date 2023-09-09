import React from 'react';
import StakingBalances from "./StakingBalances";
import StakingApprove from "./StakingApprove";
import StakingDeposit from "./StakingDeposit";
import StakingRewardStake from "./StakingRewardStake";
import StakingRewardClaim from "./StakingRewardClaim";
import StakingDecrease from "./StakingDecrease";
import Unstake from "./Unstake";

function Staking() {
  return (
    <div>
      <StakingBalances />
      <StakingApprove />
      <StakingDeposit />
      <StakingRewardStake />
      <StakingRewardClaim />
      <StakingDecrease />
      <Unstake />

      <p id='aboutText'>Project created by Abdulhakim Altunkaya for BNB-RiseIn September 2023 Hackathon</p>
    </div>
  )
}

export default Staking;