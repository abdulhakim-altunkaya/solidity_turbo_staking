import React, {useState} from 'react';

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
                    <span>Owner address:</span> 0x50b716662ca9717BA5DD7B20b5b722Cf15B0821B <br />   
                    <span>TurboStaking address:</span> 0x478bf3f120f6EDD3970941D4632897918212F5d9 <br />
                    <span>TokenA address:</span> 0x964e16939c2Bd80AFD75184D3D7ec61b384f15B0 <br />
                    <span>TokenA symbol & Cap:</span>  TOKA, 1000000 <br />
                    <span>TokenA Standard & Decimals:</span>  ERC20, 18 <br />
                    <span>Network:</span> opBNB Testnet <br />
                </div>
                </>
                :
                <></>
            }
        </div>
    )
}

export default ConnectMet;

