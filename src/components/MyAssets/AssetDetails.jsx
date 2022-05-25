/***
 * This Component show the asset details with popup 
 ***/

import React, {useEffect, useState} from 'react'
import logoSrc from "../../static/images/logo_without_name.png";
import Modal from 'react-modal';
import cityViewImage from "../../static/images/cityofgold.jpg";
import { MdOutlineClose } from "react-icons/md";
import AssetDetailModal from './AssetDetailModal';
import {ethers} from "ethers";
import Addresses from "../../constants/contractAddresses";
import scoresAbi from "../../abi/Scores.json";
import TokenTypes from "../../utils/tokenTypes";

const AssetDetails = ({id, tokenType, address}) => {

    const [provider, setProvider] = useState(null)
    const [score, setScore] = useState('')
    const [multiplier, setMultiplier] = useState('0')

    useEffect(() => {
        if (window.ethereum && provider === null) {
            setProvider(new ethers.providers.Web3Provider(window.ethereum))
        }
    }, [address])

    // Popup State
    const [isOpen, setIsOpen] = useState(false);

    // Open Popup on Image Click
    const openModal = () => setIsOpen(true);
    
    // Close popup
    const closeModal = () => setIsOpen(false);

    useEffect(() => {
        if (window.ethereum && address !== '' && provider !== null) {
            console.log(' in use effect of scores')
            const scores = new ethers.Contract(Addresses.SCORES, scoresAbi, provider)
            if (tokenType == TokenTypes.LAND) {
                scores.getLandScore(id)
                    .then(res => {
                        setScore(res.toString())
                    })
            } else {
                scores.getEstateScore(id)
                    .then(res => {
                        setScore(res.toString())
                    })
                scores.getEstateMultiplier(id)
                    .then(res => {
                        setMultiplier('1.' + res.toString() + 'x')
                    })
            }
        }
    }, [address, provider])


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
                heading={"Property Details"}
                featureOne={tokenType}
                featureTwo={id}
                featureThree={score}
                featureFour={multiplier}
                imgSrc={logoSrc}
            />
        </>
    )
}


export default AssetDetails
