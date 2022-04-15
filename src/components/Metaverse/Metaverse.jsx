// Metaverse Section

import React from 'react'
import "./metaverse.css"
import { metaverseSectionContent } from '../../static/siteContent'
import DaimondBox from './DaimondBox'
import boxOneImage from "../../static/images/8.png"
import boxThreeImage from "../../static/images/9.png"
import boxTwoImage from "../../static/images/10.png"
import boxFiveImage from "../../static/images/11.png"
import boxSixImage from "../../static/images/12.png"
import boxFourImage from "../../static/images/13.png"

const Metaverse = () => {
  return (
    <div className="metaverse-section" id="metaverse-section">
      <div className="container">
        <h1 className="section-heading">The Metaverse the world needs</h1>
        <div className="metaverse-section-content">

          <div className="box-list metaverse-first">
            <DaimondBox 
              title={metaverseSectionContent.boxOneHeading}
              description={metaverseSectionContent.boxOneDescription}
              imageUrl={boxOneImage}
              rest={{
                "className": "box one",
                "data-aos": "fade-down",
              }}
            />
          </div>

          <div className="box-list metaverse-second">
            <DaimondBox
              title={metaverseSectionContent.boxTwoHeading}
              description={metaverseSectionContent.boxTwoDescription}
              imageUrl={boxTwoImage}
              rest={{
                "className": "box two",
                "data-aos": "fade-down-right",
              }}
            />
            <DaimondBox
              title={metaverseSectionContent.boxThreeHeading}
              description={metaverseSectionContent.boxThreeDescription}
              imageUrl={boxThreeImage}
              rest={{
                "className": "box three",
                "data-aos": "fade-down-left",
              }}
            />
          </div>
          <div className="box-list metaverse-third">
            <DaimondBox
              title={metaverseSectionContent.boxFourHeading}
              description={metaverseSectionContent.boxFourDescription}
              imageUrl={boxFourImage}
              rest={{
                "className": "box four",
                "data-aos": "fade-up-right",
              }}
            />

            <DaimondBox
              title={metaverseSectionContent.boxFiveHeading}
              description={metaverseSectionContent.boxFiveDescription}
              imageUrl={boxFiveImage}
              rest={{
                "className": "box five",
                "data-aos": "fade-up",
              }}
            />

            <DaimondBox
              title={metaverseSectionContent.boxSixHeading}
              description={metaverseSectionContent.boxSixDescription}
              imageUrl={boxSixImage}
              rest={{
                "className": "box six",
                "data-aos": "fade-up-left",
              }}
            />
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Metaverse