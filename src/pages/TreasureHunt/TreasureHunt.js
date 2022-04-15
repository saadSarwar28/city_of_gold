import React from 'react'
import Footer from '../../components/Footer/Footer'
import imageSrc from "../../static/images/city-sea-view.jpeg";
import DiscordButton from "../../components/Buttons/DiscordButton";
import "./treasure-hunt.css";
import Nav from '../../components/Nav/Nav';

const TreasureHunt = () => {
  return (
    <div className="gradient">
      <div className='container'>
        {/* Navbar */}
        <Nav />
        {/* Treasure Main heading section  */}
        <div className="treasure-hunt">
          <h1 className='treasure-hunt__heading'>Join The NFT Miami and Blockchain Week  <b>Treasure Hunt</b></h1>
        </div>


        {/* Second Section of treasure hunt */}
        <div className="treasure-hunt__body">
          <div className="treasure-hunt__content" data-aos="fade-right">
            <p>To kick off NFT and Blockchain week we will be doing a treasure hunt where participants will solve riddles searching the city of miami for “Gold.” There will be a total of 3 riddles for 3 chances to win where the winner will win a house & plot of land in our metaverse and will get picked up in our City of Gold wrapped Rolls Royce Cullinan and chauffeured to come with us to the BAYC (Bored Ape Yacht Club) Afterparty that we are sponsoring on the 10th. All clues will be released in our Discord. Happy Hunting & Goodluck.</p>
            <DiscordButton rest={{ className: "discord-button large" }}/>
          </div>
          <div className="treasure-hunt__image" data-aos="fade-left">
            <img src={imageSrc} alt="" />
          </div>

        </div>


      </div>
      <Footer />
    </div>
  )
}

export default TreasureHunt