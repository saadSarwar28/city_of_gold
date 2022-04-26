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

const Conversion = () => {
    const [provider, setProvider] = useState(new ethers.providers.Web3Provider(window.ethereum))
    const [chainID, setChainId] = useState(0)
    const [address, setAddress] = useState('')
    const [landContract, setLandContract] = useState(null)
    const [estateContract, setEstateContract] = useState(null)
    const [ownedLands, setOwnedLands] = useState([])
    const [selectedLands, setSelectedLands] = useState([])
    const [signer, setSigner] = useState(null)
    const [approved, setApproved] = useState(false)
    const [refreshLands, setRefreshLands] = useState(true)

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
        if (window.ethereum && address !== '') {
            setSigner(provider.getSigner())
        }
    }, [provider, address])

    useEffect(() => {
        updateTotalLandOwned()
    }, [address, landContract, refreshLands])

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
            alert('Already approved!')
            return
        }
        if (!(selectedLands.length === 3)) {
            alert('Please select at least and not more than 3 LAND tokens.')
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
            alert('ESTATE can only be minted by three consecutive lands.')
            return
        }
        if (window.ethereum && address !== '') {
            const landContractSigned = landContract.connect(signer)
            const tx = await landContractSigned.setApprovalForAll(Addresses.ESTATE, true)
            await tx.wait()
            setApproved(true)
            alert('Land approved')
        }
    }

    async function convertToEstate() {
        if (!approved) {
            alert('Conversion requires approval first!')
        }
        if (!(selectedLands.length === 3)) {
            alert('Please select at least and not more than 3 LAND tokens.')
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
            alert('ESTATE can only be minted by three consecutive lands.')
            return
        }
        if (window.ethereum && address !== '') {
            const estateContractSigned = estateContract.connect(signer)
            const tx = await estateContractSigned.mint(selectedLands.sort(), false)
            await tx.wait()
            alert('ESTATE minted successfully')
            setOwnedLands(ownedLands => [])
            setRefreshLands(!refreshLands)
            setApproved(false)
        }
    }

    async function convertToEstateAndStake() {
        if (!approved) {
            alert('Conversion requires approval first!')
        }
        if (!(selectedLands.length === 3)) {
            alert('Please select at least and not more than 3 LAND tokens.')
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
            alert('ESTATE can only be minted by three consecutive lands.')
            return
        }
        if (window.ethereum && address !== '') {
            const estateContractSigned = estateContract.connect(signer)
            const tx = await estateContractSigned.mint(selectedLands.sort(), true)
            await tx.wait()
            alert('ESTATE minted successfully')
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

    return (
        <div className=''>
            <div className="container">
                <Nav/>
                <div className="conversion__wrapper">
                    <h1 className='section-heading'>Mint ESTATES</h1>
                    <div className="conversion">
                        <div className="conversion__notched-box">
                            <div className="conversion__notched-box__content">
                                <table className="conversion__notched-box__table">
                                    <thead>
                                    <tr>
                                        <th>
                                            Select
                                        </th>
                                        <th>
                                            Token ID
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        ownedLands.sort().map(land => {
                                            return (
                                                <tr key={land}>
                                                    <td className="conversion__notched-box__table_body">
                                                        <input type="checkbox" onChange={() => selectLand(land)}/>
                                                    </td>
                                                    <td className="conversion__notched-box__table_body">{land}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        marginBottom: '2rem',
                        width: '60%'
                    }}>
                        <button type="button" className="conversion__bottom_buttons" onClick={approveAll}>Approve</button>
                        <button type="button" className="conversion__bottom_buttons" onClick={convertToEstate}>Convert to ESTATE</button>
                        <button type="button" className="conversion__bottom_buttons" onClick={convertToEstateAndStake}>Convert to ESTATE and stake
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Conversion