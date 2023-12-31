import React from 'react';
import { useState } from 'react';
import { useAccount } from '../../Store';  
import { AddressTurboStaking } from "../AddressABI/AddressTurboStaking";
import { useMediaQuery } from 'react-responsive';

function StakingBalances() {

  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  const {ethereum} = window;

  const contractTurboStaking = useAccount(state => state.contractTurboStaking2);
  const contractTokenA = useAccount(state => state.contractTokenA2);

  let [balanceTokenA, setBalanceTokenA] = useState("");
  let [userAllowanceAmount, setUserAllowanceAmount] = useState("");
  let [currentApy, setCurrentApy] = useState("");
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

    //getting pool balance
    let tokaBalance = await contractTurboStaking.getContractTokenABalance();
    let tokaBalance2 = tokaBalance.toString();
    //getting apy data
    let apyValue = await contractTurboStaking.apy();
    let apyValue2 = apyValue.toString();


    setDisplayStatus(!displayStatus);
    setCurrentApy(apyValue2);
    setBalanceTokenA(tokaBalance2)
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
          <strong>Current APY:</strong> {currentApy} % <br /> {isMobile ? "" : <br /> }
        </>
      }



    </div>
  )
}

export default StakingBalances;