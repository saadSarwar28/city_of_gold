import React from 'react';
import './roadmap.scss'
import content from '../content';

export default function Roadmap() {
  return (
    <div>
        <div>
            <h1 className='roadmapHeading'>Roadmap</h1>
        </div>
        <article className='roadMap'>
        {/* top 3 sections start */}
        <div className='roadmapThree'>
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
        {/* top 3 sections ends*/}
        {/* {middle 2 section start} */}
        <div className='roadmapTwo'>
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
        </article>
    </div>
  )
}
