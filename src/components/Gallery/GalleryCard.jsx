import React from 'react'

const GalleryCard = ({
  imageSrc,
}) => {
  return (
    <div className="gallery__card">
      <img src={imageSrc} alt="gallery-image" />
    </div>
  )
}

export default GalleryCard