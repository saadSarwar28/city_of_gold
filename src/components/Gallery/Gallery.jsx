/*  
  Gallery Section 
*/

import React from 'react'
import "./gallery.css";
import GalleryCard from './GalleryCard';

const Gallery = () => {
  return (
    <div className="gallery" id="gallery-section">
      <h1 className="section-heading">Gallery</h1>
      <div className="container">
        <div className="gallery--wrapper">
          <div className="gallery__list">
            <GalleryCard 
              imageSrc={"https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622f7b8e62214c5aa94c2403.jpeg"}
            />
            <GalleryCard 
              imageSrc={"https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622f81971198eb20f1a85525.jpeg"}
            />
            <GalleryCard 
              imageSrc={"https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622f7ec162214c08c34c253f.png"}
            />
            <GalleryCard 
              imageSrc={"https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622b4ff5bb4fc5b72cefcd9c.jpeg"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery