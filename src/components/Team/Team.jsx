import React from 'react'
import { teamSectionContent } from '../../static/siteContent'
import teamMemberOneImageSrc from "../../static/images/team-member-1.jpeg";
import teamMemberTwoImageSrc from "../../static/images/team-member-2.jpeg";
import "./team.css";

const Team = () => {
  return (
    <div className="team" id="team-section">
      <div className="container">
        <div className="team__body">
          <h1 className="section-heading">MEET OUR TEAM</h1>

          <div className="team__card__list">
            <div className="team__card">
              <div className="team__card__content">
                <div className="team__card__image team__card__image--one">
                  <img src={teamMemberOneImageSrc} alt="" data-aos="zoom-out" />
                </div>
                <h3>{teamSectionContent.teamMemberOneName}</h3>
                <p>{teamSectionContent.teamMemberOneDescription}</p>
              </div>
            </div>
            <div className="team__card">
              <div className="team__card__content">
                <div className="team__card__image team__card__image--two">
                  <img src={teamMemberTwoImageSrc} alt="" data-aos="zoom-out" />
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

export default Team