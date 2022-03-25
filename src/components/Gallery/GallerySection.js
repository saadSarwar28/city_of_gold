// Gallery Section Component

import React from 'react'

const GallerySection = () => {
  return (
    <div className="gallery-section" id="gallery-section">
      <h1 className="section-heading">Gallery</h1>
      <div className="container">
        <div className="gallery-section-wrapper">
          <div className="gallery-section-content">
            <div className="gallery-card">
              <img src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622f7b8e62214c5aa94c2403.jpeg" alt="" />
            </div>
            <div className="gallery-card">
              <img src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622f81971198eb20f1a85525.jpeg" alt="" />
            </div>
            <div className="gallery-card">
              <img src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622f7ec162214c08c34c253f.png" alt="" />
            </div>
            <div className="gallery-card">
              <img src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622b4ff5bb4fc5b72cefcd9c.jpeg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GallerySection