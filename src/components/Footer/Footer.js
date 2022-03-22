import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../Images/favicon.ico';
import facebook from '../../Images/facebook.svg';
import instagram from '../../Images/instagram.svg';
import twitter from '../../Images/twitter.svg';
import linkedin from '../../Images/linkedin.svg';
import './footer.scss';

export default function Footer() {
  return (
    <>
        <footer className='footer'>
            <div className='footer-container'>
                <div>
                    <img className='footerImage' src={logo} alt='footerLogo'/>
                </div>
                <div className='icons'>
                    <img src={facebook} alt='footerLogo'/>
                    <img src={instagram} alt='footerLogo'/>
                    <img src={twitter} alt='footerLogo'/>
                    <img src={linkedin} alt='footerLogo'/>
                </div>
            </div>
            <div className='footerMenu'>
                <Link to='/' className="footerlinks">Home</Link>
                <Link to='/' className="footerlinks">Overview</Link>
                <Link to='/' className="footerlinks">Roadmap</Link>
                <Link to='/' className="footerlinks">The Team</Link>
            </div>
            <div className='footerMenu'>
                <div>
                    <p>All rights reserved</p>
                </div>
                <div className='terms'>
                    <p>Terms & Conditions
                        <span>
                        Privacy Policy
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    </>
  )
}
