import React from 'react';
import content from '../content';
import './cards.scss';

export default function Cards() {
  return (
    <div>
        <h1 className='cardHeading'>THE METAVERSE THE WORLD NEEDS</h1>
        <div>
            {/* {top section part} */}
            <div className="hex">
                <div className="hex-background">
                    <div className="hex-content">
                    {content[2].imgOne}
                    <h1>{content[2].titleOne}</h1>
                    <p>{content[2].paraOne}</p>
                    </div>
                </div>
            </div>
        {/* {middle 2 section start} */}
        <div className='cardsTwo'>
        <div className="hex">
                <div className="hex-background">
                    <div className="hex-content">
                    {content[2].imgOne}
                    <h1>{content[2].titleOne}</h1>
                    <p>{content[2].paraOne}</p>
                    </div>
                </div>
            </div>
            <div className="hex">
                <div className="hex-background">
                    <div className="hex-content">
                    {content[2].imgOne}
                    <h1>{content[2].titleOne}</h1>
                    <p>{content[2].paraOne}</p>
                    </div>
                </div>
            </div>
        </div>
        {/* { middle 2 sections end } */}
        {/* bottom 3 sections start */}
        <div className='cardsThree'>
            <div className="hex">
                <div className="hex-background">
                    <div className="hex-content">
                    {content[2].imgOne}
                    <h1>{content[2].titleOne}</h1>
                    <p>{content[2].paraOne}</p>
                    </div>
                </div>
            </div>
            <div className="hex">
                <div className="hex-background">
                    <div className="hex-content">
                    {content[2].imgOne}
                    <h1>{content[2].titleOne}</h1>
                    <p>{content[2].paraOne}</p>
                    </div>
                </div>
            </div>
            <div className="hex">
                <div className="hex-background">
                    <div className="hex-content">
                    {content[2].imgOne}
                    <h1>{content[2].titleOne}</h1>
                    <p>{content[2].paraOne}</p>
                    </div>
                </div>
            </div>
        </div>
        {/* bottom 3 sections ends*/}
        </div>
    </div>
  )
}
