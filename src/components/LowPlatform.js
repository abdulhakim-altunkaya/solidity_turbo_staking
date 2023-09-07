import React from 'react';
import Staking from "./StakingOps/Staking";
import StakingRead from './StakingOps/StakingRead';

function LowPlatform() {
  return (
    <div className='mainTokenDiv'>
      <Staking />
      <StakingRead />
    </div>
  )
}

export default LowPlatform