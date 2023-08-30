import React, { useState }  from 'react';
import { useAccount } from '../../Store';  

function FogHash() {
  const contractCoinFog = useAccount(state => state.contractCoinfog2);

  let [privateWord, setPrivateWord] = useState("");
  let [message, setMessage] = useState("");
  let [hashOutput, setHashOutput] = useState("");

  const hashString = async () => {
    if(privateWord.length < 1 || privateWord.length > 1000) {
      alert("Private word length must be: 1-1000 characters (security check 1)");
      return;
    }

    if(privateWord === "") {
      alert("Enter something into the input field (security check 2)");
      return;
    }

    let newHash = await contractCoinFog.createHash(privateWord);
    setMessage("The keccak256 hash of your private keyword is:");
    setHashOutput(newHash);
  }

  return (
    <div>
      <br />
      <button className='button10' onClick={hashString}>Create a Hash</button>
      <input type="text" className='inputFields' placeholder='private keyword' 
      value={privateWord} onChange={e => setPrivateWord(e.target.value)}/> <br /> 
      {message} <br />
      {hashOutput}
    </div>
  )
}

export default FogHash;