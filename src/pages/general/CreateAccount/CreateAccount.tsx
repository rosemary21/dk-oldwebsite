import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/general/Footer/Footer";
import CreateAccountForm from "../../../components/general/LoginForm/CreateAccountForm";
import ArtCraftNavbar from "../../../components/shop/ArtCraftNavbar/ArtCraftNavbar";
import { useStoreContext } from "../../../contexts/StoreContext";
import ErrorModal from "../../../modals/Error";
import { UserLoginResponseProps } from "../../../types/Store";
import Spinner from "../../../utilities/Spinner";
import "./CreateAccount.css";

const CreateAccount = () => {
  const [inputType, setInputType] = useState("password");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Navigate function
  const navigate = useNavigate();

  const signInFormRef = useRef<null | HTMLFormElement>(null);
  const passwordReferLogin = useRef<null | HTMLInputElement>(null);
  const usernameRef = useRef<null | HTMLInputElement>(null);

  // Context
  const {
    setUserName,
    setUserToken,
    unboardStore,
    activeSignInTab,
    setActiveSignInTab,
  } = useStoreContext();

  // Change password to text
  function changeInputType() {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  }

  // Handle login customer
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

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
      setIsLoading(false);
      setUserToken(data.token);
      setUserName(data.emailAddress);
      signInFormRef.current?.reset();
      if (unboardStore) navigate(`/${unboardStore}`);
      navigate("/art-craft");
    } else {
      setIsLoading(false);
      setError(data.responseDto.message);
    }
  };

  return (
    <div>
      <ArtCraftNavbar activeLink="" />
      <section>
        <h2 className="create-account-welcome">Welcome Back</h2>
      </section>

      <div className="create-account-container">
        <section className="create-account">
          <h1
            className={activeSignInTab === "sign-in" ? "active-account" : ""}
            onClick={() => setActiveSignInTab("sign-in")}
          >
            Sign In
          </h1>
          <h1
            className={activeSignInTab === "register" ? "active-account" : ""}
            onClick={() => setActiveSignInTab("register")}
          >
            Register
          </h1>
        </section>

        <div
          style={{ display: activeSignInTab === "sign-in" ? "block" : "none" }}
        >
          <p className="ca-sign-in">Sign in with your Email and password</p>
          <div>
            <form
              className="create-account-form"
              ref={signInFormRef}
              onSubmit={handleSignIn}
            >
              <input
                type="text"
                placeholder="Username"
                className="username-field"
                ref={usernameRef}
              />
              <div className="input-group">
                <input
                  ref={passwordReferLogin}
                  type={inputType}
                  placeholder="Password"
                />
                <p className="show-password" onClick={changeInputType}>
                  {inputType === "password" ? "show" : "hide"}
                </p>
              </div>
              <h2 className="password-forgotPassword">Forgot password?</h2>
              <button className="ca-btn">SIGN IN</button>
            </form>
          </div>
        </div>

        <div
          style={{ display: activeSignInTab === "register" ? "block" : "none" }}
        >
          <p className="ca-sign-in">Create an account</p>
          <CreateAccountForm />
        </div>
      </div>

      <Footer />

      {error && <ErrorModal errorMsg={error} callbackFunction={setError} />}
      {isLoading && <Spinner animationType="grow" />}
    </div>
  );
};

export default CreateAccount;
