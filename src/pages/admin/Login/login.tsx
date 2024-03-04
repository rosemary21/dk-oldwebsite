import { useRef, useState } from "react";
import Spinner from "../../../utilities/Spinner";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useAdminContext } from "../../../contexts/AdminContext";
import AdminLoginError from "../../../modals/AdminLoginError";
import { loginStatesProp } from "../../../types/contexts";

interface handleSubmitProps {
  loginStates: loginStatesProp;
  setLoginStates: React.Dispatch<React.SetStateAction<loginStatesProp>>;
}


export default function Login({ setLoginStates, loginStates }: handleSubmitProps) {
  // ** State to store input type for password
  const [inputType, setInputType] = useState("password");
  const [error, setError] = useState("");

  // State for login progress spinner
  const [isLoading, setIsLoading] = useState(false);

  // ** useNavigate from react router
  const navigate = useNavigate();

  // ** Welcome context values
  const { setToken } = useAdminContext();

  // ** Create refs
  const formRefer = useRef<null | HTMLFormElement>(null);
  const emailRefer = useRef<null | HTMLInputElement>(null);
  const passwordRefer = useRef<null | HTMLInputElement>(null);

  // ** Change input type for password
  function changeInputType() {
    if (inputType === "password" && passwordRefer.current?.value !== "") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  }

  // ** Submit Form handler
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // setIsLoading(true)
    const url = `${import.meta.env.VITE_BASEURL}/api/v1/login/staff`;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      userName: emailRefer.current?.value,
      password: passwordRefer.current?.value,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();

    try {
      if (data.responseDto.code === "dkss") {
        console.log(data.token);
        setLoginStates((prev) => {
          return {
            ...prev,
            isLoginFailed: false,
            isLoginSuccessful: true,
            user: data.emailAddress,
          };
        });
        setIsLoading(false);
        setToken(data.token);
        navigate("/admin-dashboard");
      } else {
        setIsLoading(false);
        setError(data.responseDto.message);
        setLoginStates((prev) => {
          return {
            ...prev,
            isLoginFailed: true,
            isLoginSuccessful: false,
            user: "",
          };
        });
      }
    } catch (error) {
      setIsLoading(false);
      setError("Cannot connect to server");
    }
  }

  return (
    <>
      <div className="admin-login-wrapper">
        <img src="/images/logo.png" alt="logo" />
        <h1>Admin Dashboard</h1>
        <p>
          We'd love to hear how we can leverage the internet to solving your
          problems. Please fill out this form.
        </p>

        <div className="admin-login-form-container">
          <p>Login</p>
          <hr className="admin-login-form-line" />

          <p className="p-text">Log in with your Email and password</p>

          <form
            ref={formRefer}
            className="admin-login-form"
            onSubmit={handleSubmit}
          >
            <input
              ref={emailRefer}
              type="email"
              placeholder="Email"
              name="email"
              required
            />

            <div className="input-group">
              <input
                ref={passwordRefer}
                type={inputType}
                placeholder="Password"
                required
              />
              <p onClick={changeInputType}>
                {inputType === "password" ? "show" : "hide"}
              </p>
            </div>
            <button className="ca-btn">LOGIN</button>
          </form>
        </div>
      </div>

      {loginStates.isLoginFailed && <AdminLoginError loginError={error} />}
      {isLoading && Spinner({ animationType: "grow" })}
    </>
  );
}
