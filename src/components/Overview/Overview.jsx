/* 
  Overview Section
*/


import React from 'react';
import "./overview.css";
import { overviewSectionContent } from '../../static/siteContent';
import overviewImage from "../../static/images/3.png";
import CustomImage from '../CustomImage';

const Overview = () => {
  return (
    <div className="overview--wrapper" id="overview-section">
      <div className="container">
        <div className="overview">

          {/* Overview image section */}
          <div className='overview__image' data-aos="fade-right">
            <CustomImage 
              imgSrc={overviewImage}
              imgAlt={"overview__content__image"}
            />
            {/* <img src={overviewImage} alt="overview__content__image" /> */}
          </div>

          {/* Overview Content section */}
          <div className='overview__content'>
            <h2 className='overview__content__heading'><b>Overview</b></h2>
            <p className='overview__content__paragraph'>
              {overviewSectionContent.overviewParagraph}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview;