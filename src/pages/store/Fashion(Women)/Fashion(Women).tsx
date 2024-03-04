/* eslint-disable @typescript-eslint/no-explicit-any */
import "../Fashion(Men)/Fashion.css";
import { Col, Row } from "react-bootstrap";
import { HashLink } from "react-router-hash-link";
import FashionNavbar from "../../../components/shop/FashionNavbar/FashionNavbar";
import FashionMain from "../../../components/shop/FashionMain/FashionMain";
import Data from "../../../Data.json"
import StoreItemCard from "../../../components/shop/StoreItemCard/StoreItemCard";
import Footer from "../../../components/general/Footer/Footer";

export default function FashionWomen() {
    const women = Data.fashionPage.fashionStore.women;
  return (
    <div>
      <FashionNavbar activeLink="women" />

      {/* FASHION (WOMEN) MAIN */}
      <FashionMain />

      {/* CATEGORIES */}
      <section className="popular-categories-section">
        <h1 className="title-text">Popular Categories</h1>
        <Row xs={2} md={2} lg={4} className="mt-5">
          {Data.fashionPage.fashionCategoryCards.map(
            ({ title, bgImage, productCount, link, buttonText }, idx) => (
              <Col key={idx} className="my-2">
                <div
                  className="fashion-category-wrapper shadow-sm rounded"
                  style={{ backgroundImage: `url(${bgImage})` }}
                >
                  <h1>{title}</h1>
                  <span>{productCount}</span>

                  <HashLink
                    to={link}
                    scroll={(el: any) =>
                      el.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                  >
                    <button>{buttonText}</button>
                  </HashLink>
                </div>
              </Col>
            )
          )}
        </Row>
      </section>

      {/* WOMEN STORE */}
      <section id="store">
        <h1 className="title-text">Top Sales For Women</h1>
        <Row xs={2} md={2} lg={3} className="mt-3">
          {women.map((item, idx) => (
            <Col key={idx}>
              <StoreItemCard store={women} {...item} />
            </Col>
          ))}
        </Row>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
