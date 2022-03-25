// Metaverse Section

import React from 'react'
import { metaverseSectionContent } from '../../static/siteContent'
// import { metaverseSectionContent } from '../../../public/static/siteContent'
import DaimondBox from './DaimondBox'

const MetaverseSection = () => {
  return (
    <div className="metaverse-section" id="metaverse-section">
      <div className="container">
        <h1 className="section-heading">The Metaverse the world needs</h1>
        <div className="metaverse-section-content">

          <div className="box-list metaverse-first">
            <DaimondBox 
              title={metaverseSectionContent.boxOneHeading}
              description={metaverseSectionContent.boxOneDescription}
              imageUrl={metaverseSectionContent.boxOneImageUrl}
              rest={{
                "className": "box first",
                "data-aos": "fade-down",
              }}
            />
          </div>

          <div className="box-list metaverse-second">
            <DaimondBox
              title={metaverseSectionContent.boxTwoHeading}
              description={metaverseSectionContent.boxTwoDescription}
              imageUrl={metaverseSectionContent.boxTwoImageUrl}
              rest={{
                "className": "box second",
                "data-aos": "fade-down-right",
              }}
            />
            <DaimondBox
              title={metaverseSectionContent.boxThreeHeading}
              description={metaverseSectionContent.boxThreeDescription}
              imageUrl={metaverseSectionContent.boxThreeImageUrl}
              rest={{
                "className": "box second",
                "data-aos": "fade-down-right",
              }}
            />
          </div>
          <div className="box-list metaverse-third">
            <DaimondBox
              title={metaverseSectionContent.boxFourHeading}
              description={metaverseSectionContent.boxFourDescription}
              imageUrl={metaverseSectionContent.boxFourImageUrl}
              rest={{
                "className": "box",
                "data-aos": "fade-up-right",
              }}
            />

            <DaimondBox
              title={metaverseSectionContent.boxFiveHeading}
              description={metaverseSectionContent.boxFiveDescription}
              imageUrl={metaverseSectionContent.boxFiveImageUrl}
              rest={{
                "className": "box",
                "data-aos": "fade-up",
              }}
            />

            <DaimondBox
              title={metaverseSectionContent.boxSixHeading}
              description={metaverseSectionContent.boxSixDescription}
              imageUrl={metaverseSectionContent.boxSixImageUrl}
              rest={{
                "className": "box",
                "data-aos": "fade-up-left",
              }}
            />
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default MetaverseSection