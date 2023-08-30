import React from 'react';
import Toka from "./Toka";
import Owner from "../OwnerOps/Owner";

function TokenWrite() {
  return (
    <div className='tokenWriteDiv'>
      <Toka />
      <Owner />
    </div>
  )
}

export default TokenWrite;