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

    const maxMint = 9;
    const [address, setAddress] = useState('')
    const [alreadyMinted, setAlreadyMinted] = useState(0)
    const [price, setPrice] = useState(0)
    const [amount, setAmount] = useState(1)
    const [balance, setBalance] = useState(0)
    const [chainID, setChainId] = useState(0)

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
            const mintContract = new ethers.Contract(Addresses.LAND, landAbi, provider)
            const mintPrice = await mintContract.nftPrice()
            setPrice(Number(ethers.utils.formatEther(mintPrice)) * amount)
        }
    }

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
            const mintContract = new ethers.Contract(Addresses.LAND, landAbi, provider)
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
            if (chainID !== Network.chainId) {
                alert('Please switch to Rinkeby testnet in metamask.')
                return
            }
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner()
            const mintContract = new ethers.Contract(Addresses.LAND, landAbi, provider);
            if (price > balance) {
                alert('Not enough ETH in your wallet')
            } else {
                const contractWithSigner = mintContract.connect(signer)
                const options = {value: ethers.utils.parseEther(String(price.toFixed(2)))}
                const tx = await contractWithSigner.publicMint(amount, false, options)
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
            }
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner()
            // signer.getAddress().then(_address => {console.log(_address)})
            // signer.getBalance().then(res  => console.log(ethers.utils.formatEther(res)))
            const mintContract = new ethers.Contract(Addresses.LAND, landAbi, provider);
            if (price > balance) {
                alert('Not enough ETH in your wallet')
            } else {
                const contractWithSigner = mintContract.connect(signer)
                const options = {value: ethers.utils.parseEther(String(price.toFixed(2)))}
                const tx = await contractWithSigner.publicMint(amount, true, options)
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

                <div class="mint__wrapper">
                    {/* <!-- Logo --> */}
                    <div class="logo">
                        <img src={logoSrc} alt="logo"/>
                    </div>
                    <div class="mint__triangle mint__triangle--left"></div>
                    <div class="mint__triangle mint__triangle--right">
                        <div></div>
                    </div>
                    <div class="mint__box">
                        <div class="mint__box__content">
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