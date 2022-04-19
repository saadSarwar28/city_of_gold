/*
  This component use in Staking page
*/

import React, {useEffect, useState} from 'react'
import Addresses from "../../constants/contractAddresses";
import {ethers} from "ethers";
import stakerAbi from "../../abi/Staker.json";
import landAbi from "../../abi/Land.json";
import estateAbi from "../../abi/Estate.json";
import tokenTypes from "../../utils/tokenTypes";

const StakeTableRow = ({type, id, _isStaked}) => {

    const [provider, setProvider] = useState(new ethers.providers.Web3Provider(window.ethereum))
    const [signer, setSigner] = useState(null)
    const [chainID, setChainId] = useState(0)
    const [address, setAddress] = useState('')
    const [stakingContract, setStakingContract] = useState(null)
    const [landContract, setLandContract] = useState(null)
    const [estateContract, setEstateContract] = useState(null)
    const [approved, setApproved] = useState(false)
    const [isStaked, setIsStaked] = useState(_isStaked)
    const [stakedAt, setStakedAt] = useState(0)
    const [cogEarned, setCogEarned] = useState(0)

    useEffect(() => {
        if (window.ethereum && landContract !== null) {
            if (!isStaked) {
                landContract.getApproved(id)
                    .then(res => {
                        if (res === Addresses.staker) {
                            setApproved(true)
                        }
                    })
            }
        }
    }, [address, landContract])

    useEffect(() => {
        if (window.ethereum && address !== '') {
            if (isStaked) {
                if (type === tokenTypes.LAND) {
                    stakingContract.stakedLands(id)
                        .then(res => {
                            setStakedAt(new Date(res.stakedAt.toString() * 1000).toLocaleDateString())
                        })
                } else {
                    stakingContract.stakedEstates(id)
                        .then(res => {
                            setStakedAt(new Date(res.stakedAt.toString() * 1000).toLocaleDateString())
                        })
                }
            }
        }
    }, [stakingContract])

    useEffect(() => {
        if (window.ethereum && address !== '') {
            if (isStaked) {
                if (type === tokenTypes.LAND) {
                    const options = {from: address}
                    stakingContract.calculateTokenDistributionForLand(id, options)
                        .then(res => {
                            setCogEarned(Number(ethers.utils.formatEther(res)).toFixed(2))
                        })
                } else {
                    const options = {from: address}
                    stakingContract.calculateTokenDistributionForEstate(id, options)
                        .then(res => {
                            setCogEarned(Number(ethers.utils.formatEther(res)).toFixed(2))
                        })
                }
            }
        }
    }, [stakedAt])



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

    useEffect(() => {
        if (window.ethereum && address !== '') {
            setSigner(provider.getSigner())
        }
    }, [provider, address])

    async function stakeToken() {
        if (!approved) {
            alert('Staking needs approval first.')
            return
        }
        const stakingContractSigned = stakingContract.connect(signer)
        if (type === tokenTypes.LAND) {
            const trx = await stakingContractSigned.stakeLand([id])
            await trx.wait()
        } else {
            const trx = await stakingContractSigned.stakeEstate([id])
            await trx.wait()
        }
        setIsStaked(!isStaked)
        setCogEarned(0.00)
        setStakedAt(new Date().toLocaleDateString("en-US"))
    }

    async function approveToken() {
        if (approved) {
            alert('Token already approved! Please click on Stake to stake the token.')
            return
        }
        if (type === tokenTypes.LAND) {
            if (window.ethereum && address !== '') {
                const landContractWithSigner = landContract.connect(signer)
                const trx = await landContractWithSigner.approve(Addresses.staker, id)
                await trx.wait();
            }
        } else {
            const estateContractWithSigner = estateContract.connect(signer)
            const trx = await estateContractWithSigner.approve(Addresses.staker, id)
            await trx.wait();
        }
        setApproved(true)
    }

    async function unstakeToken() {
        const stakingContractSigned = stakingContract.connect(signer)
        if (type === tokenTypes.LAND) {
            if (window.ethereum && address !== '') {
                const trx = await stakingContractSigned.unStakeLand([id])
                await trx.wait();
                alert('LAND unstaked!')
            }
        } else {
            const trx = await stakingContractSigned.unStakeEstate([id])
            await trx.wait();
            alert('ESTATE unstaked!')
        }
        setIsStaked(!isStaked)
        setCogEarned(0.00)
        setStakedAt(0)
    }

    async function claimRewards() {
        const stakingContractSigned = stakingContract.connect(signer)
        if (type === "LAND") {
            const trx = await stakingContractSigned.claimLandRewards([id])
            await trx.wait();
        } else {
            const trx = await stakingContractSigned.claimEstateRewards([id])
            await trx.wait();
        }
        alert('Rewards claimed successfully!')
        setCogEarned(0.00)
    }

    return (
        <tr>
            <td className="staking__notched-box__table_body">{type}</td>
            <td className="staking__notched-box__table_body">{id}</td>
            <td className="staking__notched-box__table_body">{stakedAt}</td>
            <td className="staking__notched-box__table_body">{cogEarned}</td>
            <td className="staking__notched-box__table_body_last_row">
                {
                    isStaked ?
                        <>
                            <button type="button" className="claim-rewards-button" onClick={claimRewards}>Claim COG
                            </button>
                            <button type="button" className="unstake-button" onClick={unstakeToken}>Unstake</button>
                        </>
                        : <>
                            <button type="button" className="stake-button" onClick={approveToken}>Approve</button>
                            <button type="button" className="stake-button" onClick={stakeToken}
                                    title="Needs approval first">Stake
                            </button>
                        </>
                }
            </td>
        </tr>
    )
}

export default StakeTableRow