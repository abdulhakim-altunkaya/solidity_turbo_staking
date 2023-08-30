import React, {useState} from 'react';
import { useAccount } from '../../Store';  
 
function TokaMint() {

  const contractTokenA = useAccount( state => state.contractTokenA2);

  let [amount, setAmount] = useState("");
  let [message, setMessage] = useState("");

  const mintToken = async () => {
    let amount1 = parseInt(amount);

    //security check 1: minting must be bigger than 0
    if(amount1 === "") {
      alert("Please mint at least 1 (Security Check 1)");
      return;
    }
    if(amount === "") {
      alert("mint at least 1 token (Security Check 2)");
      return;
    }

    //security check 2: if you have 1000 toka, you cannot mint more
    let userBalance = await contractTokenA.getYourBalance();
    let userBalance2 = userBalance.toString();
    let userBalance3 = parseInt(userBalance2);
    if(userBalance3 > 1000) {
      alert("You have more than 1000 TokenA. You cannot mint more (Security Check 3)");
      return;
    }

    //security check 3: more input validations
    if(amount1 > 499) {
      alert("Each minting call has a limit of 499 (Security Check 4)");
      return;
    } else if(amount1 < 1) {
      alert("Please mint at least 1 token (Security Check 5)");
      return;
    }

    //execution
    await contractTokenA.mintTokenGenerals(amount1);
    setMessage(`Success, you minted ${amount1} tokenA`);
  }

  return (
    <div>
      <button onClick={mintToken} className='button4'>Mint TokenA</button>
      <input type="number" placeholder='mint 1-499' className='inputFields'
      value={amount} onChange={(e) => setAmount(e.target.value)}/> {message}
    </div>
  )
}

export default TokaMint