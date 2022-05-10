// Custom Image

import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const CustomImage = ({imgSrc, imgAlt, rest}) => {
  return (
    <LazyLoadImage 
      alt={imgAlt}
      src={imgSrc}
      {...rest} 
    />
    // <img src={imgSrc} alt={imgAlt} loading="lazy" {...rest}/>
  )
}

export default CustomImage