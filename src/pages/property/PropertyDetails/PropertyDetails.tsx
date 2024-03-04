import { useState } from "react";
import { Alert } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/general/Footer/Footer";
import PropertyNavbar from "../../../components/property/PropertyNavbar/PropertyNavbar";
import { useAdminContext } from "../../../contexts/AdminContext";
import { usePropertyContext } from "../../../contexts/PropertyContext";
import { useStoreContext } from "../../../contexts/StoreContext";
import ErrorModal from "../../../modals/Error";
import formatCurrency from "../../../utilities/FormatCurrency";
import "./PropertyDetails.css";
import { checkoutResponse } from "../../../types/Properties";

export default function PropertyDetails() {
  const [error, setError] = useState("");

  // Contexts values
  const { token } = useAdminContext();
  const { setActiveTab } = useStoreContext();
  const { propertyItem, unboardingFrom, setCheckOut } = usePropertyContext();

  // NAVIGATE TO PAGES
  const navigate = useNavigate();

  function navigateToContact() {
    navigate("/contact-us");
  }

  async function handlePay() {
    const myHeaders = new Headers();
    myHeaders.append("apiKey", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      address: "5 shobande street",
      zipCode: "10001",
      state: "lagos",
      city: "lagos",
      userName: "rose",
      localGovernment: "Somolu",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    if (token !== "") {
      const res = await fetch(
        `${import.meta.env.VITE_BASEURL}/api/v1/delivery/checkout`,
        requestOptions
      );
      if (!res) setError("Cannot connect to server");
      const data: checkoutResponse = await res.json();

      if (data.code == "cv401") {
        navigate("/property-checkout");
        setActiveTab("sign-in");
      } else if (data.responseDto.code == "dkss") {
        setCheckOut(data);
        navigate("/property-checkout");
        setActiveTab("billing-details");
      } else {
        setError(data.responseDto.message);
      }
    } else {
      navigate("/property-checkout");
      setActiveTab("sign-in");
    }
  }

  // FROM CONTEXT API
  if (propertyItem === null)
    return (
      <Alert variant="danger">
        <p>Item not found</p>
      </Alert>
    );

  // RESPONSIVE BREAKPOINTS FOR CAROUSEL
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1200, min: 576 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <main className="property-main" id="property-main-details">
        <PropertyNavbar activeLink="" />

        <div className="property-details">
          <div className="property-details-slider">
            {propertyItem.imagesList ? (
              <Carousel
                responsive={responsive}
                showDots
                infinite
                containerClass="carousel-container"
              >
                <img
                  src={propertyItem.imagesList[0]?.imageUrl}
                  alt={`apartment-1`}
                />
                <img
                  src={propertyItem.imagesList[1]?.imageUrl}
                  alt={`apartment-2`}
                />
                {propertyItem.multipartFile ? (
                  <video src={propertyItem.multipartFile} autoPlay muted loop />
                ) : (
                  <img
                    src={propertyItem.imagesList[2]?.imageUrl}
                    alt={`apartment-3`}
                  />
                )}
              </Carousel>
            ) : (
              <Carousel
                responsive={responsive}
                showDots
                infinite
                containerClass="carousel-container"
              >
                <img
                  src={propertyItem.imageUrl}
                  alt={propertyItem.description}
                />
              </Carousel>
            )}
          </div>

          <div className="property-details-desc">
            <div className="property-details-link">
              Home -{" "}
              <Link to={`/property-${unboardingFrom.toLowerCase()}`}>
                {unboardingFrom.toLowerCase()}
              </Link>{" "}
              -{" "}
              <span>
                {propertyItem.description} in {propertyItem.location}
              </span>
            </div>

            <h2>{propertyItem.description}</h2>
            <p className="about-property">{propertyItem.productSize}</p>

            <div className="property-details-price">
              <h1>{formatCurrency(propertyItem.amount)}</h1>
            </div>

            <div className="pay-btn-group">
              <button className="property-pay" onClick={handlePay}>
                Continue
              </button>
              <button className="property-contact" onClick={navigateToContact}>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </main>

      <section>
        {/* PROPERTY PAGE DESCRIPTION TAB */}
        {/* <div className="details-page-tab">
            <div className="details-page-tab-title">
              <div
                onClick={() => setActiveTab("description")}
                className={activeTab === "description" ? "activeItemsTab" : ""}
              >
                Description
              </div>
            </div>
            <div className="details-page-tab-title">
              <div
                onClick={() => setActiveTab("location")}
                className={activeTab === "location" ? "activeItemsTab" : ""}
              >
                Location
              </div>
            </div>
          </div>

          <div className="details-page-tab-description">
            <div
              style={{
                display: activeTab === "description" ? "block" : "none",
              }}
            >
              <div className="art-description-tab">
                <h1>Product</h1>
                <span>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, scelerisque ut sapien, posuere non. Faucibus egestas consectetur interdum amet id elementum. Lacinia non augue amet at. Nunc fringilla bibendum nisl, vitae nisl.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, scelerisque ut sapien, posuere non. Faucibus egestas consectetur interdum amet id elementum. Lacinia non augue amet at. Nunc fringilla bibendum nisl, vitae nisl.`}</span>

                <h1>Key Ingredients</h1>
                <span>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, scelerisque ut sapien, posuere non. Faucibus egestas consectetur interdum amet id elementum. Lacinia non augue amet at. Nunc fringilla bibendum nisl, vitae nisl.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, scelerisque ut sapien, posuere non. Faucibus egestas consectetur interdum amet id elementum. Lacinia non augue amet at. Nunc fringilla bibendum nisl, vitae nisl.`}</span>

                <h1>How To Apply</h1>
                <span>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, scelerisque ut sapien, posuere non. Faucibus egestas consectetur interdum amet id elementum. Lacinia non augue amet at. Nunc fringilla bibendum nisl, vitae nisl.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, scelerisque ut sapien, posuere non. Faucibus egestas consectetur interdum amet id elementum. Lacinia non augue amet at. Nunc fringilla bibendum nisl, vitae nisl.`}</span>
              </div>
            </div>
            <div
              style={{ display: activeTab === "location" ? "block" : "none" }}
            >
              <div className="art-description-tab">
                <h1>Location</h1>
                <span>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, scelerisque ut sapien, posuere non. Faucibus egestas consectetur interdum amet id elementum. Lacinia non augue amet at. Nunc fringilla bibendum nisl, vitae nisl.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, scelerisque ut sapien, posuere non. Faucibus egestas consectetur interdum amet id elementum. Lacinia non augue amet at. Nunc fringilla bibendum nisl, vitae nisl.`}</span>
              </div>
            </div>
          </div> */}

        {/* EXTRA PROPERTIES */}
        {/* <div className="property-group">
            <PropertyBox
              img="/assets/Property/apartment1.png"
              is3d={true}
              title="3 Bedroom flat Apartment"
              location="Ikeja Lagos"
            />
            <PropertyBox
              img="/assets/Property/apartment2.png"
              is3d={true}
              title="3 Bedroom flat Apartment"
              location="Ajah, Lagos"
            />
            <PropertyBox
              img="/assets/Property/apartment3.png"
              is3d={false}
              title="1 Bedroom flat Apartment"
              location="Samolu, Lagos"
            />
          </div> */}
      </section>

      <Footer />

      {error && <ErrorModal errorMsg={error} callbackFunction={setError} />}
    </div>
  );
}
