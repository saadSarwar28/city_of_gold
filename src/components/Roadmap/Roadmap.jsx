import React from 'react'
import { roadmapSectionContent } from '../../static/siteContent'
import DaimondBox from '../Metaverse/DaimondBox'
import "./roadmap.css"

const Roadmap = () => {
  return (
    <div className="roadmap-section" id="roadmap-section">
      <div className="container">
        <h1 className="section-heading">ROADMAP</h1>
        {/* <span>The wolrd you'va been waiting for</span> */}
        <div className="roadmap-section-content">
          <div className="box-list roadmap-first">
            <DaimondBox
              title={roadmapSectionContent.boxOneHeading}
              description={roadmapSectionContent.boxOneDescription}
              imageUrl={roadmapSectionContent.boxOneImageUrl}
              rest={{
                "className": "box one",
                "data-aos": "fade-down-right",
              }}
            />

            <DaimondBox
              title={roadmapSectionContent.boxTwoHeading}
              description={roadmapSectionContent.boxTwoDescription}
              imageUrl={roadmapSectionContent.boxTwoImageUrl}
              rest={{
                "className": "box two",
                "data-aos": "fade-down",
              }}
            />

            <DaimondBox
              title={roadmapSectionContent.boxThreeHeading}
              description={roadmapSectionContent.boxThreeDescription}
              imageUrl={roadmapSectionContent.boxThreeImageUrl}
              rest={{
                "className": "box three",
                "data-aos": "fade-down-left",
              }}
            />
           
          </div>
          <div className="box-list roadmap-second">
            <DaimondBox
              title={roadmapSectionContent.boxFourHeading}
              description={roadmapSectionContent.boxFourDescription}
              imageUrl={roadmapSectionContent.boxFourImageUrl}
              rest={{
                "className": "box four",
                "data-aos": "fade-up-right",
              }}
            />

            <DaimondBox
              title={roadmapSectionContent.boxFiveHeading}
              description={roadmapSectionContent.boxFiveDescription}
              imageUrl={roadmapSectionContent.boxFiveImageUrl}
              rest={{
                "className": "box five",
                "data-aos": "fade-up-left",
              }}
            />
           
          </div>
          <div className="box-list roadmap-third">
            <DaimondBox
              title={roadmapSectionContent.boxSixHeading}
              description={roadmapSectionContent.boxSixDescription}
              imageUrl={roadmapSectionContent.boxSixImageUrl}
              rest={{
                "className": "box six",
                "data-aos": "fade-up",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Roadmap