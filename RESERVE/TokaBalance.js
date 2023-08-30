import React, {useState} from 'react';
import { useAccount } from '../../Store';  

function TokaBalance() { 

  const contractTokenA = useAccount(state => state.contractTokenA2);

  let [balance, setBalance] = useState("");

  const getBalance = async () => {
      let userBalance = await contractTokenA.getYourBalance();
      let userBalance2 = userBalance.toString();
      setBalance(userBalance2);
  }

  return (
    <div>
        <button onClick={getBalance} className='button4'>See Balance</button>
        <span className='spanTokens'>User TokenA Balance: {balance}</span>
    </div>
  )
}

export default TokaBalance;