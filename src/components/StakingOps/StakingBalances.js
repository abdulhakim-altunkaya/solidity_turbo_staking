import React from 'react';
import { useState } from 'react';
import { useAccount } from '../../Store';  
import { AddressTurboStaking } from "../AddressABI/AddressTurboStaking";

function StakingBalances() {

  const {ethereum} = window;

  const contractTurboStaking = useAccount(state => state.contractTurboStaking2);
  const contractTokenA = useAccount(state => state.contractTokenA2);

  let [balanceTokenA, setBalanceTokenA] = useState("");
  let [userAllowanceAmount, setUserAllowanceAmount] = useState("");
  let [displayStatus, setDisplayStatus] = useState(false);

  const getBalances = async () => {

    //getting user address who calls this function
    let userAccount;
    if(window.ethereum !== "undefined") {
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        userAccount = accounts[0];
    } else {
        alert("Please install Metamask");
        return;
    }
   
    //checking userallowance
    let userAllowance = await contractTokenA.allowance(userAccount, AddressTurboStaking);
    let userAllowance2 = userAllowance / (10**18);
    let userAllowance3 = userAllowance2.toString();

    //getting fee data
    let tokaBalance = await contractTurboStaking.getContractTokenABalance();

    setDisplayStatus(!displayStatus);
    setBalanceTokenA(tokaBalance.toString())
    setUserAllowanceAmount(userAllowance3);    
  }

  return (
    <div>
      <p>
        To use this system: <br />
        1. Mint some TokenA in "Token Operations" section. <br />
        2. Make sure you are on BNB Testnet and have some BNB coins. <br />
        3. "Approve" the system with any amount and then "Stake" the amount. <br />
      </p>
      <button onClick={getBalances} className='button10'>GET BALANCES</button> <br />

      {
        displayStatus === false ? 
        <></>
        :
        <>
          <strong><span>Staking Pool Balance:</span></strong> {balanceTokenA} TokenA<br />
          <strong>User Allowance:</strong> {userAllowanceAmount} TokenA <br />
        </>
      }



    </div>
  )
}

export default StakingBalances;