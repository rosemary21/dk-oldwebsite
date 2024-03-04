import { useNavigate } from "react-router-dom";
import Data from "../../../Data.json";
import Footer from "../../../components/general/Footer/Footer";
import SoftwareAd from "../../../components/shop/SoftwareAd/SoftwareAds";
import SoftwareNavbar from "../../../components/shop/SoftwareNavbar/SoftwareNavbar";
import "../../../pages/store/Fashion(Men)/Fashion.css";
import "./Software.css";

export default function Software() {
  // Initiate useNavigate for routing
  const navigate = useNavigate();

  //   For routing to case-study
  const handleRoute = () => {
    navigate("/caseStudy-page");
  };

  return (
    <div>
      <main className="technologyMain">
        <SoftwareNavbar />

        <div className="main-overlay-container" style={{ paddingTop: "2rem" }}>
          <div className="main-overlay">
            <img
              className="technology-bg-img"
              src="/images/Technology.png"
              alt="bg-group-text"
            />

            <img
              className="main-overlay-2"
              src="/images/company-name-round.png"
              alt="company-name-round"
            />
          </div>

          <div className="main-overlay-footer">
            <div className="main-footer-imgs">
              <img
                className="play-icon"
                src="/images/play-icon.png"
                alt="play-icon"
              />
              
              <img
                className="play-vector"
                src="/images/play-vector.png"
                alt="play-vector"
              />
            </div>

            <p className="main-footer-desc">
              Intrigued by beauty, fascinated by technology and fuelled with an
              everlasting devotion to digital craftsmanship and meaningful
              aesthetics.
            </p>
          </div>
        </div>
      </main>

      <section id="software-services" className="tech-our-services">
        <h1>Our Services</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipis elit</p>
        <div className="tech-our-services-group">
          {Data.softwarePage.ourServices.map((service) => (
            <div key={service.id}>
              <img src={service.icon} alt={service.title.toLowerCase()} />
              <h2>{service.title}</h2>
              <p>{service.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="case-study" className="tech-our-services-ad">
        <div className="tech-our-services-left">
          <h1>See Creative Solutions we've created for our Clients</h1>
          <button>Our Portfolio</button>
          <img src="/images/strike-lines.png" alt="StrikeLines" />
          <div className="our-services-count">
            <div>
              <h2>50k+</h2>
              <span>Artwork</span>
            </div>
            <div>
              <h2>17k+</h2>
              <span>Artists</span>
            </div>
          </div>
        </div>
        <div className="tech-our-services-right">
          <img
            src="/images/tech-service-1.png"
            alt="TechImg1"
            onClick={handleRoute}
          />
          <img
            src="/images/tech-service-2.png"
            alt="TechImg2"
            onClick={handleRoute}
          />
        </div>
      </section>

      <section className="tech-testimonial container">
        <h4>Testimonials</h4>
        <h1>Don't just take our words</h1>
        <div className="test-container">
          <div className="test-left">
            <div className="test-left-img">
              <img src="/images/tech-test-1.png" alt="TechImgTest1" />
            </div>
            <div className="test-left-card">
              <div className="test-stars">
                <i className="bx bxs-star" />
                <i className="bx bxs-star" />
                <i className="bx bxs-star" />
                <i className="bx bxs-star" />
                <i className="bx bx-star" />
              </div>
              <p className="test-review">
                "We love Landingfolio! Our designers were using it for their
                projects, so we already knew what kind of design they want."
              </p>
              <span className="test-review-group">
                <p className="test-name">Jenny Wilson</p>
                <p className="test-link">Grower.io</p>
              </span>
            </div>
          </div>

          <div className="test-left">
            <div className="test-left-img">
              <img src="/images/tech-test-2.png" alt="TechImgTest1" />
            </div>
            <div className="test-left-card">
              <div className="test-stars">
                <i className="bx bxs-star" />
                <i className="bx bxs-star" />
                <i className="bx bxs-star" />
                <i className="bx bxs-star" />
                <i className="bx bx-star" />
              </div>

              <p className="test-review">
                "We love Landingfolio! Our designers were using it for their
                projects, so we already knew what kind of design they want."
              </p>

              <span className="test-review-group">
                <p className="test-name">Devon Lane</p>
                <p className="test-link">DLDesign.co</p>
              </span>
            </div>
          </div>
        </div>
      </section>

      <SoftwareAd />

      <Footer />
    </div>
  );
}
