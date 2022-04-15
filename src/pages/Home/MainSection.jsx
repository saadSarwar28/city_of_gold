/* 
  - Landing page section  
  - Includes Nav and Hero Section  
*/

import React from 'react'
import "./home.css";
import HeroSection from './HeroSection'
import Nav from '../../components/Nav/Nav';


const MainSection = () => {
  return (
    <div className="main" id="main-section">
      <div className="container">
        <div className="main--wrapper">
          <Nav />
          <HeroSection />
        </div>
      </div>
    </div>
  )
}

export default MainSection