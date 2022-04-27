import React from 'react'
import DiscordButton from '../../components/Buttons/DiscordButton'
import CustomImage from '../../components/CustomImage'
import heroImage from "../../static/images/1.png"

const HeroSection = () => {
  return (
    <div className="hero">
      {/* Hero section content where heading and paragraph lives */}
      <div className="hero__content">
        <h1 className='hero__content--heading'>Welcome To The World That Is <b>Owned By You!</b></h1>

        <h2 className='hero__content--subheading'>Coming To You In April</h2>
        <DiscordButton />
      </div>

      {/* Hero section image */}
      <div className="hero__image" data-aos="fade-left">
        <CustomImage 
          imgSrc={heroImage}
          imgAlt={"home-image"}
          rest={{
            loading: "lazy",
          }}
        />
        {/* <img src={heroImage} alt="home-image" loading='lazy' /> */}
      </div>
    </div>
  )
}

export default HeroSection