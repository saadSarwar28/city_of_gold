// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react'
import DiscordButton from '../Buttons/DiscordButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  
  const mobileNavRef = useRef();

  const openNavMenu = () => {
    mobileNavRef.current.style.display = "flex"
  }

  const closeNavMenu = () => {
    mobileNavRef.current.style.display = "none";
  }
  return (
    <>
    <nav>
      {/* Nav logo */}
      <div className="logo">
        <img src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622c01e16fc5bb0fea50a60f.png"
          alt="City of gold logo" />
      </div>
      {/* Desktop Nav link */}
      <ul className="nav-links">
        <li>
          <a href="#hero-section">Home</a>
        </li>
        <li>
          <a href="#overview-section">Overview</a>
        </li>
        <li>
          <a href="#roadmap-section">Roadmap</a>
        </li>
        <li>
          <a href="#team-section">The Team</a>
        </li>
      </ul>
      {/* Discord Button */}
      <DiscordButton />
      {/* Menu Button */}
      <div className="menu-button" onClick={openNavMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>
    </nav>
    {/* Mobile Nav */}
    <div className="mobile-nav" ref={mobileNavRef}>
      <ul className="mobile-nav-links">
        <li>
          <a className="mobile-anchor-link" href="#">Home</a>
        </li>
        <li>
          <a className="mobile-anchor-link" href="#overview-section" onClick={closeNavMenu}>Overview</a>
        </li>
        <li>
          <a className="mobile-anchor-link" href="#roadmap-section" onClick={closeNavMenu}>Roadmap</a>
        </li>
        <li>
          <a className="mobile-anchor-link" href="#team-section" onClick={closeNavMenu}>The Team</a>
        </li>
        <a className="discord-button" href="https://discord.gg/cityofgold" target="_blank"><button>JOIN OUR DISCORD</button></a>
        <FontAwesomeIcon icon={faXmark} onClick={closeNavMenu}></FontAwesomeIcon>
      </ul>
    </div>
    </>
  )
}

export default Nav