import React from 'react'

const HexagonNotchedButton = ({
  buttonText,
  rest,
  restText,
  width,
  height,
  padding,
  style
}) => {
  return (
    <button 
    className='button-hexagon border'
    {...rest}
    // style={{
    //   padding,
    //   width,
    //   height,
    //   ...style,
    // }}
    >
      <span {...restText}>{buttonText}</span>
    </button>
  )
}

export default HexagonNotchedButton