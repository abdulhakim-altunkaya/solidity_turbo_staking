import React, { useState } from 'react';
import { useAccount } from '../../Store';

function FogFee() {

    const {ethereum} = window;//grabbing ethereum property of window object

    let [message, setMessage] = useState("");

    let contractCoinFog = useAccount(state => state.contractCoinfog2);

    const payFee = async () => {
        let userAccount;
        //checking if user already paid or not
        if(window.ethereum !== "undefined") {
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            userAccount = accounts[0];
        }

        let feePaidStatus = await contractCoinFog.feePayers(userAccount);
        if(feePaidStatus === true) {
          alert("You already have paid transaction fee. You dont need to pay again");
          return;
        }


        let txFee = await contractCoinFog.fee();
        let txFee2 = txFee.toString();
        const tx = await contractCoinFog.payFee({value: txFee2});
        await tx.wait();
        setMessage("You successfully paid fee")
        
    }

    return (
        <div>
            <button className='button10' onClick={payFee}>Pay Fee (1 FTM)</button> {message}
        </div>
    )
}

export default FogFee