import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons'
import "./footer.css"

const Footer = () => {
  return (
    <footer>
      <div className="footer__firstrow">
        <div className="container">
          <div className="second-row-content footer__firstrow__content">
            <div className="logo">
              <img src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622c01e16fc5bb0fea50a60f.png" alt="" />
            </div>
            <div className="socialLinks footer__social-links">
              <a href="https://twitter.com/cityofgold_io" target="_blank">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://www.instagram.com/cityofgold_io/" target="_blank">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://discord.gg/cityofgold" target="_blank">
                <FontAwesomeIcon icon={faDiscord} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__second-row">
        <div className="container">
          <div className="footer__second-row__content">
            <span>All rights reserved © City Of Gold</span>
            
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer