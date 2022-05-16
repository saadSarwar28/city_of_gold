/* 
  Staking Page
*/


import React, {useEffect, useState} from 'react'
import Nav from '../../components/Nav/Nav';
import walletImage from "../../static/images/wallet.png"
import "./dashboard.css"
import StakeInfoItem from './StakeInfoItem';
import {ethers} from "ethers";
import Addresses from "../../constants/contractAddresses";
import landAbi from "../../abi/Land.json";
import estateAbi from "../../abi/Estate.json";
import stakerAbi from "../../abi/Staker.json";
import StakeTableRow from "./StakingTableRows";
import tokenTypes from "../../utils/tokenTypes";
import logoImage from "../../static/images/logo_without_name.png"

const Dashboard = () => {

    const [provider, setProvider] = useState(new ethers.providers.Web3Provider(window.ethereum))
    const [chainID, setChainId] = useState(0)
    const [address, setAddress] = useState('')
    const [stakingContract, setStakingContract] = useState(null)
    const [landContract, setLandContract] = useState(null)
    const [estateContract, setEstateContract] = useState(null)
    const [cogEarnedFromLand, setCogEarnedFromLand] = useState(0)
    const [cogEarnedFromEstate, setCogEarnedFromEstate] = useState(0)
    const [ownedLands, setOwnedLands] = useState([])
    const [stakedLands, setStakedLands] = useState([])
    const [ownedEstates, setOwnedEstates] = useState([])
    const [stakedEstates, setStakedEstates] = useState([])
    const [totalSupply, setTotalSupply] = useState(0)

    const [allNfts, setAllNfts] = useState([])

    useEffect(() => {
        ownedLands.forEach(land => {
            if (!allNfts.filter(nft => nft.id === land).length > 0) {
                setAllNfts(allNfts => [...allNfts, {
                    type: tokenTypes.LAND,
                    id: land,
                    stakedAt: 'NA',
                    cogEarned: 'NA',
                    isStaked: false
                }])
            }
        })
        stakedLands.forEach(land => {
            if (!allNfts.filter(nft => nft.id === land).length > 0) {
                setAllNfts(allNfts => [...allNfts, {
                    type: tokenTypes.LAND,
                    id: land,
                    stakedAt: '0',
                    cogEarned: '0',
                    isStaked: true
                }])
            }
        })
        ownedEstates.forEach(estate => {
            if (!allNfts.filter(nft => nft.id === estate).length > 0) {
                setAllNfts(allNfts => [...allNfts, {
                    type: tokenTypes.ESTATE,
                    id: estate,
                    stakedAt: 'NA',
                    cogEarned: 'NA',
                    isStaked: false
                }])
            }
        })
        stakedEstates.forEach(estate => {
            if (!allNfts.filter(nft => nft.id === estate).length > 0) {
                setAllNfts(allNfts => [...allNfts, {
                    type: tokenTypes.ESTATE,
                    id: estate,
                    stakedAt: '0',
                    cogEarned: '0',
                    isStaked: true
                }])
            }
        })
    }, [ownedLands, stakedLands, ownedEstates, stakedEstates])

    useEffect(() => {
        if (window.ethereum) {
            provider.send("eth_requestAccounts", []).then(res => {
                setAddress(res[0])
            })
        }
    }, [provider])

    useEffect(() => {
        if (window.ethereum) {
            provider.getNetwork().then(res => {
                setChainId(res.chainId)
            })
        }
    }, [provider])

    useEffect(() => {
        if (window.ethereum && address !== '') {
            setStakingContract(new ethers.Contract(Addresses.STAKER, stakerAbi, provider))
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

    function updateTotalLandStaked() {
        if (window.ethereum && address !== '' && landContract !== null) {
            stakingContract.returnAllLandsOfOwner(address).then(res => {
                res.forEach(id => {
                    setStakedLands(stakedLands => [...stakedLands, id.toString()])
                })
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

    function updateTotalEstatesStaked() {
        if (window.ethereum && address !== '' && stakingContract !== null) {
            stakingContract.returnAllEstatesOfOwner(address)
                .then(res => {
                    res.forEach(id => {
                        setStakedEstates(stakedEstates => [...stakedEstates, id.toString()])
                    })
                })
        }
    }

    function updateTotalEstatesEarning() {
        if (window.ethereum && address !== '' && stakingContract !== null) {
            stakingContract.calculateTotalCogEarning(false, {from: address})
                .then(res => {
                    setCogEarnedFromEstate(Number(ethers.utils.formatEther(res)).toFixed(2))
                })
        }
    }

    function updateTotalLandEarning() {
        if (window.ethereum && address !== '' && stakingContract !== null) {
            stakingContract.calculateTotalCogEarning(true, {from: address})
                .then(res => {
                    setCogEarnedFromLand(Number(ethers.utils.formatEther(res)).toFixed(2))
                })
        }
    }

    function updateTotalSupply() {
        if (window.ethereum && address !== '' && landContract !== null) {
            landContract.totalSupply()
                .then(res => {
                    setTotalSupply(res.toString())
                })
        }
    }

    useEffect(() => {
        updateTotalLandOwned()
    }, [address, landContract])

    useEffect(() => {
        updateTotalLandStaked()
    }, [address, stakingContract])

    useEffect(() => {
        updateTotalLandEarning()
    }, [address, stakingContract])

    useEffect(() => {
        updateTotalEstatesOwned()
    }, [address, estateContract])

    useEffect(() => {
        updateTotalEstatesStaked()
    }, [address, stakingContract])

    useEffect(() => {
        updateTotalEstatesEarning()
    }, [address])

    useEffect(() => {
        updateTotalSupply()
    }, [address, landContract])

    const isWalletConnected = () => {
        provider.listAccounts()
            .then(res => {
                if (res.length > 0) {
                    setAddress(res[0])
                }
            })
    }

    return (
        <div className='dashboard-page'>
            <div className="container">
                <Nav walletConnected={isWalletConnected}/>
                <div className="stakeinfo__list">
                    <StakeInfoItem
                        title="Lands Owned"
                        amount={(ownedLands.length + stakedLands.length).toString() + ' / ' + totalSupply}
                    />
                    <StakeInfoItem
                        title="Total LAND Earning"
                        amount={cogEarnedFromLand}
                    />
                    <StakeInfoItem
                        title="Lands Staked"
                        amount={stakedLands.length + ' / ' + (ownedLands.length + stakedLands.length).toString()}
                    />
                    <StakeInfoItem
                        title="Estates Owned"
                        amount={ownedEstates.length + stakedEstates.length}
                    />
                    <StakeInfoItem
                        title="Total ESTATE Earning"
                        amount={cogEarnedFromEstate}
                    />
                    <StakeInfoItem
                        title="Estates Staked"
                        amount={stakedEstates.length + ' / ' + (ownedEstates.length + stakedEstates.length).toString()}
                    />
                </div>
                <div className="staking__wrapper">
                    <div className="staking">
                        <div className="staking__notched-box">
                            <div className="staking__notched-box__content">
                                <div className="staking__table__wrapper">
                                    <div className="saking__table__logo">
                                        <img src={logoImage} alt=""  />
                                    </div>
                                    <table className="staking__table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    Token Type
                                                </th>
                                                <th>
                                                    Token ID
                                                </th>
                                                <th>
                                                    Staked at
                                                </th>
                                                <th>
                                                    Pending COG
                                                </th>
                                                <th>
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            allNfts.sort().map(nft => {
                                                return (
                                                    <StakeTableRow
                                                        key={nft.id}
                                                        type={nft.type}
                                                        id={nft.id}
                                                        _isStaked={nft.isStaked}
                                                    ></StakeTableRow>
                                                )
                                            })
                                        }
                                            <tr>
                                                <td className="" data-label='Token Type'>{"1"}</td>
                                                <td className="" data-label='Token ID'>{"1"}</td>
                                                <td className="" data-label='Staked at'>{"stakedAt"}</td>
                                                <td className="" data-label='Pending COG'>{"cogEarned"}</td>
                                                <td className="" data-label='Actions'>
                                                    
                                                    <div className='buttonGroup'>
                                                        <button type="button" className="claim-rewards-button" onClick={() => {}}>Claim COG
                                                        </button>
                                                        <button type="button" className="unstake-button" onClick={() => {}}>Unstake</button>
                                                    </div>
                                                    {/* <>
                                                        <button type="button" className="stake-button" onClick={approveToken}>Approve</button>
                                                        <button type="button" className="stake-button" onClick={stakeToken}
                                                            title="Needs approval first">Stake
                                                        </button>
                                                    </> */}
                                                
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="" data-label='Token Type'>{"1"}</td>
                                                <td className="" data-label='Token ID'>{"1"}</td>
                                                <td className="" data-label='Staked at'>{"stakedAt"}</td>
                                                <td className="" data-label='Pending COG'>{"cogEarned"}</td>
                                                <td className="" data-label='Actions'>
                                                    
                                                    <div className='buttonGroup'>
                                                        <button type="button" className="claim-rewards-button" onClick={() => {}}>Claim COG
                                                        </button>
                                                        <button type="button" className="unstake-button" onClick={() => {}}>Unstake</button>
                                                    </div>
                                                    {/* <>
                                                        <button type="button" className="stake-button" onClick={approveToken}>Approve</button>
                                                        <button type="button" className="stake-button" onClick={stakeToken}
                                                            title="Needs approval first">Stake
                                                        </button>
                                                    </> */}
                                                
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="" data-label='Token Type'>{"1"}</td>
                                                <td className="" data-label='Token ID'>{"1"}</td>
                                                <td className="" data-label='Staked at'>{"stakedAt"}</td>
                                                <td className="" data-label='Pending COG'>{"cogEarned"}</td>
                                                <td className="" data-label='Actions'>
                                                    
                                                    <div className='buttonGroup'>
                                                        <button type="button" className="claim-rewards-button" onClick={() => {}}>Claim COG
                                                        </button>
                                                        <button type="button" className="unstake-button" onClick={() => {}}>Unstake</button>
                                                    </div>
                                                    {/* <>
                                                        <button type="button" className="stake-button" onClick={approveToken}>Approve</button>
                                                        <button type="button" className="stake-button" onClick={stakeToken}
                                                            title="Needs approval first">Stake
                                                        </button>
                                                    </> */}
                                                
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="" data-label='Token Type'>{"1"}</td>
                                                <td className="" data-label='Token ID'>{"1"}</td>
                                                <td className="" data-label='Staked at'>{"stakedAt"}</td>
                                                <td className="" data-label='Pending COG'>{"cogEarned"}</td>
                                                <td className="" data-label='Actions'>
                                                    
                                                    <div className='buttonGroup'>
                                                        <button type="button" className="claim-rewards-button" onClick={() => {}}>Claim COG
                                                        </button>
                                                        <button type="button" className="unstake-button" onClick={() => {}}>Unstake</button>
                                                    </div>
                                                    {/* <>
                                                        <button type="button" className="stake-button" onClick={approveToken}>Approve</button>
                                                        <button type="button" className="stake-button" onClick={stakeToken}
                                                            title="Needs approval first">Stake
                                                        </button>
                                                    </> */}
                                                
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="" data-label='Token Type'>{"1"}</td>
                                                <td className="" data-label='Token ID'>{"1"}</td>
                                                <td className="" data-label='Staked at'>{"stakedAt"}</td>
                                                <td className="" data-label='Pending COG'>{"cogEarned"}</td>
                                                <td className="" data-label='Actions'>
                                                    
                                                    <div className='buttonGroup'>
                                                        <button type="button" className="claim-rewards-button" onClick={() => {}}>Claim COG
                                                        </button>
                                                        <button type="button" className="unstake-button" onClick={() => {}}>Unstake</button>
                                                    </div>
                                                    {/* <>
                                                        <button type="button" className="stake-button" onClick={approveToken}>Approve</button>
                                                        <button type="button" className="stake-button" onClick={stakeToken}
                                                            title="Needs approval first">Stake
                                                        </button>
                                                    </> */}
                                                
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="" data-label='Token Type'>{"1"}</td>
                                                <td className="" data-label='Token ID'>{"1"}</td>
                                                <td className="" data-label='Staked at'>{"stakedAt"}</td>
                                                <td className="" data-label='Pending COG'>{"cogEarned"}</td>
                                                <td className="" data-label='Actions'>
                                                    
                                                    <div className='buttonGroup'>
                                                        <button type="button" className="claim-rewards-button" onClick={() => {}}>Claim COG
                                                        </button>
                                                        <button type="button" className="unstake-button" onClick={() => {}}>Unstake</button>
                                                    </div>
                                                    {/* <>
                                                        <button type="button" className="stake-button" onClick={approveToken}>Approve</button>
                                                        <button type="button" className="stake-button" onClick={stakeToken}
                                                            title="Needs approval first">Stake
                                                        </button>
                                                    </> */}
                                                
                                                </td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
