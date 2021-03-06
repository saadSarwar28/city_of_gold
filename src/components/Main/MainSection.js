// Main Section or Hero Section Component

import React from 'react'
import Nav from '../Nav/Nav'
import HeroSection from './HeroSection'
// import Nav from './Nav'

const MainSection = () => {
  return (
    <div className="main-section">
      <div className="container">
        <div className="hero-section-wrapper">
          <Nav />
          <HeroSection />
        </div>
      </div>
    </div>
  )
}

export default MainSection