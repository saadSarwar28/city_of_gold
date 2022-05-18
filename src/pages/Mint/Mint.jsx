import React, {useEffect, useState} from 'react'
import "./mint.css"
import Footer from '../../components/Footer/Footer'
import logoSrc from "../../static/images/logo_without_name.png";
import Nav from '../../components/Nav/Nav';
import {errors, ethers} from "ethers";
import Addresses from "../../constants/contractAddresses";
import Network from "../../constants/networkDetails";
import landAbi from "../../abi/Land.json"
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import StarsAnimtedBg from '../../components/AnimatedStarsBg/StarsAnimtedBg';
import { toast } from 'react-toastify';
import { showSuccessToast, showWarningToast } from '../../utils/utilityFunctions';
import errorsMessage from '../../constants/errorMessages';
import successMessages from '../../constants/successMessages';
import estateAbi from "../../abi/Estate.json";
import AppNav from '../../components/Nav/AppNav';

const Mint = () => {

    const maxMint = 9;
    const [address, setAddress] = useState('')
    const [alreadyMinted, setAlreadyMinted] = useState(0)
    const [price, setPrice] = useState(0)
    const [amount, setAmount] = useState(1)
    const [chainID, setChainId] = useState(0)
    const [provider, setProvider] = useState(null)
    const [signer, setSigner] = useState(null)
    const [landContract, setLandContract] = useState(null)

    useEffect(() => {
        if (window.ethereum && provider === null) {
            setProvider(new ethers.providers.Web3Provider(window.ethereum))
        }
    })

    const initializeLandContract = () => {
        if (window.ethereum && address !== '' && provider !== null) {
            setLandContract(new ethers.Contract(Addresses.LAND, landAbi, provider))
        }
    }

    useEffect(() => {
        initializeLandContract()
    }, [address])

    useEffect(() => {
        if (window.ethereum && address !== '' && provider !== null) {
            setSigner(provider.getSigner())
        }
    }, [provider, address])

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
        if (window.ethereum && provider !== null) {
            provider.getNetwork().then(res => {
                setChainId(res.chainId)
            })
        }
    }, [provider])

    async function updateMintPrice() {
        if (window.ethereum && landContract !== null) {
            const mintPrice = await landContract.nftPrice()
            setPrice(Number(ethers.utils.formatEther(mintPrice)) * amount)
        }
    }

    useEffect(() => {
        updateMintPrice()
    }, [address, landContract, amount])

    async function updateTotalSupply() {
        if (window.ethereum && landContract !== null) {
            const totalSupply = await landContract.totalSupply()
            setAlreadyMinted(Number(totalSupply.toString()))
        }
    }

    useEffect(() => {
        updateTotalSupply()
    }, [address, landContract])


    useEffect(() => {
        if (window.ethereum && provider !== null) {
            provider.listAccounts()
                .then(res => {
                    if (res.length > 0) {
                        setAddress(res[0])
                    }
                })

        } else {
            // showWarningToast(errorsMessage.INSTALL_METAMASK);
        }
    })

    const handleMint = async () => {
        if (window.ethereum && (address !== '')) {
            if (chainID !== Network.chainId) {
                showWarningToast(errorsMessage.SWITCH_TO_RINKEBY_TESTNET);
                // alert('Please switch to Rinkeby testnet in metamask.')
                return
            }
            let balance;
            signer.getBalance()
                .then(res => {
                    balance = Number(ethers.utils.formatEther(res))
                })
            if (price > balance) {
                showWarningToast(errorsMessage.NOT_ENOUGH_ETH);
                // alert('Not enough ETH in your wallet')
            } else {
                const contractWithSigner = landContract.connect(signer)
                const options = {value: ethers.utils.parseEther(String(price.toFixed(2)))}
                const tx = await contractWithSigner.publicMint(amount, false, options)
                await tx.wait()
                // console.log(tx)
                showSuccessToast(successMessages.MINTED_SUCCESSFULLY);
                // alert('Minted Successfully')
            }
        } else {
            showWarningToast(errorsMessage.CONNECT_METAMASK_FIRST);
            // alert('Please connect Metamask first')
        }
    }

    const handleMintAndStake = async () => {
        if (window.ethereum && (address !== '')) {
            if (chainID !== Network.chainId) {
                showWarningToast(errorsMessage.SWITCH_TO_RINKEBY_TESTNET);
                // alert('Please switch to Rinkeby testnet in metamask.')
                return
            }
            let balance;
            signer.getBalance()
                .then(res => {
                    balance = Number(ethers.utils.formatEther(res))
                })
            if (price > balance) {
                showWarningToast(errorsMessage.NOT_ENOUGH_ETH);
                // alert('Not enough ETH in your wallet')
            } else {
                const contractWithSigner = landContract.connect(signer)
                const options = {value: ethers.utils.parseEther(String(price.toFixed(2)))}
                const tx = await contractWithSigner.publicMint(amount, true, options)
                await tx.wait()
                // console.log(tx)
                showSuccessToast(successMessages.MINTED_AND_STAKED_SUCCESSFULLY);
                // alert('Minted and staked Successfully!')
            }
        } else {
            showWarningToast(errorsMessage.CONNECT_METAMASK_FIRST);
            // alert('Please connect Metamask first')
        }
    }

    const isWalletConnected = () => {
        if (provider !== null) {
            provider.listAccounts()
                .then(res => {
                    if (res.length > 0) {
                        setAddress(res[0])
                    }
                })
        }
    }

    return (
        <div className="mint">
            {/* Stars */}
            <StarsAnimtedBg />

            <div className='container'>
                <AppNav walletConnected={isWalletConnected}/>
                {/* <Link to={routeUrl.home}>
                    Home
                </Link> */}

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
                                <h3 className='text-center'>{alreadyMinted} / 10,000</h3>
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <h3 className='text-center'>{price.toFixed(2)} ETH</h3>
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
