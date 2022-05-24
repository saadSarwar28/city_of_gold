/*
  My assets Page
*/

import React, {useEffect, useState} from 'react'
import "./myasset.css"
import {ethers} from "ethers";
import Addresses from "../../constants/contractAddresses";
import landAbi from "../../abi/Land.json";
import estateAbi from "../../abi/Estate.json";
import {showSuccessToast, showWarningToast} from '../../utils/utilityFunctions';
import errorMessages from '../../constants/errorMessages';
import successMessages from '../../constants/successMessages';
import AppNav from '../../components/Nav/AppNav';
import AssetDetails from "../../components/MyAssets/AssetDetails";
import cityViewImage from "../../static/images/cityofgold.jpg";
import Modal from 'react-modal';
import { MdOutlineClose } from "react-icons/md";
import { faBlackberry } from '@fortawesome/free-brands-svg-icons';

const MyAssets = () => {
    const [provider, setProvider] = useState(null)
    const [address, setAddress] = useState('')
    const [landContract, setLandContract] = useState(null)
    const [estateContract, setEstateContract] = useState(null)
    const [ownedLands, setOwnedLands] = useState([])
    const [signer, setSigner] = useState(null)
    const [approved, setApproved] = useState(false)
    const [refreshLands, setRefreshLands] = useState(true)

    useEffect(() => {
        if (window.ethereum && provider === null) {
            setProvider(new ethers.providers.Web3Provider(window.ethereum))
        }
    })

    useEffect(() => {
        if (window.ethereum && landContract !== null && address !== '') {
            landContract.isApprovedForAll(address, Addresses.ESTATE)
                .then(res => {
                    if (res) {
                        setApproved(true)
                    }
                })
        }
    }, [address, landContract])

    useEffect(() => {
        if (window.ethereum && address !== '' && provider !== null) {
            setSigner(provider.getSigner())
        }
    }, [provider, address])

    useEffect(() => {
        updateTotalLandOwned()
    }, [address, landContract, refreshLands])

    useEffect(() => {
        if (window.ethereum && address !== '') {
            setLandContract(new ethers.Contract(Addresses.LAND, landAbi, provider))
            setEstateContract(new ethers.Contract(Addresses.ESTATE, estateAbi, provider))
        }
    }, [address])

    function updateTotalLandOwned() {
        if (window.ethereum && address !== '' && landContract !== null) {
            landContract.balanceOf(address).then(res => {
                for (let i = 0; i < Number(res.toString()); i++) {
                    landContract.tokenOfOwnerByIndex(address, i).then(res => {
                        setOwnedLands(ownedLands => [...ownedLands, res.toString()])
                    })
                }
            })
        }
    }

    const isWalletConnected = () => {
        provider.listAccounts()
            .then(res => {
                if (res.length > 0) {
                    setAddress(res[0])
                }
            })
    }

    const [isOpen, setIsOpen] = useState(false);

    // Open Popup on Image Click
    const openModal = () => setIsOpen(true);

    // Close popup
    const closeModal = () => setIsOpen(false);

    return (
        <div className=''>
            <div className="container">
                <AppNav walletConnected={isWalletConnected}/>
                <div className="conversion__wrapper">
                    <h1 className='section-heading'>My assets</h1>
                    <div className="conversion">
                        <div className="conversion__notched-box">
                            <div className="conversion__notched-box__content">
                                <div className="conversion__image__wrapper">
                                    {
                                        ownedLands.sort().map(land => {
                                            return(<AssetDetails id={land}/>)
                                        })
                                    }
                                    <>
                                        <div className='conversion__image active' onClick={openModal}>
                                            <img src={cityViewImage} alt="conversion-image" width={400} height={400} />
                                        </div>
                                        <Modal
                                            isOpen={isOpen}
                                            onRequestClose={closeModal}
                                            style={styles}
                                        >
                                            <div className='asset__image__popup'>
                                                <MdOutlineClose 
                                                    size={20} 
                                                    className="close-button"
                                                    onClick={closeModal}
                                                />
                                                <div className='asset__image__popup__image'>
                                                    <img src={cityViewImage} alt="conversion-image" width={200} height={200} />
                                                </div>
                                                <div className='asset__image__popup__content'>
                                                    <h1>Demo Heading</h1>
                                                    <ul className='asset__feature__list'>
                                                        <li>Feature 1 : Hello</li>
                                                        <li>Feature 2 : No Of bedroom</li>
                                                        <li>Feature 3 : </li>
                                                        <li>Feature 4 :</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Modal>
                                    </>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const styles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        // marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 10,
        backgroundColor: "#161616",
        border: "none",
        borderRadius: "none",
       
    },
    overlay: {
        zIndex: 2,
        backgroundColor: "rgba(0, 0, 0, 0.9)"

    }
}

export default MyAssets
