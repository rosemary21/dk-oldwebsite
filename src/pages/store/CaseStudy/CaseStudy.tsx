import "./CaseStudy.css";
import Data from "../../../Data.json";
import SoftwareNavbar from "../../../components/shop/SoftwareNavbar/SoftwareNavbar";
import mobileView from "../../../utilities/mobileView";
import Footer from "../../../components/general/Footer/Footer";

export default function CaseStudyPage() {
  const CASESTUDY = Data.softwarePage.CASESTUDY;
  return (
    <div>
      <main className="caseStudyMain">
        <SoftwareNavbar />

        <div className={`casestudyText ${mobileView() ? "mx-2" : "mx-5"}`}>
          <p className="casestudyText-1">CASE STUDY</p>
          <p className="casestudyText-2">Vively — Visual Identity</p>
          <p className="casestudyText-3">April 14, 2021</p>
        </div>
      </main>

      <section>
        <img src="/assets/strike-lines.png" alt="strikelines" />
        <p className="caseStudy-description">
          {CASESTUDY.description1}
          <br /> <br />
          {CASESTUDY.description2}
        </p>
        <p className="caseStudy-testimonial">{CASESTUDY.testimonial}</p>

        {/* caseStudy ADVERT */}
        <div className="caseStudyAds"></div>

        <div className="caseStudyAds-desc">
          <h2>{CASESTUDY.advertHeader}</h2>
          <p>
            {CASESTUDY.adsText1}
            <br /> <br />
            {CASESTUDY.adsText2}
            <br /> <br />
            {CASESTUDY.adsText3}
            <br /> <br />
            {CASESTUDY.adsText4}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
