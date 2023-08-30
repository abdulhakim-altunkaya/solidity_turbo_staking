import React from 'react';
import TokenRead from "./TokenOps/TokenRead";
import TokenWrite from "./TokenOps/TokenWrite";

function LowToken() {
  return (
    <div className='mainTokenDiv'>
      <TokenRead />
      <TokenWrite />
    </div>
  )
}

export default LowToken