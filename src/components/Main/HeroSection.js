import React from 'react'
import DiscordButton from '../Buttons/DiscordButton'

const HeroSection = () => {
  return (
    <div className="hero-section">
      {/* Hero section content where heading and paragraph lives */}
      <div className="content">
        <h1>Welcome To The World That Is <b>Owned By You!</b></h1>

        <h2>Coming To You In April</h2>
        <DiscordButton />
      </div>

      {/* Hero section image */}
      <div className="image" data-aos="fade-left">
        <img src="./images/1.png" alt="home-image" />
      </div>
    </div>
  )
}

export default HeroSection