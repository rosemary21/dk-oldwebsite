import { FormEvent, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CheckOutCard from "../../../components/general/CheckoutCard/CheckOutCard";
import Footer from "../../../components/general/Footer/Footer";
import ArtCraftNavbar from "../../../components/shop/ArtCraftNavbar/ArtCraftNavbar";
import { useStoreContext } from "../../../contexts/StoreContext";
import ErrorModal from "../../../modals/Error";
import {
  InitialiseCardResponse,
  UserLoginResponseProps,
} from "../../../types/Store";
import { NigeriaStates, NigeriaZipCodes } from "../../../utilities/Nigeria";
import Spinner from "../../../utilities/Spinner";
import "./Checkout.css";

const Checkout = () => {
  const [error, setError] = useState("");
  const [showFrame, setShowFrame] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("");

  console.log(useParams());

  const {
    activeTab,
    setActiveTab,
    totalOrderPrice,
    userToken,
    userName,
    setUserToken,
    setUserName,
    setInitialiseCardStates,
    initialiseCardStates,
    setActiveSignInTab,
  } = useStoreContext();

  const emailRef = useRef<null | HTMLInputElement>(null);
  const usernameRef = useRef<null | HTMLInputElement>(null);
  const passwordReferLogin = useRef<null | HTMLInputElement>(null);
  const signInFormRef = useRef<null | HTMLFormElement>(null);

  const ZipCodeRef = useRef<null | HTMLInputElement>(null);
  const AddressRef = useRef<null | HTMLInputElement>(null);
  const CityRef = useRef<null | HTMLInputElement>(null);
  const UsernameRef = useRef<null | HTMLInputElement>(null);
  const LGARef = useRef<null | HTMLInputElement>(null);

  // Import useNavigate for routing
  const navigate = useNavigate();

  // Sign In handler
  async function handleSignInSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      userName: usernameRef.current?.value,
      password: passwordReferLogin.current?.value,
    });

    // userName: "chiomaiglds",
    // password: "chiomarose@123",

    // userName: "chukeluchioma555@yahoo.com",
    // password: "chiomarose@123",

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch(
      `${import.meta.env.VITE_BASEURL}/api/v1/login/customer`,
      requestOptions
    );

    if (!response) {
      setError("Cannot fetch response");
    }

    const data: UserLoginResponseProps = await response.json();

    if (data.responseDto.code == "dkss") {
      setLoading(false);
      setUserToken(data.token);
      setUserName(data.emailAddress);
      setActiveTab("delivery-details");
      signInFormRef.current?.reset();
    } else {
      setLoading(false);
      setError(data.responseDto.message);
    }
  }

  // Initialise card in paystack
  async function handleInitialiseCard(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("apiKey", userToken);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: emailRef.current?.value,
      amount: totalOrderPrice * 100,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch(
      `${import.meta.env.VITE_BASEURL}/api/v1/card/charge`,
      requestOptions
    );

    if (!response) {
      setError("Cannot connect to server");
    }

    const data: InitialiseCardResponse = await response.json();

    if (data.responseDto.code === "dkss") {
      const res = data.initializeTransactionResponse.data;
      
      setInitialiseCardStates((prev) => ({
        ...prev,
        reference: res.reference,
        access_code: res.access_code,
        authorization_url: res.authorization_url,
      }));
      setLoading(false);
      // window.open(initialiseCardStates.authorization_url, "_self");
      setShowFrame(true);
      console.log(res.authorization_url);
    } else {
      setLoading(false);
      setError(data.responseDto.message);
    }
  }

  // Route to sign up
  function signUp() {
    navigate("/create-account");
    setActiveSignInTab("register");
  }

  // Get Nigerian Zipcodes according to states
  const getZipCode = async () => {
    const index = await NigeriaStates.indexOf(state.toLowerCase());
    if (index !== -1 && ZipCodeRef.current) {
      ZipCodeRef.current.value = NigeriaZipCodes[index];
    }
  };

  return (
    <div>
      <ArtCraftNavbar activeLink="" />

      <section className="checkout-title">
        <div></div>
        <h1>Checkout</h1>
        <span></span>
      </section>

      {userName && (
        <p className="loggedUser">You are logged in as {userName}</p>
      )}

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
            <form
              ref={signInFormRef}
              className="checkout-left-form"
              onSubmit={handleSignInSubmit}
            >
              <input
                ref={usernameRef}
                type="text"
                placeholder="username"
                required
              />

              <input
                ref={passwordReferLogin}
                type="password"
                placeholder="Password"
                required
              />

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
              <input
                value={state}
                type="text"
                onChange={(e) => {
                  setState(e.target.value);
                  getZipCode();
                }}
                placeholder="State"
              />
              <input ref={ZipCodeRef} type="number" placeholder="Zip Code" />
              <input ref={AddressRef} type="text" placeholder="Address" />
              <input ref={CityRef} type="text" placeholder="City" />
              <input ref={UsernameRef} type="text" placeholder="Username" />
              <input ref={LGARef} type="text" placeholder="Local Government" />
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
              onSubmit={handleInitialiseCard}
            >
              <input
                type="email"
                ref={emailRef}
                placeholder="Card Holder's Email"
                required
              />

              <input
                type="number"
                defaultValue={totalOrderPrice}
                placeholder="Amount"
                required
              />
              {/* <button className="btn-submit">CONFIRM</button> */}
              <button type="submit" className="btn-submit btn-paypal">
                PayStack
              </button>
            </form>
          </div>
        </div>

        <div className="checkout-right">
          <CheckOutCard
            itemImg="/images/checkout-img.png"
            itemName="Squid Famous Art Design"
            itemCount={"1"}
            amount={24000}
            subTotal={4500}
            total={57000}
            deliveryInfo="---"
          />
        </div>
      </section>

      <Footer />

      {error && <ErrorModal errorMsg={error} callbackFunction={setError} />}
      {loading && <Spinner animationType="grow" />}
      {showFrame && (
        <div className="i_frame_modal">
          <iframe
            src={initialiseCardStates.authorization_url}
            title="Paystack"
            loading="lazy"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Checkout;
