import React from 'react';
import ConnectMet from './ConnectMet';

function TokenRead() {
  return (
    <div className='tokenReadDiv'>
      <p>To use this website: <br />
        1. Make sure you have Metamask installed on your browser <br />
        2. Make sure you are on BNB Testnet <br />
        3. Make sure you have BNB tokens (Faucet is in BNB Discord)
      </p>
      <p>
        4. Mint 400 tokens <i>(Token Operations-Mint TokenA)</i><br />
        5. Approve Turbo Staking Contract with 400 tokens <br /><i>(Platform Operations-Approve)</i><br />
        6. See your allowance, it should be 400 tokens <br /><i>(Platform Operations-Get Balances)</i><br />
        7. Stake 100 tokens <i>(Platform Operations-Stake)</i><br />
        8. See your stakes <i>(Platform Operations-Display Stakes)</i><br />
        9. You can play with other buttons also.
      </p>
      < ConnectMet />
    </div>
  )
}

export default TokenRead;