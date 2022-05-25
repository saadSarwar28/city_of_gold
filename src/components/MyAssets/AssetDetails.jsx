/***
 * This Component show the asset details with popup 
 ***/

import React, {useState} from 'react'
import logoSrc from "../../static/images/logo_without_name.png";
import Modal from 'react-modal';
import cityViewImage from "../../static/images/cityofgold.jpg";
import { MdOutlineClose } from "react-icons/md";
import AssetDetailModal from './AssetDetailModal';

const AssetDetails = ({id}) => {
    // Popup State
    const [isOpen, setIsOpen] = useState(false);

    // Open Popup on Image Click
    const openModal = () => setIsOpen(true);
    
    // Close popup
    const closeModal = () => setIsOpen(false);

    return (
        <>
            {/* Asset Image  */}
            <div className='conversion__image active' onClick={openModal}>
                <img src={cityViewImage} alt="conversion-image" width={400} height={400} />
            </div>

            {/* Popup Modal   */}
            <AssetDetailModal 
                isOpen={isOpen}
                closeModal={closeModal}
                heading={""}
                featureOne={""}
                featureTwo={""}
                featureThree={""}
                featureFour={""}
                imgSrc={""}
            />
        </>
    )
}


export default AssetDetails
