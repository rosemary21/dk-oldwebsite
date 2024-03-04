import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/general/Footer/Footer";
import FashionNavbar from "../../../components/shop/FashionNavbar/FashionNavbar";
import OrderList from "../../../components/shop/OrderList/OrderList";
import { usePropertyContext } from "../../../contexts/PropertyContext";
import { useStoreContext } from "../../../contexts/StoreContext";
import ErrorModal from "../../../modals/Error";
import { checkoutResponse } from "../../../types/Properties";
import allbrands from "../../../utilities/Allbrands";
import formatCurrency from "../../../utilities/FormatCurrency";
import mobileView from "../../../utilities/mobileView";
import "./Order.css";

export default function Orders() {
  const [error, setError] = useState("");
  const { cartItems, cartQty, userToken, setActiveTab, setTotalOrderPrice } =
    useStoreContext();
  const { setCheckOut } = usePropertyContext();

  const totalAmount = cartItems.reduce((tot, cartItem) => {
    const item = allbrands.find((item) => item.id === cartItem.id);
    return tot + (item?.price || 0) * cartItem.qty;
  }, 0);

  setTotalOrderPrice(totalAmount);

  const navigate = useNavigate();
  const EmptyOrder =
    "No orders have been made yet, continue shopping to add orders";

  // Move to checkout
  async function checkout() {
    const myHeaders = new Headers();
    myHeaders.append("apiKey", userToken);
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

    if (cartQty === 0) return;
    if (userToken !== "") {
      const res = await fetch(
        `${import.meta.env.VITE_BASEURL}/api/v1/delivery/checkout`,
        requestOptions
      );
      if (!res) setError("Cannot connect to server");
      const data: checkoutResponse = await res.json();

      if (data.code == "cv401") {
        navigate("/checkout");
        setActiveTab("sign-in");
      } else if (data.responseDto.code == "dkss") {
        setCheckOut(data);
        navigate("/checkout");
        setActiveTab("billing-details");
      } else {
        setError(data.responseDto.message);
      }
    } else {
      navigate("/checkout");
      setActiveTab("sign-in");
    }
  }

  return (
    <div>
      <FashionNavbar activeLink="" />

      <section
        className="checkout-top d-flex align-items-center justify-content-between"
        style={{ paddingTop: "3.5rem" }}
      >
        <div style={{ fontSize: "22px", cursor: "pointer" }}>
          <i
            className={`bx bx-chevron-left bx-${mobileView() ? "sm" : "md"}`}
          />
        </div>
        <h3 className="text-center" style={{ color: "#E80E0F" }}>
          Orders
        </h3>
        <span></span>
      </section>

      <section>
        {cartQty === 0 ? (
          <h2 className="text-center text-muted fs-4">{EmptyOrder}</h2>
        ) : (
          <div>
            {cartItems?.map((order) =>
              order.qty > 0 ? <OrderList key={order.id} {...order} /> : null
            )}
          </div>
        )}
      </section>

      {/* TOTALS */}
      <section>
        <div className="total-container">
          <div>
            <p>Subtotal</p>
            <p>{formatCurrency(24000)}</p>
          </div>

          <div>
            <p>Delivery Information</p>
            <p>----</p>
          </div>

          <div>
            <h2>Total</h2>
            <h2>{formatCurrency(totalAmount)}</h2>
          </div>

          <button className="continue_transaction" onClick={checkout}>
            Continue
          </button>
        </div>
      </section>

      <Footer />

      {error && <ErrorModal errorMsg={error} callbackFunction={setError} />}
    </div>
  );
}
