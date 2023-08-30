import React from 'react';
import { useState } from 'react';
import { useAccount } from '../../Store';  
import { AddressCoinfog } from "../AddressABI/AddressTurboStaking";

function FogBalances() {

  const {ethereum} = window;

  const contractCoinFog = useAccount(state => state.contractCoinfog2);
  const contractTokenA = useAccount(state => state.contractTokenA2);

  let [balanceTokenA, setBalanceTokenA] = useState("");
  let [txFee, setTxFee] = useState("");
  let [userAllowanceAmount, setUserAllowanceAmount] = useState("");

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
    let userAllowance = await contractTokenA.allowance(userAccount, AddressCoinfog);
    let userAllowance2 = userAllowance / (10**18);
    let userAllowance3 = userAllowance2.toString();

    //getting fee data
    let fee = await contractCoinFog.fee();
    let fee2 = fee / (10**18);
    let tokaBalance = await contractCoinFog.getContractTokenBalance();
    setBalanceTokenA(tokaBalance.toString())
    setTxFee(fee2.toString());
    setUserAllowanceAmount(userAllowance3);

    
  }

  return (
    <div>
      <p>
        To use this system: <br />
        1. Mint some TokenA ("TOKA") in "Token Operations" section. <br />
        2. Make sure you are on Fantom Mainnet and have some FTM coins. <br />
        3. Approve the system with any amount. Logic:<br />
        <span>Deposit amount &lt; Approve amount &lt; Your TokenA Balance</span><br />
        4. Think of a private keyword, like a password. Then write it in the "Create a Hash" input area <br />
        and click on "Create a Hash". It will give you a hash. <br />
        5. Save your private word and its hash. <br />
        6. Then pay fee by clicking on "Pay Fee" button. <br />
        7. Then go to "Deposit" area, enter hash and the TOKA amount you want to deposit. <br />
        8. Later if you want to withdraw all, first "Pay Fee" again, then go to "Withdraw All" button and enter details. <br />
        If you want to withdraw part, create a new hash from another keyword and enter other details and click "Withdraw Part".
      </p>
      <button onClick={getBalances} className='button10'>GET BALANCES</button> <br />

      <>
        <strong><span>CoinFog TokenA Pool Balance:</span></strong> {balanceTokenA} TokenA<br />
        <strong>User Allowance:</strong> {userAllowanceAmount} TokenA <br />
        <strong>Deposit and Withdrawal Fee:</strong> {txFee} FTM <br /> <br />
      </>

    </div>
  )
}

export default FogBalances;