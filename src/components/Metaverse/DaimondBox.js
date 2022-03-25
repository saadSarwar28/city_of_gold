import React from 'react'

const DaimondBox = ({
  title,
  description,
  imageUrl,
  rest,
}) => {
  return (
    <div className="box first" data-aos="fade-down" {...rest}>
      <div className="box-content">
        {
          imageUrl && 
            <div className="img">
              <img src={imageUrl} alt="" />
            </div>
        }
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default DaimondBox