import React, {useState} from 'react'

const ConversionImage = ({id, imgSrc, isSelectHandler, selectedId}) => {

    const [isSelected, setIsSelected] = useState(false);

    const selectImage = () => {
        isSelectHandler(setIsSelected);
        selectedId(id)
    }

    return (
        <div className={isSelected ? 'conversion__image active' : 'conversion__image'} onClick={selectImage}>
            <img src={imgSrc} alt="conversion-image" width={400} height={400}/>
            <div className='conversion__image__text'  >Land # {id}</div>
        </div>
    )
}

export default ConversionImage
