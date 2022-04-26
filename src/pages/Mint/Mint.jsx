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
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";

const Mint = () => {

    const [provider, setProvider] = useState(null)
    const [mintContract, setMintContract] = useState(null)
    const [signedContract, setSignedContract] = useState(null)
    const maxMint = 9;
    const [address, setAddress] = useState('')
    const [alreadyMinted, setAlreadyMinted] = useState(0)
    const [price, setPrice] = useState(0)
    const [amount, setAmount] = useState(1)
    const [balance, setBalance] = useState(0)
    const [chainID, setChainId] = useState(0)

    useEffect(() => {
        if (window.ethereum && provider != null) {
            provider.getSigner().getBalance().then(res => {
                setBalance(ethers.utils.formatEther(res))
            })
        }
    }, [provider])

    useEffect(() => {
        if (window.ethereum) {
            setProvider(new ethers.providers.Web3Provider(window.ethereum))
        }
    }, [window.ethereum])

    useEffect(() => {
        if (window.ethereum && address !== '' && mintContract != null) {
            setSignedContract(mintContract.connect(provider.getSigner()))
        }
    }, [address, mintContract, provider])

    useEffect(() => {
        if (window.ethereum && address !== '' && provider != null) {
            setMintContract(new ethers.Contract(Addresses.LAND, landAbi, provider))
        }
    }, [address, provider])

    const increaseAmount = () => {
        if (amount < maxMint) {
            setAmount(amount + 1)
        }
    }

    const decreaseAmount = () => {
        if (amount > 1) {
            setAmount(amount - 1)
        }
    }

    useEffect(() => {
        if (window.ethereum && provider != null) {
            provider.getNetwork().then(res => {
                setChainId(res.chainId)
            })
        }
    }, [provider])

    function updateMintPrice() {
        if (window.ethereum && mintContract != null) {
            mintContract.nftPrice()
                .then(res => {
                    setPrice(Number(ethers.utils.formatEther(res)) * amount)
                })
        }
    }

    useEffect(() => {
        updateMintPrice()
    }, [mintContract, amount])

    function updateTotalSupply() {
        if (window.ethereum && mintContract != null) {
            mintContract.totalSupply()
                .then(res => {
                    setAlreadyMinted(Number(res.toString()))
                })
        }
    }

    useEffect(() => {
        updateTotalSupply()
    }, [mintContract])


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
            if (chainID !== Network.chainId) {
                alert('Please switch to Rinkeby testnet in metamask.')
                return
            } else if (price > balance) {
                alert('Not enough ETH in your wallet')
            } else {
                const tx = await signedContract.publicMint(amount, false, {value: ethers.utils.parseEther(String(price.toFixed(2)))})
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
            if (chainID !== Network.chainId) {
                alert('Please switch to Rinkeby testnet in metamask.')
                return
            } else if (price > balance) {
                alert('Not enough ETH in your wallet')
            } else {
                const tx = await signedContract.publicMint(amount, true, {value: ethers.utils.parseEther(String(price.toFixed(2)))})
                await tx.wait()
                // console.log(tx)
                alert('Minted and staked Successfully!')
                updateTotalSupply()
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
                            <h2>LAND mint is live!</h2>
                            <div>
                                <span className='mint__box__content__already-minted'>ALREADY MINTED</span>
                                <h3 className='mint-box-already-minted'>{alreadyMinted} / 10,000</h3>
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <h3 className='mint-box-already-minted'>{price.toFixed(2)} ETH</h3>
                                <div className='mint__box__content__button-group flex-center'>
                                    <div className='number-field__buttons'>
                                        <div>
                                            <button onClick={decreaseAmount} className='button'>
                                                <AiOutlineMinus/>
                                            </button>
                                        </div>
                                        {amount}
                                        <div>
                                            <button onClick={increaseAmount} className='button'>
                                                <AiOutlinePlus/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
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