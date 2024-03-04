import "./ArtCraft.css"
import Data from "../../../Data.json"
import { useState } from "react";
import ArtCraftNavbar from "../../../components/shop/ArtCraftNavbar/ArtCraftNavbar";
import { Col, Row } from "react-bootstrap";
import Footer from "../../../components/general/Footer/Footer";
import ArtCraftMain from "../../../components/shop/ArtCraftMain/ArtCraftMain";
import ArtCraftCategories from "../../../components/shop/ArtCraftCategories/ArtCraftCategories";
import { StoreItemProps } from "../../../types/contexts";
import StoreItemCard from "../../../components/shop/StoreItemCard/StoreItemCard";

export default function ArtCraft() {
    const [expand, setExpand] = useState(false);

    const STORE = Data.artCraftPage.artCraftStore

    function handleExpand() {
        setExpand(!expand);
    }

  return (
    <div>
      <ArtCraftNavbar activeLink="home" />

      {/* MAIN */}
      <ArtCraftMain />

      {/* CATEGORIES */}
      <ArtCraftCategories />

      {/* NEW TO ART GALLERY ====> ??? */}
      <section id="wall-painting">
        <h1 className="title-text">NEW ART TO THE GALLERY</h1>

        <Row xs={2} md={2} lg={3} className="items-cards mt-3">
          {STORE.wallPainting
            .slice(0, 3)
            .map((curr: StoreItemProps, idx: number) => (
              <Col key={idx}>
                <StoreItemCard {...curr} store={STORE.wallPainting} />
              </Col>
            ))}
        </Row>
      </section>

      <section id="hand-crafted">
        <div className="d-flex align-items-baseline justify-content-between">
          <h1 className="title-text">HandCrafted Art Decorations</h1>
          <button className="expandBtn ms-2" onClick={handleExpand}>
            View {expand ? "Less" : "More"}
            <i className={`bx bx-chevron-${expand ? "down" : "up"}`} />
          </button>
        </div>

        <Row xs={2} md={2} lg={3} className="items-cards mt-3">
          {STORE.handCrafted
            .slice(0, expand ? STORE.handCrafted.length : 3)
            .map((curr: StoreItemProps, idx: number) => (
              <Col key={idx}>
                <StoreItemCard {...curr} store={STORE.handCrafted} />
              </Col>
            ))}
        </Row>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
