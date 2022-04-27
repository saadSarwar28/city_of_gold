import React from 'react'
import CustomImage from '../CustomImage'

const GalleryCard = ({
  imageSrc,
}) => {
  return (
    <div className="gallery__card">
      <CustomImage
        imgSrc={imageSrc}
        imgAlt={"gallery-image"}
      />
      {/* <img src={imageSrc} alt="gallery-image" /> */}
    </div>
  )
}

export default GalleryCard