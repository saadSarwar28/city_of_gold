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
import AssetDetailModal from '../../components/MyAssets/AssetDetailModal';
import tokenTypes from "../../utils/tokenTypes";

const MyAssets = () => {
    const [provider, setProvider] = useState(null)
    const [address, setAddress] = useState('')
    const [landContract, setLandContract] = useState(null)
    const [estateContract, setEstateContract] = useState(null)
    const [ownedLands, setOwnedLands] = useState([])
    const [ownedEstates, setOwnedEstates] = useState([])
    const [signer, setSigner] = useState(null)
    const [approved, setApproved] = useState(false)
    const [refreshLands, setRefreshLands] = useState(true)

    const [allNfts, setAllNfts] = useState([])

    useEffect(() => {
        ownedLands.forEach(land => {
            if (!allNfts.filter(nft => nft.id === land).length > 0) {
                setAllNfts(allNfts => [...allNfts, {
                    type: tokenTypes.LAND,
                    id: land,
                }])
            }
        })
        ownedEstates.forEach(estate => {
            if (!allNfts.filter(nft => nft.id === estate).length > 0) {
                setAllNfts(allNfts => [...allNfts, {
                    type: tokenTypes.ESTATE,
                    id: estate,
                }])
            }
        })
    }, [ownedLands, ownedEstates])

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
        updateTotalEstatesOwned()
    }, [address, estateContract])

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

    function updateTotalEstatesOwned() {
        if (window.ethereum && address !== '' && estateContract !== null) {
            estateContract.balanceOf(address).then(balance => {
                for (let i = 0; i < Number(balance.toString()); i++) {
                    estateContract.tokenOfOwnerByIndex(address, i).then(res => {
                        setOwnedEstates(ownedEstates => [...ownedEstates, res.toString()])
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
                                        allNfts.sort().map(token => {
                                            return(<AssetDetails id={token.id} tokenType={token.type} address={address}/>)
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default MyAssets
