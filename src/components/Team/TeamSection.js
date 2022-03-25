import React from 'react'
import { teamSectionContent } from '../../static/siteContent'

const TeamSection = () => {
  return (
    <div className="team-section" id="team-section">
      <div className="container">
        <div className="team-section-content">
          <h1 className="section-heading">MEET OUR TEAM</h1>

          <div className="team-card-list">
            <div className="team-card">
              <div className="team-card-content">
                <div className="team-card-image">
                  <img src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622e295f8a14ed3d69921b59.jpeg" alt="" data-aos="zoom-out" />
                </div>
                <h3>{teamSectionContent.teamMemberOneName}</h3>
                <p>{teamSectionContent.teamMemberOneDescription}</p>
              </div>
            </div>
            <div className="team-card">
              <div className="team-card-content">
                <div className="team-card-image">
                  <img src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622e295f8a14ede143921b5a.jpeg" alt="" data-aos="zoom-out" />
                </div>
                <h3>{teamSectionContent.teamMemberTwoName}</h3>
                <p>{teamSectionContent.teamMemberTwoDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamSection