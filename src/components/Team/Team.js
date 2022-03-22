import React from 'react';
import './team.scss';
import content from '../content';

export default function Team() {
  return (
    <div>
        <h1 className='teamHeading'>MEET OUR TEAM</h1>
        <section className='team'>
            <div className='team-container'>
                {content[8].playerOneImg}
                <div className='teamInfo'>
                  <h2>
                  {content[8].playerOne}
                  </h2>
                  <p>
                  {content[8].descOne}
                  </p>
                </div>
            </div>
            <hr className='teamGap'/>
            <div className='team-container-two'>
                {content[8].playerTwoImg}
                <div className='playerInfo'>
                  <h2>
                  {content[8].playerTwo}
                  </h2>
                  <p>
                  {content[8].descTwo}
                  </p>
                </div>
            </div>
      </section>
    </div>
  )
}
