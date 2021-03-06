/*
  Conversion Page
*/

import React, {useEffect, useState} from 'react'
import Nav from '../../components/Nav/Nav'
import "./conversion.css"
import {ethers} from "ethers";
import Addresses from "../../constants/contractAddresses";
import landAbi from "../../abi/Land.json";
import estateAbi from "../../abi/Estate.json";
import {showSuccessToast, showWarningToast} from '../../utils/utilityFunctions';
import errorMessages from '../../constants/errorMessages';
import successMessages from '../../constants/successMessages';
import AppNav from '../../components/Nav/AppNav';
import logoSrc from "../../static/images/logo_without_name.png";
import ConversionImage from '../../components/Conversion/ConversionImage';
import  customImageSrc  from "../../static/images/city-sea-view.jpeg"
import customImageSrc2 from "../../static/images/team-member-2.jpeg"

const Conversion = () => {
    const [provider, setProvider] = useState(null)
    const [address, setAddress] = useState('')
    const [landContract, setLandContract] = useState(null)
    const [estateContract, setEstateContract] = useState(null)
    const [ownedLands, setOwnedLands] = useState([])
    const [selectedLands, setSelectedLands] = useState([])
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

    async function approveAll() {
        if (approved) {
            showWarningToast(errorMessages.ALREADY_APPROVED)
            return
        }
        if (!(selectedLands.length === 3)) {
            showWarningToast(errorMessages.SELECT_AT_LEAST_NOT_MORE_THAN_THREE_LAND_TOKENS);
            return
        }
        const landsSorted = selectedLands.sort()
        let areConsecutive = true;
        for (let index = 0; index < (landsSorted.length - 1); index++) {
            if (Number(landsSorted[index]) + 1 !== Number(landsSorted[index + 1])) {
                areConsecutive = false
            }
        }
        if (!areConsecutive) {
            showWarningToast(errorMessages.ESTATE_CAN_MINTED_BY_THREE_CONSECUTIVE_LANDS)
            return
        }
        if (window.ethereum && address !== '') {
            const landContractSigned = landContract.connect(signer)
            const tx = await landContractSigned.setApprovalForAll(Addresses.ESTATE, true)
            await tx.wait()
            setApproved(true)
            showSuccessToast(successMessages.LAND_APPROVED)
        }
    }

    async function convertToEstate() {
        if (!approved) {
            showWarningToast(errorMessages.CONVERSION_REQUIRE_APPROVAL_FIRST)
            // alert('Conversion requires approval first!')
        }
        if (!(selectedLands.length === 3)) {
            showWarningToast(errorMessages.SELECT_AT_LEAST_NOT_MORE_THAN_THREE_LAND_TOKENS)
            // alert('Please select at least and not more than 3 LAND tokens.')
            return
        }
        const landsSorted = selectedLands.sort()
        let areConsecutive = true;
        for (let index = 0; index < (landsSorted.length - 1); index++) {
            if (Number(landsSorted[index]) + 1 !== Number(landsSorted[index + 1])) {
                areConsecutive = false
            }
        }
        if (!areConsecutive) {
            showWarningToast(errorMessages.ESTATE_CAN_MINTED_BY_THREE_CONSECUTIVE_LANDS)
            // alert('ESTATE can only be minted by three consecutive lands.')
            return
        }
        if (window.ethereum && address !== '') {
            const estateContractSigned = estateContract.connect(signer)
            const tx = await estateContractSigned.mint(selectedLands.sort(), false)
            await tx.wait()
            showSuccessToast(successMessages.MINTED_SUCCESSFULLY)
            setOwnedLands(ownedLands => [])
            setRefreshLands(!refreshLands)
            setApproved(false)
        }
    }

    async function convertToEstateAndStake() {
        if (!approved) {
            showWarningToast(errorMessages.CONVERSION_REQUIRE_APPROVAL_FIRST)
        }
        if (!(selectedLands.length === 3)) {
            showWarningToast(errorMessages.selectedLands);
            return
        }
        const landsSorted = selectedLands.sort()
        let areConsecutive = true;
        for (let index = 0; index < (landsSorted.length - 1); index++) {
            if (Number(landsSorted[index]) + 1 !== Number(landsSorted[index + 1])) {
                areConsecutive = false
            }
        }
        if (!areConsecutive) {
            showWarningToast(errorMessages.ESTATE_CAN_MINTED_BY_THREE_CONSECUTIVE_LANDS)
            return
        }
        if (window.ethereum && address !== '') {
            const estateContractSigned = estateContract.connect(signer)
            const tx = await estateContractSigned.mint(selectedLands.sort(), true)
            await tx.wait()
            showSuccessToast(successMessages.ESTATE_MINTED_SUCCESSFULLY);
            setOwnedLands(ownedLands => [])
            setRefreshLands(!refreshLands)
            setApproved(false)
        }
    }

    function selectLand(id) {
        if (selectedLands.filter(land => land === id).length > 0) {
            setSelectedLands(selectedLands.filter(land => land !== id))
        } else {
            setSelectedLands(selectedLands => [...selectedLands, id])
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

    // Select Handler for Image when click on Image this function calls
    const isSelectHandler = (setIsSelected) => {
        setIsSelected(prev => !prev);
    }

    return (
        <div className=''>
            <div className="container">
                <AppNav walletConnected={isWalletConnected}/>
                <div className="conversion__wrapper">
                    <h1 className='section-heading'>Mint ESTATES</h1>
                    <div className="conversion">
                        <div className="conversion__notched-box">
                            <div className="conversion__notched-box__content">
                                {
                                    ownedLands.length > 0 ?
                                        <>
                                            <div className="conversion__image__wrapper">
                                                {
                                                    ownedLands.sort().map(land => {
                                                        return(<ConversionImage id={land} imgSrc={logoSrc} isSelectHandler={isSelectHandler} selectedId={selectLand}/>)
                                                    })
                                                }
                                                
                                            </div>
                                        </> : <h3 style={{color: 'white', alignSelf: 'center'}}>Looks like you haven't purchased any LAND yet.</h3>
                                        
                                }
                            </div>
                        </div>
                        <div className='conversion__button__group'>
                            <div className="discord-button">
                                <button type="button" className="conversion__bottom_buttons"
                                        onClick={approveAll}>Approve
                                </button>
                            </div>
                            <div className="discord-button">
                                <button type="button" className="conversion__bottom_buttons"
                                        onClick={convertToEstate}>Convert to ESTATE
                                </button>
                            </div>
                            <div className="discord-button">
                                <button type="button" className="conversion__bottom_buttons"
                                        onClick={convertToEstateAndStake}>Convert to ESTATE and Stake
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Conversion
