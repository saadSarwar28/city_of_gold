import React, { useRef, useState } from 'react'

const MainPage = () => {

  
  const [balanceAmount, setBalanceAmount] = useState(0);
  
  const increaseBalanceAmount = () => {
    setBalanceAmount((prev) => prev + 1);
  }
  
  const decreaseBalanceAmount = () => {
    setBalanceAmount((prev) => prev - 1);
  }
  const mobileNavRef = useRef();
  
  const openNavMenu = () => {
    mobileNavRef.current.style.display = "flex"
  }

  const closeNavMenu = () => {
    mobileNavRef.current.style.display = "none";
  }

  let countDownDate = new Date("April 1, 2022 00:00:00").getTime();
  const daysSpan = document.getElementById("days");
  const hoursSpan = document.getElementById("hours");
  const minutesSpan = document.getElementById("minutes");
  const secondsSpan = document.getElementById("seconds");

  // Update the count down every 1 second
  let x = setInterval(function () {
    // Get today's date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysSpan.innerText = days;
    hoursSpan.innerText = hours;
    minutesSpan.innerText = minutes;
    secondsSpan.innerText = seconds;

    // Display the result in the element with id="demo"
    // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    //   + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);

  return (
    <div className="main-layout">

      {/* Main section */}
      <div className="main-wrapper">
        <div className="main">
          <div className="container">
            <div className="main-content">
              <nav>
                <div className="logo">
                  <img
                    src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622c01e16fc5bb0fea50a60f.png"
                    alt="" />
                </div>
                <ul className="nav-links">
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#overview">Overview</a>
                  </li>
                  <li>
                    <a href="#roadmap">Roadmap</a>
                  </li>
                  <li>
                    <a href="#team">The Team</a>
                  </li>

                </ul>
                <a className="nav-button" href="https://discord.gg/cityofgold" target="_blank">Discord</a>
                <div className="menu-button" onClick={openNavMenu}>
                  <i className="fas fa-bars"></i>
                </div>
              </nav>
              <div className="main-content-inner">
                <h1>COUNTDOWN BEFORE LAUNCH</h1>
                <div className="countdown-wrapper">
                  <div className="countdown-box-wrapper">
                    <div className="countdown-box">
                      <span id="days"></span>
                    </div>
                    <span className="countdown-box-label">Days</span>
                  </div>
                  <div className="countdown-box-wrapper">
                    <div className="countdown-box">
                      <span id="hours"></span>
                    </div>
                    <span className="countdown-box-label">Hours</span>
                  </div>
                  <div className="countdown-box-wrapper">
                    <div className="countdown-box">
                      <span id="minutes"></span>
                    </div>
                    <span className="countdown-box-label">Minutes</span>
                  </div>
                  <div className="countdown-box-wrapper">
                    <div className="countdown-box">
                      <span id="seconds"></span>
                    </div>
                    <span className="countdown-box-label">Seconds</span>
                  </div>

                </div>
                <a className="nav-button" href="https://discord.gg/cityofgold" target="_blank">Discord</a>
              </div>
            </div>
          </div>

        </div>
        <div className="main-border">

        </div>
        <div className="mobile-nav" ref={mobileNavRef}>
          <ul className="mobile-nav-links">
            <li>
              <a className="mobile-anchor-link" href="#" onClick={closeNavMenu}>Home</a>
            </li>
            <li>
              <a className="mobile-anchor-link" href="#overview" onClick={closeNavMenu}>Overview</a>
            </li>
            <li>
              <a className="mobile-anchor-link" href="#roadmap" onClick={closeNavMenu}>Roadmap</a>
            </li>
            <li>
              <a className="mobile-anchor-link" href="#team" onClick={closeNavMenu}>The Team</a>
            </li>
            <a className="nav-button mobile" href="https://discord.gg/cityofgold" target="_blank">Discord</a>
            <i className="fas fa-times close-button" onClick={closeNavMenu}></i>
          </ul>
        </div>
      </div>


      {/* Mint Section */}
      <div>
        <div className="container">
          <div className="mint-section">
            <div className="mint-section-content">
              <h1>Close Look Presale</h1>
              <p>In publishing and Graphic design, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore, quisquam!</p>
            </div>
            <div className="mint-section-card">
              <div className="mint-section-card-heading">
                <h2>Mint NFT</h2>
                <span>1000 NFTs</span>
              </div>
              <div className="input-section-list">
                <div className="mint-input-section">
                  <span>Balance</span>
                  <span className='balance-amount'>200 ETH</span>
                  {/* <input type="text"  placeholder='Balance'/> */}
                </div>  

                <div className="mint-input-section">
                  <span>Amount</span>
                  <div className='amount-box'> 
                    <div><i class="fas fa-plus" onClick={increaseBalanceAmount}></i></div>
                    <span className='balance-amount'>{balanceAmount}</span>
                    {/* <input type="text"  placeholder='Amount'/> */}
                    <div><i class="fas fa-minus" onClick={decreaseBalanceAmount}></i></div>
                  </div>
                  <button className='max-button' type='button'>Max</button>
                </div>  

                <div className="mint-total-section">
                  <span>Total</span>
                  <span className='total-amount'>116.98 ETH</span>
                </div>
              </div>
              <button className='connect-wallet-button'>Connect Wallet</button>
            </div>
          </div>
        </div>
      </div>


      {/* Overview section */}
      <div>
        <div className="container">
          <div className="overview-section" id="overview">
            <div className=" overview-section-image">
              <img src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622b4eb6bb4fc5c888efcd25.png"
                alt="" />
            </div>
            <div className="overview-section-content">
              <h2>Overview</h2>
              <p>The City of Gold is a real life community-owned world inspired by the ancient myths of El Dorado and the
                City of Gold, the rise of play-to-earn games, and the need for bridging the online gold-rush with real world
                wealth principles. The City of Gold is decentralizing the control of education held by governments and the
                1% with its focus to enrich its members online and offline by empowering the next generation of
                entrepreneurs.</p>
            </div>
          </div>
        </div>
      </div>


      {/* Gallery */}
      <div>
        <div className="container">
          <div className="gallery-section" id="">
            <h1>Gallery</h1>
            <div className="gallery-image-wrapper">
              <div className="gallery-image">
                <img src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622f81971198eb20f1a85525.jpeg"
                  alt="gallery-image" />
              </div>
              <div className="gallery-image">
                <img src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622b4ff5bb4fc5b72cefcd9c.jpeg"
                  alt="gallery-image" />

              </div>
              <div className="gallery-image">
                <img src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622f7ec162214c08c34c253f.png"
                  alt="gallery-image" />
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* MetaVerse The world need */}
      <div>
        <div className="container">
          <div className="metaverse-section">
            <h1>THE METAVERSE THE WORLD NEEDS</h1>
            <div className="metaverse-list">
              <div className="metaverse-card">
                <div className="metaverse-icon">
                  <img src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622b50a8bb4fc54f9cefcdbe.png"
                    alt="" />
                </div>
                <h2>STAKING</h2>
                <p>Upon launch token holders will be able to stake their land NFTs to earn and utilize $COG tokens for
                  special rewards programs.</p>
              </div>
              <div className="metaverse-card">
                <div className="metaverse-icon">
                  <img src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622b50a8602846480c4666e1.png"
                    alt="" />
                </div>
                <h2>DAO</h2>
                <p>In game economy will reward the owners of land NFTs & the world will be governed by its residents.
                </p>
              </div>
              <div className="metaverse-card">
                <div className="metaverse-icon">
                  <img src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622b50a8602846087c4666e2.png"
                    alt="" />
                </div>
                <h2>$COG TOKEN</h2>
                <p>An ERC-20 token will be used to reward residents with staked assets and will be implemented in various
                  use cases especially for commerce within the world and gaining access to the Golden Circle.</p>
              </div>
              <div className="metaverse-card">
                <div className="metaverse-icon">
                  <img src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622e309de332b366c353e33d.png"
                    alt="" />
                </div>
                <h2>DAILY TIPS</h2>
                <p>Daily tips will be released to holders from scanners we developed to scour the market for Alpha.</p>
              </div>
              <div className="metaverse-card">
                <div className="metaverse-icon">
                  <img src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622b50a860284621264666e5.png"
                    alt="" />
                </div>
                <h2>EMPOWERMENT</h2>
                <p>We will be bringing in Keynote Speakers to empower our community on building businesses, crypto & NFT
                  investing, real estate investing, sales, marketing & more.</p>
              </div>
              <div className="metaverse-card">
                <div className="metaverse-icon">
                  <img src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622b50a860284693974666e4.png"
                    alt="" />
                </div>
                <h2>COACHING CALLS</h2>
                <p>Learn weekly from the founders on how they built multiple million dollar businesses and implement the
                  same strategies they used to build yours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Road Map */}
      <div>
        <div className="container">
          <div className="roadmap" id="roadmap">
            <h1>ROADMAP</h1>
            <h3>The World You’ve Been Waiting For</h3>
            <div className="roadmap-card-wrapper">
              <div className="roadmap-card-wrapper-2-right">
                <div className="card-circle-number">
                  <span>01</span>
                </div>
                <div className="roadmap-card right">
                  <div className="card-inner">
                    <div className="card-content">
                      <p>10,000 digital real estate NFTs consisting of 100 base models will mint. Everyone who mints will
                        receive a virtual mansion and plot of land that serves as a governance token which allows them to
                        participate in future DAO governance decisions on the platform. Our ERC-20 token will launch and
                        token holders will be able to stake their NFTs.</p>
                    </div>
                  </div>
                </div>
                <div className="outer-arrow">
                </div>
                <div className="outer-arrow-black">
                </div>
              </div>

              <div className="roadmap-card-wrapper-2-left">
                <div className="card-circle-number">
                  <span>02</span>
                </div>
                <div className="roadmap-card left">
                  <div className="card-inner">
                    <div className="card-content">
                      <p>Once the initial mint is concluded, the first virtual event will take place with the speaker to be
                        announced. The full gold paper will be published. Land development continues and we will collaborate
                        with the community for input on hubs and release a second collection of highrise units.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="outer-arrow">
                </div>
                <div className="outer-arrow-black">
                </div>
              </div>

              <div className="roadmap-card-wrapper-2-right">
                <div className="card-circle-number">
                  <span>03</span>
                </div>
                <div className="roadmap-card right">
                  <div className="card-inner">
                    <div className="card-content">
                      <p>We will roll out metaverse access to token holders' residences where they can hangout with their
                        friends and other community members. We will host our second virtual event, this one being in the
                        metaverse. We will also release our first 2 hubs and drop our third mint consisting of mansions.</p>
                    </div>
                  </div>
                </div>
                <div className="outer-arrow">
                </div>
                <div className="outer-arrow-black">
                </div>
              </div>

              <div className="roadmap-card-wrapper-2-left">
                <div className="card-circle-number">
                  <span>04</span>
                </div>
                <div className="roadmap-card left">
                  <div className="card-inner">
                    <div className="card-content">
                      <p>Avatar creation begins for token holders and we will release another hub. We will give away a
                        vehicle with the release of vehicles in the metaverse and an alpha version is dropped. The fourth
                        mint will take place. We will host our third virtual event.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="outer-arrow">
                </div>
                <div className="outer-arrow-black">
                </div>
              </div>

              <div className="roadmap-card-wrapper-2-right">
                <div className="card-circle-number">
                  <span>05</span>
                </div>
                <div className="roadmap-card right">
                  <div className="card-inner">
                    <div className="card-content">
                      <p>The final mint of residential plots takes place. Avatar creation services are available to the
                        public. Marketplaces come online and digital/physical goods can be purchased within the City of
                        Gold. Fourth virtual event is held.</p>
                    </div>
                  </div>
                </div>
                <div className="outer-arrow">
                </div>
                <div className="outer-arrow-black">
                </div>
              </div>

              <div className="roadmap-card-wrapper-2-left">
                <div className="card-circle-number">
                  <span>06</span>
                </div>
                <div className="roadmap-card left">
                  <div className="card-inner">
                    <div className="card-content">
                      <p>Commercial land is sold. Remainder of hubs are released. Avatar creation for token holders is
                        completed. DAO comes online and the community can begin submitting proposals. Fifth virtual event is
                        held.
                      </p>
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Team  */}
      <div>
        <div className="container">
          <div className="team-section" id="team">
            <h1>The Team</h1>
            <div className="team-section-list">
              <div className="team-section-card">
                <div className="team-section-card-wrapper">
                  <div className="team-image-wrapper">
                    <div className="team-image">
                      <img
                        src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622e295f8a14ed3d69921b59.jpeg"
                        alt="" />
                    </div>
                  </div>
                  <h2>Gabriel Pfeifer - El Dorado</h2>
                  <p>Over the past 10 years Gabriel Pfeifer has generated over 100+ million in sales, trained hundreds of
                    sales people,
                    currently runs a multi seven figure marketing agency, and has been featured in publications by Forbes,
                    NY
                    Weekly, & Yale.
                    He is putting it all on the line to bring you the City Of Gold.</p>
                </div>
              </div>
              <div className="team-section-card">
                <div className="team-section-card-wrapper">
                  <div className="team-image-wrapper">
                    <div className="team-image">
                      <img
                        src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622e295f8a14ede143921b5a.jpeg"
                        alt="" />
                    </div>
                  </div>
                  <h2>Alex Davila - Gold Mind</h2>
                  <p>An avid and early crypto adopter, Alex has made sizable profits by following where the "Smart Money"
                    goes and
                    understanding the dynamics of fundamental economic news. He is a BBW (baby beluga whale) in the NFT
                    space, and an
                    enthusiast of next frontier tech. He is experienced at managing operations for agencies and has
                    teamed up with
                    Gabriel to bring you the City Of Gold.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="logo">
              <img src="https://storage.googleapis.com/msgsndr/3Lm0Uh5hGdQixz6dXDVn/media/622c01e16fc5bb0fea50a60f.png"
                alt="" />
            </div>
            <div className="footer-box-list">
              <div className="footer-box">
                <h3>Social Media</h3>
                <div className="social-links-list">
                  <div className="social-link">
                    <a href="https://twitter.com/cityofgold_io" target="_blank">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </div>
                  <div className="social-link">
                    <a href="https://www.instagram.com/cityofgold_io/" target="_blank">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="footer-box">
                <h3>Join The Community</h3>
                <div className="social-links-list">
                  <a className="nav-button" href="https://discord.gg/cityofgold" target="_blank">Discord</a>
                  
                </div>
              </div>
            </div>

          </div>
        </div>
      </footer>

    </div>
  )
}

export default MainPage;