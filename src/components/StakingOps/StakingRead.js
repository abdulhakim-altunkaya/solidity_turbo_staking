import React, { useState } from 'react';
import { useAccount } from '../../Store';
import { useMediaQuery } from 'react-responsive';


function StakingRead() {

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const {ethereum} = window;

  const contractTurboStaking = useAccount(state => state.contractTurboStaking2);

  let [displayContent, setDisplayContent] = useState(false);
  let [itemElements, setItemElements] = useState("");
  let [userStakeBalance, setUserStakeBalance] = useState("");

  const displayAllStakes = async () => {

    if(window.ethereum !== "undefined") {
      await ethereum.request({method: "eth_requestAccounts"});
    } else {
      alert("dowload metamask please (Security check 1)");
      return;
    }

    //USER CHECKS
    let stakerStatus = await contractTurboStaking.isStaker();
    if(stakerStatus === false) {
      alert("You dont have any stake (Security check 2)");
      return;
    }

    //SYSTEM CHECKS
    let systemPause = await contractTurboStaking.isPaused();
    if(systemPause === true) {
      alert("System has been paused by owner. Contact him to unpause it (security check 3)");
      return;
    }

    let allStakes = await contractTurboStaking.displayStakes();
    const renderedStakes = allStakes.map((stake, index) => (
      <div className='resultParent' key={index}>
        <div><strong>{index +1}.</strong></div>
        <div>{stake.amount.toString().slice(0, -18)}</div>
        <div>{new Date(stake.startTime.toNumber() * 1000).toLocaleDateString()}</div>
      </div>
    ));
    setItemElements(renderedStakes);
    setDisplayContent(!displayContent);
    let userBalance = await contractTurboStaking.displayStakeBalance();
    setUserStakeBalance(userBalance.toString());

  }

  return (
    <div>
      <button className='button11' style={{marginLeft: "10px"}} onClick={displayAllStakes}>Display Stakes</button>{isMobile ? <br /> : ""}
      {displayContent === false ? 
        <></>
        :
        <>
          <br />
          <div className='resultParent'>
            <div><strong>Stake Number</strong></div>
            <div><strong>Amount</strong></div>
            <div><strong>Stake Date</strong></div>
          </div>
          {itemElements}
          <div className='stakingReadBalanceDiv'>
            <p><strong>Your Total Staking amount:</strong> {userStakeBalance}</p>
          </div>
        </>
        }

    </div>
  )
}

export default StakingRead;


