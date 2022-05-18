// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useEffect, useRef, useState} from 'react'
// import DiscordButton from '../Buttons/DiscordButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faXmark, faBars} from "@fortawesome/free-solid-svg-icons";
import {Link, useLocation, useNavigate} from 'react-router-dom';
// import {routeUrl} from '../../utils/routeUrls';
import "./nav.css";
import {ethers} from "ethers";
// import { Flip, toast, ToastContainer } from 'react-toastify';
import {showWarningToast} from '../../utils/utilityFunctions';
import errorsMessage from '../../constants/errorMessages';
import {routeUrl} from '../../utils/routeUrls';
import {HiOutlineMenuAlt3} from "react-icons/hi";
import {MdClose} from "react-icons/md";

// const Bottom: React.FC<BottomProps> = (
const Nav: React.FC<{}> = (
    {
        walletConnected
    }) => {
    const location = useLocation()
    const mobileNavRef = useRef();
    const navigation = useNavigate();

    const openNavMenu = () => {
        mobileNavRef.current.style.display = "flex"
    }

    const closeNavMenu = () => {
        mobileNavRef.current.style.display = "none";
    }

    const launchDApp = () => {
        navigation(routeUrl.mint)
    }


    return (
        <>
            <nav>
                {/* Nav logo */}
                <Link to={routeUrl.home}>
                    <div
                        className="logo"

                    >
                        <img
                            src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622c01e16fc5bb0fea50a60f.png"
                            alt="City of gold logo"/>

                    </div>
                </Link>
                {/* Desktop Nav link */}
                <ul className="nav__links">
                    <li>
                        <Link to={
                            location.pathname !== "/" ?
                                "/#main-section" :
                                "#main-section"
                        }>
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
                <div className="discord-button">
                    <button onClick={launchDApp}>Launch App</button>
                </div>
                {/* Menu Button */}
                <HiOutlineMenuAlt3 className='menu-button' onClick={openNavMenu}/>
            </nav>
            {/* Mobile Nav */}
            <div className="nav--mobile" ref={mobileNavRef}>
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
                    </li>
                    <div className="discord-button">
                        <button onClick={launchDApp}>Launch App</button>
                    </div>
                    <MdClose className="close-menu-button" onClick={closeNavMenu}/>
                </ul>
            </div>
        </>
    )
}

export default Nav
