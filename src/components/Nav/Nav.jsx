// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useEffect, useRef, useState} from 'react'
import DiscordButton from '../Buttons/DiscordButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faXmark, faBars} from "@fortawesome/free-solid-svg-icons";
import {Link, useLocation} from 'react-router-dom';
import {routeUrl} from '../../utils/routeUrls';
import "./nav.css";
import {ethers} from "ethers";

const Nav = () => {
    const location = useLocation()
    const mobileNavRef = useRef();

    const [address, setAddress] = useState('Connect Wallet')

    useEffect(() => {
        if (window.ethereum) {
            // @ts-ignore
            window.ethereum.request({method: 'eth_requestAccounts'})
                .then(result => {
                    // @ts-ignore
                    setAddress(String(result[0]).substring(0, 3) + '...' + String(result[0]).substring(39, 42))
                })
                .catch(error => {
                    console.log(error)
                });
        } else {
            alert('Please install metamask');
        }
    })

    const connectWallet = () => {
        if (address === 'Connect Wallet') {
            if (window.ethereum) {
                // @ts-ignore
                window.ethereum.request({method: 'eth_requestAccounts'})
                    .then(result => {
                        // @ts-ignore
                        setAddress(String(result[0]).substring(0, 3) + '...' + String(result[0]).substring(39, 42))
                    })
                    .catch(error => {
                        console.log(error)
                    });
            } else {
                alert('Please install metamask');
            }
        }
    }


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
                    <img
                        src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622c01e16fc5bb0fea50a60f.png"
                        alt="City of gold logo"/>
                </div>
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
                {/* Discord Button */}
                <button className="discord-button" onClick={connectWallet}>{address}</button>
                {/* Menu Button */}
                <div className="menu-button" onClick={openNavMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
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
                    <button className="discord-button" onClick={connectWallet}>{address}</button>
                    <FontAwesomeIcon icon={faXmark} onClick={closeNavMenu}
                                     className="close-menu-button"></FontAwesomeIcon>
                </ul>
            </div>
        </>
    )
}

export default Nav