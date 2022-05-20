import React, { useState } from 'react'
import { BsCheck2 } from "react-icons/bs";

const ConversionImage = ({
  imgSrc,
  isSelectHandler,
}) => {
  
  const [isSelected, setIsSelected] = useState(false);
  
  const selectImage = () => {
    isSelectHandler(setIsSelected);
    // setIsSelected(prev => !prev);/
  }

  return (
    <div 
      className={`conversion__image ${isSelected && "active"}`}
      onClick={selectImage}  
    >
      <img src={imgSrc} alt="conversion-image" width={400} height={400} />
    </div>
  )
}

export default ConversionImage