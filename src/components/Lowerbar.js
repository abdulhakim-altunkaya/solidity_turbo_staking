import React from 'react';
import { Route, Routes } from  "react-router-dom";
import LowToken from "./LowToken";
import LowPlatform from "./LowPlatform";


function Lowerbar() {
  return (
    <div className='lowerbarDiv'>
      <Routes>
        <Route path="/platform" element={ < LowPlatform /> } />
        <Route path="/" element={ < LowToken /> } />
      </Routes>
    </div>
  )
}

export default Lowerbar