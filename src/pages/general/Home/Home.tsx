import { useState } from 'react';
import { Card, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import { NavLink, useNavigate } from 'react-router-dom';
import Data from "../../../Data.json";
import Footer from "../../../components/general/Footer/Footer";
import "./home.css";
import DeliveryBox from '../../../components/shop/DeliveryBox/DeliveryBox';
import SoftwareAd from '../../../components/shop/SoftwareAd/SoftwareAds';
import mobileView from '../../../utilities/mobileView';

export default function Home() {
  const [activeNav, setActiveNav] = useState("home");

  // Navigate function
  const navigate = useNavigate()

  // Responsive layout for multi-carousel-slider
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1200 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1200, min: 992 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 992, min: 576 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      {/* MAIN */}
      <main className="e-store-home">
        <Navbar key="sm" expand="sm" variant="dark" className="navStyle mb-2">
          <Container fluid>
            <Navbar.Brand as={NavLink} to="/">
              <img src="/images/logo.png" alt="logo" width={60} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-sm"
              aria-labelledby="offcanvasNavbarLabel-expand-sm"
              placement="end"
              className="w-75"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3 gap-2">
                  {Data.homePage.homeNavbar.map(({ title, link }, idx) => (
                    <Nav.Link
                      as={NavLink}
                      key={idx}
                      to={link}
                      className={activeNav === title.toLowerCase() ? "homeNavLink activeNav" : "homeNavLink"}
                      onClick={() => setActiveNav(title.toLowerCase())}
                      style={{ color: mobileView() ? "#000" : "#e2e2e2" }}
                    >{title}</Nav.Link>
                  ))}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>

        <div className="main-overlay-container">
          <div className="main-overlay">
            <img
              className="main-overlay-1"
              src="/images/home-bg-group-text.png"
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
              <img className="play-icon" src="/images/play-icon.png" alt="play-icon" />
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

      {/* CATEGORIES/OTHERS */}
      <section>
        <div className="e-store-home-categories">
          <h1>
            Your total solution <br /> to grow with D'kerulative
          </h1>
          <p>
            Acquire high-value clients at a low cost, increase retention
            <br />
            and grow revenue through targeted referral and loyalty programs.
          </p>
        </div>

        {/* CATEGORY CARDS */}
        <div className="e-store-home-categories-cards">
          {Data.homePage.homeCategoriesCards.map(
            ({ icon, title, description }, idx) => (
              <div className="home-categories-cards" key={idx}>
                <img src={icon} alt="category-icons" />
                <div className="home-categories-group">
                  <h1>{title}</h1>
                  <p>{description}</p>
                </div>
              </div>
            )
          )}
        </div>

        {/* ViIDEO SECTION */}
        <div className="video-container" style={{ marginTop: "5rem" }}>
          <video
            src="/images/ShopAdvertisingVideo.mp4"
            autoPlay
            loop
            muted
          />
        </div>

        {/* TESTIMONIAL */}
        <div className="e-store-testimonial">
          {Data.homePage.homeTestimonials.map(
            ({ title, name, position }, idx) => (
              <div key={idx}>
                <p>{title}</p>
                <h3>{name}</h3>
                <span>{position}</span>
              </div>
            )
          )}
        </div>

        {/* DELIVERY BOX */}
        <div className="delivery-box-container">
          <div className="box-1">
            <h1>Delivering the best fashion outfit</h1>
            <span>
              We believe in a world where you have total freedom to be you,
              without judgement. To experiment. To express yourself. To be brave
              and grab life as the extraordinary adventure it is.{" "}
            </span>
          </div>

          <DeliveryBox
            title="Red Quality Joggers"
            label="Unsex Red joggers"
            image="/images/box-2-bg.png"
          />
          <DeliveryBox
            title="T-Shirt High-Quality"
            label="Lapel Polo Shirt M-5XL Blue"
            image="/images/box-3-bg.png"
          />

          <div className="box-4">
            <button className="box-4-group" onClick={() => navigate("/fashion")}>
              Our Store
              <img src="/images/arrow-up.png" alt="arrow-up" />
            </button>
          </div>

          <DeliveryBox
            title="Top Quality Joggers Pant"
            label="Black With White Stripes"
            image="/images/box-4-bg.png"
          />
          <DeliveryBox
            title="SMART CONTOUR DESIGN"
            label="MEN/Women(man- Kneel)"
            image="/images/box-5-bg.png"
          />
          <DeliveryBox
            title="Round Neck Collection"
            label="MEN/Women(man- Kneel)"
            image="/images/box-6-bg.png"
          />
        </div>

        {/* ART GALLERY */}
        <div className="art-top">
          <h1>Delivering the best fashion outfit</h1>
          <p className="art-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
            tortor cum dictum nulla.
          </p>
          <button className="art-btn" onClick={() => navigate("/art-craft")}>See Our Art Shop</button>
        </div>
      </section>

      {/* SLIDER */}
      <section>
        <Carousel
          responsive={responsive}
          infinite
          swipeable
          autoPlay
          autoPlaySpeed={10000}
          customTransition="all .5"
          transitionDuration={500}
        >
          {Data.homePage.homeAdCarousel.map((data, idx) => (
            <Card key={idx} className="homeAdCarousel">
              <Card.Img
                variant="top"
                src={data.img}
                className="homeAdCarousel-img"
              />
              <Card.Header className="overflow-hidden">{data.title}</Card.Header>
            </Card>
          ))}
        </Carousel>
      </section>

      {/* SOFTWARE AD */}
      <SoftwareAd />

      {/* FOOTER */}
      <Footer />
    </div>
  )
}
