import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../../general/Checkout/Checkout.css";
import ArtCraftNavbar from "../../../components/shop/ArtCraftNavbar/ArtCraftNavbar";
import CheckOutCard from "../../../components/general/CheckoutCard/CheckOutCard";
import { useStoreContext } from "../../../contexts/StoreContext";
import Footer from "../../../components/general/Footer/Footer";
import OrderSuccessful from "../../../modals/OrderSuccessful";
import { usePropertyContext } from "../../../contexts/PropertyContext";


const PropertyCheckout = () => {
  const { setIsOrderSuccess, isOrderSuccess, activeTab, setActiveTab } =
    useStoreContext();
    const {propertyItem, checkOut} = usePropertyContext();

  // Import useNavigate for routing
  const navigate = useNavigate();

  function handleSignInSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setActiveTab("delivery-details");
  }

  function handleSubmitCheckout(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsOrderSuccess(true);
  }

  function signUp() {
    navigate("/signup");
  }

  const doorDeliveryFee = Number(checkOut.deliverydto.feeDto.doorDeliveryFee);

  return (
    <div>
      <ArtCraftNavbar activeLink="" />

      <section className="checkout-title">
        <div></div>
        <h1>Checkout</h1>
        <span></span>
      </section>

      <section className="checkout-container">
        <div className="checkout-left">
          <h2
            className="payment-checkout-description"
            onClick={() => setActiveTab("sign-in")}
          >
            Sign In
          </h2>
          <div style={{ display: activeTab === "sign-in" ? "block" : "none" }}>
            <p className="checkout-left-signin mt-2">
              Sign in to proceed to payment.
            </p>
            <form className="checkout-left-form" onSubmit={handleSignInSubmit}>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <p className="password-forgotPassword">Forgot password ?</p>
              <button>CONTINUE</button>
            </form>
            <p className="payment-checkout-signUp mt-2">
              Don’t have an account, <span onClick={signUp}>SIGN UP</span>
            </p>
          </div>

          {/* ================ Delivery Details ================ */}

          <p
            onClick={() => setActiveTab("delivery-details")}
            className="payment-checkout-description"
          >
            Delivery Details
          </p>
          <div
            style={{
              display: activeTab === "delivery-details" ? "block" : "none",
            }}
          >
            <div className="delivery-details-input-group">
              <input type="text" name="First Name" placeholder="First Name" />
              <input type="text" name="Last Name" placeholder="Last Name" />
              <input type="text" name="Address" placeholder="Address" />
              <input type="number" name="Zip Code" placeholder="Zip Code" />
              <input type="text" name="State" placeholder="State" />
              <input type="text" name="City" placeholder="City" />
            </div>
            <div className="delivery-details-check">
              <input type="checkbox" />
              <p>Select as default Address (Optional)</p>
            </div>
          </div>

          {/* ================BILLING DETAILS================= */}

          <p
            onClick={() => setActiveTab("billing-details")}
            className="payment-checkout-description"
          >
            BILLING DETAILS
          </p>
          <div
            style={{
              display: activeTab === "billing-details" ? "block" : "none",
            }}
          >
            <form
              className="delivery-details-input-group"
              onSubmit={handleSubmitCheckout}
            >
              <input
                type="text"
                name="Card Holder's Name"
                placeholder="Card Holder's Name"
              />
              <input
                type="number"
                name="Card Number"
                placeholder="Card Number"
              />
              <input
                type="text"
                name="Valid Through"
                placeholder="Valid Through"
              />
              <input type="number" name="CVV" placeholder="CVV" />
              <button className="btn-submit">CONFIRM</button>
            </form>
            <button className="btn-submit btn-paypal">Paypal</button>
          </div>
        </div>

        <div className="checkout-right">
          <CheckOutCard
            itemImg={propertyItem.imageUrl}
            itemName={propertyItem.description}
            itemCount={`1`}
            amount={propertyItem.amount}
            subTotal={doorDeliveryFee}
            total={doorDeliveryFee + propertyItem.amount}
            deliveryInfo={checkOut.deliverydto.feeDto.deliveryPeriod + " days"}
          />
        </div>
      </section>

      <Footer />

      {isOrderSuccess && <OrderSuccessful />}
    </div>
  );
};

export default PropertyCheckout;