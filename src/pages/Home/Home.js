import "./home.scss";
import Header from '../../components/Header/Header';
import Timer from '../../components/Timer/Timer';
import content from "../../components/content"
import headingImg from "../../Images/3.png"
import Gallery from "../../components/Gallery/Gallery";
import Cards from "../../components/Cards/Cards";
import Roadmap from "../../components/Roadmap/Roadmap";
import Team from "../../components/Team/Team";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  return (
    <div>
        <Header/>
        <Timer/>
        <section>
            <div className='overView-container'>
              <div className='overviewContent'>
                  <img className='overviewImage' src={headingImg} alt={content[0].heading}/>
              </div>
              <div className='overviewContent'>
                <p>
                 <span>{content[0].heading}</span>
                  {content[0].headingPara}
                </p>
              </div>
            </div>
        </section>
        <Gallery/>
        <Cards/>
        <Roadmap/>
        <Team/>
        <Footer/>
    </div>
  )
}
