import { Col, Row } from "react-bootstrap";
import Data from "../../../Data.json";
import Footer from "../../../components/general/Footer/Footer";
import ArtCraftCategories from "../../../components/shop/ArtCraftCategories/ArtCraftCategories";
import ArtCraftNavbar from "../../../components/shop/ArtCraftNavbar/ArtCraftNavbar";
import StoreItemCard from "../../../components/shop/StoreItemCard/StoreItemCard";
import "../ArtCraft/ArtCraft.css";


export default function WallPainting() {
  const STORE = Data.artCraftPage.artCraftStore;

  return (
    <div>
      <ArtCraftNavbar activeLink="wall painting" />

      {/* MAIN */}
      <main className="artCraft-main" id="main">
        <div className="art-main-left">
          <h1>
            Find the best High
            <br /> Quality outfit in one tap
          </h1>

          <span>
            We have a wide range of products that serves various Demographic
            <br /> groups and markets. Our product Range are Trendy and always
            On point
          </span>

          <form id="art-work-search-form" className="rounded">
            <div>
              <i className="bx bx-search form-search-icon" />
              <input
                type="text"
                placeholder="Try joggers, Polo, T-shirts etc..."
                className="art-work-search-input"
              />
            </div>
            <button>SEARCH NOW</button>
          </form>
        </div>

        <div className="art-main-right">
          <div className="art-main-right-img">
            <img src="/images/beetle-king.png" alt="beetle-img" />
          </div>
          <h2>Beetle King Art Work</h2>
          <span>
            Lorem ipsum dolor sit amet, consectetur
            <br />
            adipiscing elit. Erat eget etiam.
          </span>
          <button>Buy Now</button>
        </div>
      </main>

      {/* CATEGORIES */}
      <ArtCraftCategories />

      {/* NEW TO ART GALLERY ====> ??? */}
      <section id="wall-painting">
        <h1 className="artCategoriesTitle">NEW ART TO THE GALLERY</h1>

        <Row xs={2} md={2} lg={3} className="items-cards mt-3">
          {STORE.wallPainting.map((curr, idx) => (
            <Col key={idx}>
              <StoreItemCard {...curr} store={STORE.wallPainting} />
            </Col>
          ))}
        </Row>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
