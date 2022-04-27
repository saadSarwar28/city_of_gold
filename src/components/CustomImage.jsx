// Custom Image

import React from 'react'

const CustomImage = ({imgSrc, imgAlt, rest}) => {
  return (
    <img src={imgSrc} alt={imgAlt} {...rest} loading="lazy"/>
  )
}

export default CustomImage