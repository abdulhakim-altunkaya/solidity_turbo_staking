import React from 'react';
import StakingBalances from "./StakingBalances";
import StakingApprove from "./StakingApprove";
import StakingDeposit from "./StakingDeposit";
import StakingRewardStake from "./StakingRewardStake";
import StakingRewardClaim from "./StakingRewardClaim";






function Staking() {
  return (
    <div>
      <StakingBalances />
      <StakingApprove />
      <StakingDeposit />
      <StakingRewardStake />
      <StakingRewardClaim />

      <p id='aboutText'>Project created by Abdulhakim Altunkaya. 2023 August</p>
    </div>
  )
}

export default Staking;