import React from 'react';
import ConnectMet from './ConnectMet';

function TokenRead() {
  return (
    <div className='tokenReadDiv'>
      <p>To use this website: <br />
        1. Make sure you have Metamask installed on your browser <br />
        2. Make sure you are on opBNB Testnet <br />
        3. Make sure you have opBNB tokens.
      </p>
      < ConnectMet />
    </div>
  )
}

export default TokenRead;