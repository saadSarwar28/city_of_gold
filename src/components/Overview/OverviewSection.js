import React from 'react'
import { overviewSectionContent } from '../../static/siteContent'

const OverviewSection = () => {
  return (
    <div class="overview-section" id="overview-section">
      <div class="container">
        <div class="overview-section-content">
          {/* Overview image section */}
          <div data-aos="fade-right">
            <img src="./images/3.png" alt="" />
          </div>

          {/* Overview Content section */}
          <div>
            <p><b>Overview</b></p> 
            <p>
              {overviewSectionContent.overviewParagraph}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverviewSection