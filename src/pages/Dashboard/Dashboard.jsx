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


const Dashboard = () => {

    const [provider, setProvider] = useState(new ethers.providers.Web3Provider(window.ethereum))
    const [chainID, setChainId] = useState(0)
    const [address, setAddress] = useState('')
    const [stakingContract, setStakingContract] = useState(null)
    const [landContract, setLandContract] = useState(null)
    const [estateContract, setEstateContract] = useState(null)
    // const [totalLandsOwned, setTotalLandsOwned] = useState(0)
    // const [totalLandsStaked, setTotalLandsStaked] = useState(0)
    // const [totalEstatesOwned, setTotalEstatesOwned] = useState(0)
    // const [totalEstatesStaked, setTotalEstatesStaked] = useState(0)
    const [cogEarnedFromLand, setCogEarnedFromLand] = useState(0)
    const [cogEarnedFromEstate, setCogEarnedFromEstate] = useState(0)
    const [ownedLands, setOwnedLands] = useState([])
    const [stakedLands, setStakedLands] = useState([])
    const [ownedEstates, setOwnedEstates] = useState([])
    const [stakedEstates, setStakedEstates] = useState([])

    const [allNfts, setAllNfts] = useState([])

    useEffect(() => {
        ownedLands.forEach(land => {
            if (!allNfts.filter(nft => nft.id === land).length > 0) {
                setAllNfts(allNfts => [...allNfts, {type: 'LAND', id: land, stakedAt: 'NA', cogEarned: 'NA', isStaked: false}])
            }
        })
        stakedLands.forEach(land => {
            if (!allNfts.filter(nft => nft.id === land).length > 0) {
                setAllNfts(allNfts => [...allNfts, {type: 'LAND', id: land, stakedAt: '1234', cogEarned: '123', isStaked: true}])
            }
        })
        ownedEstates.forEach(estate => {
            if (!allNfts.filter(nft => nft.id === estate).length > 0) {
                setAllNfts(allNfts => [...allNfts, {type: 'ESTATE', id: estate, stakedAt: 'NA', cogEarned: 'NA', isStaked: false}])
            }
        })
        stakedEstates.forEach(estate => {
            if (!allNfts.filter(nft => nft.id === estate).length > 0) {
                setAllNfts(allNfts => [...allNfts, {type: 'ESTATE', id: estate, stakedAt: '1234', cogEarned: '123', isStaked: true}])
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
            setStakingContract(new ethers.Contract(Addresses.staker, stakerAbi, provider))
            setLandContract(new ethers.Contract(Addresses.land, landAbi, provider))
            setEstateContract(new ethers.Contract(Addresses.estate, estateAbi, provider))
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
        if (window.ethereum && address !== '' && landContract!== null) {
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

    useEffect(() => {
        updateTotalLandOwned()
    }, [address, landContract])

    useEffect(() => {
        updateTotalLandStaked()
    }, [address, stakingContract])

    useEffect(() => {
        updateTotalEstatesOwned()
    }, [address, estateContract])

    useEffect(() => {
        updateTotalEstatesStaked()
    }, [address, stakingContract])

    return (
        <div className='dashboard-page'>
            <div className="container">
                <Nav/>
                <div className="stakeinfo__list">
                    <StakeInfoItem
                        title="Lands Owned"
                        amount={(ownedLands.length + stakedLands.length).toString() + '/10,000'}
                    />
                    <StakeInfoItem
                        title="Total LAND Earning"
                        amount={cogEarnedFromLand}
                    />
                    <StakeInfoItem
                        title="Lands Staked"
                        amount={stakedLands.length + '/' + ownedLands.length}
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
                        amount={stakedEstates.length + '/' + ownedEstates.length}
                    />
                </div>
                <div className="staking__wrapper">
                    <div className="staking">
                        <div className="staking__notched-box">
                            <div className="staking__notched-box__content">
                                <table className="staking__notched-box__table">
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
                                        allNfts.map(nft => {
                                            return (
                                                <StakeTableRow key={nft.id} type={nft.type} id={nft.id} _isStaked={nft.isStaked}></StakeTableRow>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;