import React, {useEffect, useState} from 'react'
import "./mint.css"
import Footer from '../../components/Footer/Footer'
import logoSrc from "../../static/images/logo_without_name.png";
import StarsAnimtedBg from '../../components/Mint/StarsAnimtedBg';
import Nav from '../../components/Nav/Nav';
import {ethers} from "ethers";
import Addresses from "../../constants/contractAddresses";
import Network from "../../constants/networkDetails";
import landAbi from "../../abi/Land.json"
import whiteListedAddresses from "../../whitelist/whiteListedAddresses";
import {MerkleTree} from "merkletreejs";
import keccak256 from "keccak256";


const Mint = () => {

    const maxMint = 9;
    const [address, setAddress] = useState('')
    const [alreadyMinted, setAlreadyMinted] = useState(0)
    const [price, setPrice] = useState(0)
    const [balance, setBalance] = useState(0)
    const [chainID, setChainId] = useState(0)
    const [whitelistClaimed, setWhitelistClaimed] = useState(false)

    // to input in the contract
    // const getRootHash = () => {
    //     const leafNodes = whiteListedAddresses.map(addr => keccak256(addr))
    //     const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
    //     console.log(merkleTree.getHexRoot())
    // }

    const getMerkleProof = () => {
        const leafNodes = whiteListedAddresses.map(addr => keccak256(addr))
        const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
        return merkleTree.getHexProof(keccak256(address))
    }

    useEffect(() => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            provider.getNetwork().then(res => {
                setChainId(res.chainId)
            })
        }
    })

    async function updateMintPrice() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send("eth_requestAccounts", [])
            const mintContract = new ethers.Contract(Addresses.land, landAbi, provider)
            const mintPrice = await mintContract.whitelistPrice()
            setPrice(Number(ethers.utils.formatEther(mintPrice)))
        }
    }

    async function isAlreadyClaimed() {
        if (window.ethereum && address !== '') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send("eth_requestAccounts", [])
            const mintContract = new ethers.Contract(Addresses.land, landAbi, provider)
            const isClaimed = await mintContract.whitelistClaimed(address)
            setWhitelistClaimed(isClaimed)
        }
    }

    useEffect(() => {
        isAlreadyClaimed()
    }, [address])

    useEffect(() => {
        updateMintPrice()
    })

    async function updateTotalSupply() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send("eth_requestAccounts", [])
            const signer = provider.getSigner()
            signer.getBalance().then(res => {
                setBalance(ethers.utils.formatEther(res))
            })
            const mintContract = new ethers.Contract(Addresses.land, landAbi, provider)
            const totalSupply = await mintContract.totalSupply()
            setAlreadyMinted(Number(totalSupply.toString()))
        }
    }

    useEffect(() => {
        updateTotalSupply()
    })


    useEffect(() => {
        if (window.ethereum) {
            // @ts-ignore
            window.ethereum.request({method: 'eth_requestAccounts'})
                .then(result => {
                    // @ts-ignore
                    setAddress(String(result[0]))
                })
                .catch(error => {
                    console.log(error)
                });
        } else {
            alert('Please install metamask');
        }
    })

    const handleMint = async () => {
        if (window.ethereum && (address !== '')) {
            if (getMerkleProof().length < 1) {
                alert('Your address is not whitelisted.')
                return
            }
            if (whitelistClaimed) {
                alert('You have already claimed your nft.')
                return
            }
            if (chainID !== Network.chainId) {
                alert('Please switch to Rinkeby testnet in metamask.')
                return
            }
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner()
            const mintContract = new ethers.Contract(Addresses.land, landAbi, provider);
            if (price > balance) {
                alert('Not enough ETH in your wallet')
            } else {
                const contractWithSigner = mintContract.connect(signer)
                const options = {value: ethers.utils.parseEther(String(price.toFixed(2)))}
                const tx = await contractWithSigner.whitelistMint(getMerkleProof(), false, options)
                await tx.wait()
                // console.log(tx)
                alert('Minted Successfully')
            }
        } else {
            alert('Please connect Metamask first')
        }
    }

    const handleMintAndStake = async () => {
        if (window.ethereum && (address !== '')) {
            if (getMerkleProof().length < 1) {
                alert('Your address is not whitelisted.')
                return
            }
            if (whitelistClaimed) {
                alert('You have already claimed your nft.')
                return
            }
            if (chainID !== Network.chainId) {
                alert('Please switch to Rinkeby testnet in metamask.')
                return
            }
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner()
            // signer.getAddress().then(_address => {console.log(_address)})
            // signer.getBalance().then(res  => console.log(ethers.utils.formatEther(res)))
            const mintContract = new ethers.Contract(Addresses.land, landAbi, provider);
            if (price > balance) {
                alert('Not enough ETH in your wallet')
            } else {
                const contractWithSigner = mintContract.connect(signer)
                const options = {value: ethers.utils.parseEther(String(price.toFixed(2)))}
                const tx = await contractWithSigner.whitelistMint(getMerkleProof(), true, options)
                await tx.wait()
                // console.log(tx)
                alert('Minted and staked Successfully!')
            }
        } else {
            alert('Please connect Metamask first')
        }
    }

    return (
        <div className="mint">
            {/* Stars */}
            <StarsAnimtedBg/>

            <div className='container'>
                <Nav/>

                <div className="mint__wrapper">
                    {/* <!-- Logo --> */}
                    <div className="logo">
                        <img src={logoSrc} alt="logo"/>
                    </div>
                    <div className="mint__triangle mint__triangle--left"></div>
                    <div className="mint__triangle mint__triangle--right">
                        <div></div>
                    </div>
                    <div className="mint__box">
                        <div className="mint__box__content">
                            <h2>Whitelist LAND mint is live!</h2>
                            <div>
                                <span className='mint__box__content__already-minted'>ALREADY MINTED</span>
                                <h3 className='mint-box-already-minted'>{alreadyMinted} / 10,000</h3>
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <h3 className='mint-box-already-minted'>{price.toFixed(2)} ETH</h3>
                                {/*<div className='mint__box__content__button-group flex-center'>*/}
                                {/*    <div className='number-field__buttons'>*/}
                                {/*        <div>*/}
                                {/*            <button onClick={decreaseAmount} className='button'>*/}
                                {/*                <AiOutlineMinus/>*/}
                                {/*            </button>*/}
                                {/*        </div>*/}
                                {/*        {amount}*/}
                                {/*        <div>*/}
                                {/*            <button onClick={increaseAmount} className='button'>*/}
                                {/*                <AiOutlinePlus/>*/}
                                {/*            </button>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className='mint__box__content__button-group'>
                                    <button className="button-hexagon" onClick={handleMint}>Mint</button>
                                    <button className="button-hexagon gradient" onClick={handleMintAndStake}>Mint and
                                        Stake
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Mint