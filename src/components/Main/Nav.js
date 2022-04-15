// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react'
import DiscordButton from '../Buttons/DiscordButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from 'react-router-dom';
import { routeUrl } from '../../utils/routeUrls';

const Nav = () => {
  const location = useLocation()
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
          <Link to={"/"}>
              Home
          </Link>
          {/* <a href="#hero-section"></a> */}
        </li>
        <li>
          <a href={
            location.pathname !== "/" ?
              "/#overview-section" :
              "#overview-section"   
          }>Overview</a>
        </li>
        <li>
            <a href={
              location.pathname !== "/" ?
                "/#roadmap-section" :
                "#roadmap-section"
            }>Roadmap</a>
        </li>
        <li>
          <a href={
            location.pathname !== "/" ?
              "/#team-section" :
              "#team-section"
          }>The Team</a>
        </li>
      </ul>
      {/* Discord Button */}
      <DiscordButton />
      {/* Menu Button */}
      <div className="menu-button" onClick={openNavMenu}>
        <span></span>
        <span></span>
        <span></span>
        {/* <FontAwesomeIcon icon={faBars}  /> */}
      </div>
    </nav>
    {/* Mobile Nav */}
    <div className="mobile-nav" ref={mobileNavRef}>
      <ul className="mobile-nav-links">
        <li>
          <a className="mobile-anchor-link" href="#">Home</a>
        </li>
        <li>
          <a className="mobile-anchor-link" 
            href={
              location.pathname !== "/" ?
                "/#overview-section" :
                "#overview-section"
            } 
            onClick={closeNavMenu}
          >Overview</a>
        </li>
        <li>
            <a className="mobile-anchor-link"
              href={
                location.pathname !== "/" ?
                  "/#roadmap-section" :
                  "#roadmap-section"
              }
              onClick={closeNavMenu}
            >Roadmap</a>
          {/* <a className="mobile-anchor-link" href="#roadmap-section" onClick={closeNavMenu}>Roadmap</a> */}
        </li>
        <li>
            <a className="mobile-anchor-link"
              href={
                location.pathname !== "/" ?
                  "/#team-section" :
                  "#team-section"
              }
              onClick={closeNavMenu}
            >The Team</a>
          {/* <a className="mobile-anchor-link" href="#team-section" onClick={closeNavMenu}>The Team</a> */}
        </li>
        <DiscordButton />
        {/* <a className="discord-button" href="https://discord.gg/cityofgold" target="_blank"><button>JOIN OUR DISCORD</button>
        </a> */}
          <FontAwesomeIcon icon={faXmark} onClick={closeNavMenu} className="close-menu-button"></FontAwesomeIcon>
      </ul>
    </div>
    </>
  )
}

export default Nav