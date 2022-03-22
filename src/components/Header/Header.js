import React from 'react';
import { Link } from 'react-router-dom';
import "./header.scss";
import logo from "../../Images/favicon.ico"
// import { Link } from "react-router-dom";

export default function Header() {
  

  return (
    <div>
      <header className='nav'>
        <div className='navLink'>
          <img src={logo} alt='logo'/>
        </div>
        <div className='navMenu'>
          <Link to='/' className="links">Home</Link>
          <Link to='/' className="links">Overview</Link>
          <Link to='/' className="links">Roadmap</Link>
          <Link to='/' className="links">The Team</Link>
        </div>
        <div className='navBtn'>
          <button className='NavBtnLink'>JOIN OUR DISCORD</button>
        </div>
      </header>
    </div>
  )
}
