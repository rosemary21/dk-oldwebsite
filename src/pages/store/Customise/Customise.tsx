import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Customise.css";
import FashionNavbar from "../../../components/shop/FashionNavbar/FashionNavbar";
import Footer from "../../../components/general/Footer/Footer";

export default function Customise() {
  const [category, setCategory] = useState("joggers");
  const [size, setSize] = useState(36);
  const [color, setColor] = useState("color1");


  const navigate = useNavigate();

  function handleCheckOut() {
    navigate("/checkout");
  }

  function chosenColor() {
    if (color === "color1") {
      return "#000";
    } else if (color === "color2") {
      return "#E80E0F";
    } else if (color === "color3") {
      return "#FBB040";
    } else if (color === "color4") {
      return "#F3C59C";
    } else if (color === "color5") {
      return "#44B0FF";
    } else if (color === "color6") {
      return "#D868FF";
    }
  }

  const chosenColorBg = {
    backgroundColor: chosenColor(),
    color: (color === "color1") || (color === "color2") ? "#fff" : "#000",
  };

  return (
    <div>
      <FashionNavbar activeLink="customise" />

      <section>
        <div className="customise-top">
          <p>Customise</p>
          <button onClick={handleCheckOut}>Move to CheckOut</button>
        </div>

        <div className="customise-container">
          <div className="customise-left">
            <div className="customise-category-card">
              <h3>Category</h3>
              <p
                onClick={() => setCategory("tshirt")}
                className={category === "tshirt" ? "active-category-card" : ""}
              >
                Tshirt
              </p>
              <p
                onClick={() => setCategory("joggers")}
                className={category === "joggers" ? "active-category-card" : ""}
              >
                Joggers
              </p>
              <p
                onClick={() => setCategory("sleeves")}
                className={category === "sleeves" ? "active-category-card" : ""}
              >
                Sleeves
              </p>
            </div>

            <div className="customise-size-card">
              <h3>Size</h3>
              <div>
                <span
                  onClick={() => setSize(34)}
                  className={size === 34 ? "active" : ""}
                >
                  34
                </span>
                <span
                  onClick={() => setSize(36)}
                  className={size === 36 ? "active" : ""}
                >
                  36
                </span>
                <span
                  onClick={() => setSize(38)}
                  className={size === 38 ? "active" : ""}
                >
                  38
                </span>
                <span
                  onClick={() => setSize(40)}
                  className={size === 40 ? "active" : ""}
                >
                  40
                </span>
                <span
                  onClick={() => setSize(42)}
                  className={size === 42 ? "active" : ""}
                >
                  42
                </span>
                <span
                  onClick={() => setSize(44)}
                  className={size === 44 ? "active" : ""}
                >
                  44
                </span>
              </div>
            </div>

            <div className="customise-color-card">
              <div className="customise-title">
                <h3>Color</h3>
                <span className="chosen-color" style={chosenColorBg}>
                  {chosenColor()}
                </span>
              </div>

              <div className="color-group">
                <span
                  onClick={() => setColor("color1")}
                  className={color === "color1" ? "active color1" : "color1"}
                ></span>
                <span
                  onClick={() => setColor("color2")}
                  className={color === "color2" ? "active color2" : "color2"}
                ></span>
                <span
                  onClick={() => setColor("color3")}
                  className={color === "color3" ? "active color3" : "color3"}
                ></span>
                <span
                  onClick={() => setColor("color4")}
                  className={color === "color4" ? "active color4" : "color4"}
                ></span>
                <span
                  onClick={() => setColor("color5")}
                  className={color === "color5" ? "active color5" : "color5"}
                ></span>
                <span
                  onClick={() => setColor("color6")}
                  className={color === "color1" ? "active color6" : "color6"}
                ></span>
              </div>
            </div>
          </div>
          <div className="customise-right">
            <img src="/images/box-2-bg.png" alt="item-img" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}