import React, {useState} from 'react'
import logoSrc from "../../static/images/logo_without_name.png";

const AssetDetails = ({id}) => {

    return (
        <div className='conversion__image active'>
            <img src={logoSrc} alt="conversion-image" width={400} height={400}/>
        </div>
    )
}

export default AssetDetails
