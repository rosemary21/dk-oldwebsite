/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Data from "../../../Data.json";
import Footer from "../../../components/general/Footer/Footer";
import AboutCard from "../../../components/property/AboutCard/AboutCard";
import BookingTable from "../../../components/property/BookingTable/BookingTable";
import CategoryCard from "../../../components/property/CategoryCard/CategoryCard";
import PropertyNavbar from "../../../components/property/PropertyNavbar/PropertyNavbar";
import SelectStateForm from "../../../components/property/SelectStateForm/SelectStateForm";
import TestimonialCard from "../../../components/property/TestimonialCard/TestimonialCard";
import { useAdminContext } from "../../../contexts/AdminContext";
import ErrorModal from "../../../modals/Error";
import {
  NoOfPropertiesByCatProp,
  TotalNoOfPropertiesResponseProps,
} from "../../../types/Properties";
import Spinner from "../../../utilities/Spinner";
import "./Home.css";
import { usePropertyContext } from "../../../contexts/PropertyContext";

const propertiesCategories = ["PROSHO", "PROAPA", "PROLAN"];

interface propDataCat {
  id: number;
  category: string;
  count: number;
  image: string;
}

export default function PropertyHome() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [noPropertiesByCat, setNoPropertiesByCat] =
    useState<NoOfPropertiesByCatProp>({} as NoOfPropertiesByCatProp);

  // Use OOP to insert NoPropertiesByCat into Data.propertySection.categories.count
  const prodImg = Data.propertySection.categories.map((cat) => cat.image);

  const PROPERTIES: propDataCat[] = [
    {
      id: 0,
      category: propertiesCategories[2],
      count: noPropertiesByCat.PROLAN,
      image: prodImg[0],
    },
    {
      id: 1,
      category: propertiesCategories[0],
      count: noPropertiesByCat.PROSHO,
      image: prodImg[1],
    },
    {
      id: 2,
      category: propertiesCategories[1],
      count: noPropertiesByCat.PROAPA,
      image: prodImg[2],
    },
  ];

  const { token } = useAdminContext();
  const { state, setState } = usePropertyContext();

  const navigate = useNavigate();

  async function getTotalNoOfProperties() {
    const myHeaders = new Headers();
    myHeaders.append("apiKey", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      location: state,
      productCodeList: propertiesCategories,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    setLoading(true);

    await fetch(
      `${
        import.meta.env.VITE_BASEURL
      }/api/v1/productdescription/category/location`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result: TotalNoOfPropertiesResponseProps) => {
        if (result.responseDto.code === "dkss") {
          setLoading(false);
          setNoPropertiesByCat(result.values);
        } else {
          setLoading(false);
          setError(result.responseDto.message);
        }
      })
      .catch(() => {
        setLoading(false);
        setError("Cannot connect to server");
      });
  }

  useEffect(() => {
    getTotalNoOfProperties();
  }, [state]);

  return (
    <div>
      <main className="property-main">
        <PropertyNavbar activeLink="home" />

        <div className="property-main-inner">
          <div className="property-main-inner-left">
            <p className="property-main-subtitle">Best Property Platform</p>
            <p className="property-main-title">
              Property Acquisition made seamless
            </p>
            <p className="property-main-desc">
              Much did had call new drew that kept. Limits expect wonder law
              she. Now has you views woman noisy match money rooms.
            </p>
          </div>

          <div className="property-main-inner-center">
            <img src="/images/Property/propertyHome-mainBg.png" alt="bg-img" />
          </div>

          <div className="property-main-inner-right">
            <Link to="https://www.facebook.com/" target="_blank">
              <i className="bx bxl-facebook bx-sm" />
            </Link>
            <Link to="https://www.instagram.com/" target="_blank">
              <i className="bx bxl-instagram bx-sm" />
            </Link>
            <Link to="https://twitter.com/" target="_blank">
              <i className="bx bxl-twitter bx-sm" />
            </Link>
            <Link to="https://www.linkedin.com/" target="_blank">
              <i className="bx bxl-linkedin bx-sm" />
            </Link>
          </div>
        </div>

        <SelectStateForm
          className="property-main-form"
          state={state}
          setState={setState}
        />

        <div className="overlayLine1">
          <img src="/images/Property/lineOverlay.png" alt="line1" />
        </div>
        <div className="overlayLine2">
          <img src="/images/Property/lineOverlay.png" alt="line2" />
        </div>
        <div className="overlayLine3">
          <img src="/images/Property/lineOverlay.png" alt="line3" />
        </div>
      </main>

      {/* PROPERTY ABOUT */}
      <div className="propertyAbout">
        <section className="propertyAbout-inner">
          <div className="propertyAbout-inner-up">
            <p className="propertyAbout-title">
              Your Dream <span className="reded">Property</span> Now Within
              Reach
            </p>
            <div className="propertyAbout-desc">
              <i className="bx bxs-quote-alt-left bx-sm" />
              <p>
                The top property center platform in Nigeria is D'kulerative. We
                offer people the greatest property search experience both online
                and offline with a web-based platform for property sales by
                linking them with reliable and verified real estate agents.
              </p>
              <i className="bx bxs-quote-alt-right bx-sm" />
            </div>
          </div>

          <div className="propertyAbout-inner-down">
            {Data.propertySection.about.map((data) => (
              <AboutCard key={data.id} {...data} />
            ))}
          </div>
        </section>

        {/* OVERLAYS */}
        <img
          className="about-overlays-1"
          src="/images/Property/curve-left-overlay.png"
          alt="overlayLeft"
        />
        <img
          className="about-overlays-2"
          src="/images/Property/curve-right-overlay.png"
          alt="overlayRight"
        />
      </div>

      {/* PROPERTY CATEGORIES */}
      <section>
        <div className="property-category-up">
          <div>
            <h3>We give the Best Property Deal</h3>
            <p>
              Colonel gravity get thought fat smiling add but. Wonder twenty
              hunted and put income set desire expect.
            </p>
          </div>
          <button onClick={() => navigate("/all-properties")}>
            View All Property
          </button>
        </div>

        <div className="property-category-down">
          {PROPERTIES.map((data) => (
            <CategoryCard key={data.id} {...data} />
          ))}
        </div>
      </section>

      {/* PROPERTY TESTIMONIAL */}
      <section>
        <h2 className="testimonial-header">
          Loved by businesses, and individuals across the globe.
        </h2>
        <div className="testimonial-cards">
          {Data.propertySection.testimonial.map((data) => (
            <TestimonialCard key={data.id} {...data} />
          ))}
        </div>
      </section>

      {/* PROPERTY SERVICES */}
      <section>
        <h2 className="service-header">Featured Listing of the Week</h2>

        <div className="service-container">
          <div className="service-imgs">
            <img
              className="service-pic-1"
              src="/images/Property/service-upper.png"
              alt="service-pic-1"
            />
            <img
              className="service-pic-2"
              src="/images/Property/service-lower.png"
              alt="service-pic-2"
            />
          </div>

          <div className="service-table">
            <h2>The and collecting for the motionless difficulty son.</h2>
            <p>
              Conveying or northward offending admitting perfectly my. Colonel
              gravity get thought fat smiling add but difficult situations.
            </p>

            <BookingTable />

            <button onClick={() => navigate("/contact-us")}>
              YES! I WANT BOOK “OFFICE PACKAGE”
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {loading && <Spinner animationType="grow" />}
      {error && <ErrorModal errorMsg={error} callbackFunction={setError} />}
    </div>
  );
}
