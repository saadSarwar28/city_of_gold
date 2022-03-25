import React from 'react'
import Footer from '../../components/Footer/Footer'
import GallerySection from '../../components/Gallery/GallerySection'
import MainSection from '../../components/Main/MainSection'
import MetaverseSection from '../../components/Metaverse/MetaverseSection'
import OverviewSection from '../../components/Overview/OverviewSection'
import RoadmapSection from '../../components/Roadmap/RoadmapSection'
import TeamSection from '../../components/Team/TeamSection'

const Home = () => {
  
  
  return (
    <>
      {/* Gradient with Main Section and Overview */}
      <div class="gradient">
        
        {/* Main Section */}
        <MainSection />

        {/* Overview section */}
        <OverviewSection />

      </div>

      {/* Gallery section */}
      <GallerySection />

      {/* Metaverse section */}
      <MetaverseSection />

      {/* RoadMap Section */}
      <RoadmapSection />

      {/* Team Section */}
      <TeamSection />

      {/* Footer */}
      <Footer />

    </>


  )
}

export default Home