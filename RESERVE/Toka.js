import React, {useState} from 'react';
import TokaMint from "./TokaMint";
import TokaBurn from "./TokaBurn";
import TokaBalance from "./TokaBalance";

function Toka() {

  let [displayStatus, setDisplayStatus] = useState(false);

  const displayTokaOps = () => {
    setDisplayStatus(!displayStatus);
  }

  return (
    <div>
      <button onClick={displayTokaOps} className='button9'>TokenA Operations</button>
      {
        displayStatus ? 
        <>
          <TokaMint />
          <TokaBurn />
          <TokaBalance />
        </>
        :
        <></>
      }
    </div>
  )
}

export default Toka