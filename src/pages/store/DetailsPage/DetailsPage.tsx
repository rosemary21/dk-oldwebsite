import { useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import { NavLink } from "react-router-dom";
import Data from "../../../Data.json";
import "./DetailsPage.css";
import { useStoreContext } from "../../../contexts/StoreContext";
import ArtCraftNavbar from "../../../components/shop/ArtCraftNavbar/ArtCraftNavbar";
import formatCurrency from "../../../utilities/FormatCurrency";
import StoreItemCard from "../../../components/shop/StoreItemCard/StoreItemCard";
import { allbrandsProps } from "../../../types/Store";
import Footer from "../../../components/general/Footer/Footer";

export default function DetailsPage() {
  const [activeTab, setActiveTab] = useState("description");
  const { selectedItem, increaseCartQty } = useStoreContext();

  if (selectedItem === null) return (
    <Alert variant="danger">
      <p>Item not found</p>
    </Alert>
  );

  const men = Data.fashionPage.fashionStore.men;
  const women = Data.fashionPage.fashionStore.women;
  const kids = Data.fashionPage.fashionStore.kids;
  const allbrands: allbrandsProps[] = [...men, ...women, ...kids];

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
      <ArtCraftNavbar activeLink="" />

      <section id="details-page" className="details-page">
        <div className="detailItem">
          <h1>
            Home +{" "}
            <button>
              <NavLink
                className="text-muted"
                to={`/${selectedItem?.prevLink || "no-link"}`}
              >
                {selectedItem.prevLink}
              </NavLink>
            </button>{" "}
            + <span>{selectedItem.name}</span>
          </h1>

          <div className="cart-details">
            <div className="cart-details-left">
              <Carousel
                responsive={responsive}
                showDots
                infinite
                containerClass="shop-detail-carousel-container"
              >
                {selectedItem.itemImage.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={selectedItem.name}
                    title={selectedItem.name}
                  />
                ))}
              </Carousel>
            </div>

            <div className="cart-details-right">
              <span className="cart-details-right-title">
                <h1>{selectedItem.name}</h1>
              </span>
              <span className="cart-details-right-desc">
                {selectedItem.description}
              </span>
              <div className="more-details">
                <a href="#details-page-tab">More Details</a>
              </div>
              <p className="item-price">{formatCurrency(selectedItem.price)}</p>
              <div className="cart-details-right-line"></div>
              <div className="item-size">
                <h4>Size</h4>
                <span>{`${selectedItem.size} inches`}</span>
              </div>
              <button
                onClick={() => increaseCartQty(selectedItem.id)}
              >
                ADD TO BAG
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="details-page-tab" className="details-page-tab container">
        <div className="details-page-tab-title">
          <div
            onClick={() => setActiveTab("description")}
            className={activeTab === "description" ? "activeaItemsTab" : ""}
          >
            Description
          </div>
        </div>

        <div className="details-page-tab-description">
          <div
            style={{ display: activeTab === "description" ? "block" : "none" }}
          >
            <div className="art-description-tab">
              <h1>Product</h1>
              <span>{selectedItem.productDescription}</span>

              <h1>Key Ingredients</h1>
              <span>{selectedItem.keyIngredient}</span>

              <h1>How To Apply</h1>
              <span>{selectedItem.howToApply}</span>
            </div>
          </div>
        </div>

        <div className="also-available">
          Also Available
          <div className="art-gallery-cards-container mt-4">
            <Row xs={2} md={2} lg={3} className="mt-3">
              {allbrands.slice(0, 3).map((item, idx) => (
                <Col key={idx}>
                  <StoreItemCard {...item} store={allbrands} />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
