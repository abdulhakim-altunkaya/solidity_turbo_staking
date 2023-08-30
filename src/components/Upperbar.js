import React from "react";
import { useNavigate } from "react-router-dom";

function Upperbar() {
  const navigate = useNavigate();

  return(
    <div className='upperbarDiv'>
      <div className='upperbarLogoDiv'>
        <img src="logo3.png" alt="logo of the page. You can click it to return to main page" 
        id='logo' onClick={ () => navigate("/")} />
      </div>
      <div className='upperbarButtonsDiv'>
        <span className='button6' onClick={ () => navigate("/") }>TOKEN OPERATIONS</span>
        <span className='button6' onClick={ () => navigate("/platform")}>PLATFORM OPERATIONS</span>
      </div>
    </div>
  )
}

export default Upperbar;