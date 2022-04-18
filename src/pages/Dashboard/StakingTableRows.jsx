/*
  This component use in Staking page
*/

import React, {useEffect, useState} from 'react'
import Addresses from "../../constants/contractAddresses";
import {ethers} from "ethers";
import stakerAbi from "../../abi/Staker.json";
import landAbi from "../../abi/Land.json";
import estateAbi from "../../abi/Estate.json";

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
        if (type === "LAND") {
            const trx = await stakingContractSigned.stakeLand([id])
            await trx.wait()
        } else {
            const trx = await stakingContractSigned.stakeEstate([id])
            await trx.wait()
        }
        setIsStaked(!isStaked)
        setCogEarned('00')
        setStakedAt(new Date().toLocaleDateString("en-US"))
    }

    async function approveToken() {
        if (type === 'LAND') {
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
        if (type === 'LAND') {
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
        setCogEarned(0)
        setStakedAt(0)
    }

    async function claimRewards() {
        const stakingContractSigned = stakingContract.connect(signer)
        if (type === "LAND") {
            const trx = stakingContractSigned.claimLandRewards([id])
            await trx.wait();
        } else {
            const trx = stakingContractSigned.claimEstateRewards([id])
            await trx.wait();
        }
        alert('Rewards claimed successfully!')
        setCogEarned(0)
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
                            <button type="button" className="claim-rewards-button" onClick={claimRewards}>Claim COG</button>
                            <button type="button" className="unstake-button" onClick={unstakeToken}>Unstake</button>
                        </>
                        : <>
                            <button type="button" className="stake-button" onClick={approveToken}>Approve</button>
                            <button type="button" className="stake-button" onClick={stakeToken} title="Needs approval first">Stake</button>
                        </>
                }
            </td>
        </tr>
    )
}

export default StakeTableRow