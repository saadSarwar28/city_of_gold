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
import { showWarningToast } from '../../utils/utilityFunctions';
import errorsMessage from '../../constants/errorMessages';
import { routeUrl } from '../../utils/routeUrls';

interface NavProps {
    walletConnected: () => void
}

// const Bottom: React.FC<BottomProps> = (
const Nav: React.FC<NavProps> = (
    {
        walletConnected
    }) => {
    const location = useLocation()
    const mobileNavRef = useRef();
    const navigation = useNavigate();

    const [address, setAddress] = useState('Connect Wallet')
    const [provider, setProvider] = useState(new ethers.providers.Web3Provider(window.ethereum))
    const [chainID, setChainId] = useState(0)
    // const [walletConnected, setWalletConnected] = useState(false)

    useEffect(() => {
        if (window.ethereum) {
            provider.listAccounts()
                .then(res => {
                    if (res.length > 0) {
                        setAddress(String(res[0]).substring(0, 3) + '...' + String(res[0]).substring(39, 42))
                        walletConnected()
                    }
                })
        } else {
            alert('Please install metamask');
        }
    })

    useEffect(() => {
        if (window.ethereum && address !== '') {
            provider.getNetwork().then(res => {
                setChainId(res.chainId)
            })
        }
    }, [provider])

    useEffect(() => {
        if (window.ethereum && chainID !== 4 && chainID !== 0) {
            // alert('Please switch to Ethereum Rinkeby Testnet in Metamask.')
            showWarningToast(errorsMessage.SWITCH_TO_RINKEBY_TESTNET);
            window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{chainId: '0x4'}], // chainId must be in hexadecimal numbers
            });
        }
    }, [chainID])

    const connectWallet = () => {
        if (address === 'Connect Wallet') {
            if (window.ethereum) {
                // @ts-ignore
                window.ethereum.request({method: 'eth_requestAccounts'})
                    .then(result => {
                        // @ts-ignore
                        setAddress(String(result[0]).substring(0, 3) + '...' + String(result[0]).substring(39, 42))
                        walletConnected()
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

    const launchDApp = () => {
        navigation(routeUrl.mint)
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
                {
                    location.pathname === routeUrl.mint ?
                        <ul className="nav__links">
                            <li>
                                <Link to={routeUrl.staking}>
                                    Hood
                                </Link>
                            </li>
                            <li>
                                <Link to={routeUrl.conversion}>
                                    Conversion
                                </Link>
                            </li>
                            <li>
                                <Link to={routeUrl.conversion}>
                                    My Assets
                                </Link>
                            </li>
                        </ul> :

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
                }


                {/* Checking if pathname is mint then its shows the address andd Connect Wallet */}
                {
                    // {/* Checking if pathname is mint then its shows the address andd Connect Wallet else it shoes Launch DAap button */ }
                    location.pathname === routeUrl.mint ?
                        // Connect Wallet Button and Address
                        <div className="discord-button">
                            <button onClick={connectWallet}>{address}</button>
                        </div> :

                        // Launch DAP Button
                        <div className="discord-button">
                            <button onClick={launchDApp}>Launch App</button>
                        </div>
                }

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
