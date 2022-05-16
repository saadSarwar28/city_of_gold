/***** 
 * Thankyou Page 
*****/

import React from 'react'
import StarsAnimtedBg from '../../components/AnimatedStarsBg/StarsAnimtedBg'
import Footer from '../../components/Footer/Footer'
import Nav from '../../components/Nav/Nav'
import "./thankyou.css"

const Thankyou = () => {
  return (
    <div>
      {/* Stars Animated Background  */}
      <StarsAnimtedBg />
        <div className="thankyou__content">
          <div className="container">
            <Nav />
            <div className='thankyou__wrapper'>
                <h1 className='thankyou__heading'>Thank you</h1>
            </div>

          </div>
          <div className="thankyou__footer__wrapper">
            <Footer />
          </div>
        </div>
    </div>
  )
}

export default Thankyou