import React, {useState} from 'react';
import { AddressTurboStaking } from "../AddressABI/AddressTurboStaking";
import { AddressTokenA } from "../AddressABI/AddressTokenA";
import { AddressOwner } from "../AddressABI/AddressOwner";

function ConnectMet() {

    const {ethereum} = window;

    let [displayStatus, setDisplayStatus] = useState(false);
    let [account, setAccount] = useState("");

    const connectMetamask = async () => {
        if(window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts"});
            setAccount(accounts[0]);
            setDisplayStatus(!displayStatus);
        } else {
            alert("You need to install Metamask");
            return;
        }
    }


    return (

        <div>
            <button onClick={connectMetamask} className='button9'>CONNECT METAMASK</button>
            {
                displayStatus === true ? 
                <>
                <div className='contractDetailsDiv'>
                    <span>Your Metamask Account:</span>  <br />{account} <br /> 
                    <span>Owner address:</span> {AddressOwner} <br />   
                    <span>TurboStaking address:</span> {AddressTurboStaking} <br />
                    <span>TokenA address:</span> {AddressTokenA} <br />
                    <span>TokenA symbol & Cap:</span>  TOKA, 1000000 <br />
                    <span>TokenA Standard & Decimals:</span>  ERC20, 18 <br />
                    <span>Network:</span> BNB Testnet <br />
                </div>
                </>
                :
                <></>
            }
        </div>
    )
}

export default ConnectMet;

