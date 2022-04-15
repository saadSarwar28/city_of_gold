/* 
  Staking Page
*/


import React from 'react'
import HexagonNotchedButton from '../../components/Buttons/HexagonNotchedButton';
import NotchedCornerButton from '../../components/Buttons/NotchedCornerButton';
import Nav from '../../components/Nav/Nav';
import walletImage from "../../static/images/wallet.png"
import "./dashboard.css"
import StakeInfoItem from './StakeInfoItem';



const Dashboard = () => {
  return (
    <div className='dashboard-page'>
      <div className="container">
        <Nav />
        <div className="stakeinfo__list">
          
          <StakeInfoItem 
            title="Total Land Owned"
            amount="0/0"
          />
          <StakeInfoItem 
            title="Total COG Earning"
            amount="0/0"
          />
          <StakeInfoItem 
            title="Total Land Staked"
            amount="0/0"
          />
          <StakeInfoItem 
            title="Total Estate Owned"
            amount="0/0"
          />
          <StakeInfoItem 
            title="Total COG Earning"
            amount="0/0"
          />
          <StakeInfoItem 
            title="Total Estate Staked"
            amount="0/0"
          />

        </div> 

        <div className="staking__wrapper">
          <div className="staking">
            <div className="staking__notched-box">
              <div className="staking__notched-box__content">
                <div className="flex flex-col gap-1 align-center">
                  <div className="wallet-image">
                    <img src={walletImage} alt="wallet-image" />
                  </div>
                  <HexagonNotchedButton 
                    buttonText={"CONNECT YOUR WALLET"}
                    rest={{
                      className:"button-hexagon border connect-you-wallet",
                      // style: connectYourWalletStyle,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;