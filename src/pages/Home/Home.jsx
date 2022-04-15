import React, { useEffect, useState } from 'react'
import { BounceLoader } from 'react-spinners'
import Footer from '../../components/Footer/Footer'
import Gallery from '../../components/Gallery/Gallery'
import Metaverse from '../../components/Metaverse/Metaverse'
// import MainSection from '../../components/Main/MainSection'
import Overview from '../../components/Overview/Overview'
import Roadmap from '../../components/Roadmap/Roadmap'
import Team from '../../components/Team/Team'
// import RoadmapSection from '../../components/Roadmap/Roadmap'
// import TeamSection from '../../components/Team/Team'
import MainSection from './MainSection'

const Home = () => {

  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Adding event listener for loader
    window.addEventListener("load", pageLoaderCallback)

    // Removing the event listener when component remove
    return unmountCallback;
  }, [])


  const unmountCallback = () => {
    window.removeEventListener("load", pageLoaderCallback);
  }

  const pageLoaderCallback = () => {
    setIsLoading(false);
  }
  
  return (
    <>
      {
        isLoading &&
          <div className='loaderWrapper'>
            <BounceLoader color='orange' size={70}/>
          </div>
      }
      {/* Gradient with Main Section and Overview */}
      <div className="gradient" id="main-section">
        
        {/* Main Section */}
        <MainSection />

        {/* Overview section */}
        <Overview />

      </div>

      {/* Gallery section */}
      <Gallery />

      {/* Metaverse section */}
      <Metaverse />

      {/* RoadMap Section */}
      <Roadmap />

      {/* Team Section */}
      <Team />

      {/* Footer */}
      <Footer />

    </>


  )
}

export default Home