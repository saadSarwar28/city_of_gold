import React from 'react';
import './gallery.scss';
import content from "../content";
export default function Gallery() {

  
  return (
    <div>
      <div>
        <h1 className="headingOne">Gallery</h1>
      </div>
      <div className="gallery">
          {content[1].galleryOne}
          {content[1].galleryTwo}
          {content[1].galleryThree}
          {content[1].galleryFour}
      </div>
    </div>
  )
}
