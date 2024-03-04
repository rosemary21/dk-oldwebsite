import { useRef, useState } from "react"
import "../../../pages/general/CreateAccount/CreateAccount.css"
import "./Signup.css"
import ErrorModal from "../../../modals/Error";
import Spinner from "../../../utilities/Spinner";
import { useStoreContext } from "../../../contexts/StoreContext";
import { useAdminContext } from "../../../contexts/AdminContext";


const validations = {
  pwd: "Password must contain at least one uppercase letter, lowercase letter, one number and 8 or more characters",
  confirmPwd: "This field must be exact characters as your password field",
};

export default function CreateAccountForm() {
  const [confirmPwdValid, setConfirmPwdValid] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //   Context
  const { unboardStore, setActiveSignInTab } = useStoreContext();
  const { token } = useAdminContext();

  // Initiate Refs
  const firstNameRefer = useRef<null | HTMLInputElement>(null);
  const lastNameRefer = useRef<null | HTMLInputElement>(null);
  const emailRefer = useRef<null | HTMLInputElement>(null);
  const phoneNumberRefer = useRef<null | HTMLInputElement>(null);
  const userNameRefer = useRef<null | HTMLInputElement>(null);
  const passwordRefer = useRef<null | HTMLInputElement>(null);
  const confirmPasswordRefer = useRef<null | HTMLInputElement>(null);

  // Logic for password validation
  const letterRef = useRef<null | HTMLParagraphElement>(null);
  const capitalRef = useRef<null | HTMLParagraphElement>(null);
  const numberRef = useRef<null | HTMLParagraphElement>(null);
  const lengthRef = useRef<null | HTMLParagraphElement>(null);
  const formRef = useRef<null | HTMLFormElement>(null);

  // When the user clicks on the password field, show the message box
  const passwordMsg = document.getElementById(
    "passwordMessage"
  ) as HTMLDivElement;

  function handlePasswordFocus() {
    passwordMsg.style.display = "block";
  }

  // When the user clicks outside of the password field, hide the message box
  function handlePasswordBlur() {
    passwordMsg.style.display = "none";
  }

  // When the user starts to type something inside the password field
  function hanldePasswordKeyUp() {
    // Validate lowercase letters
    const lowerCaseLetters = /[a-z]/g;
    if (passwordRefer.current?.value.match(lowerCaseLetters)) {
      letterRef.current?.classList.remove("invalid");
      letterRef.current?.classList.add("valid");
    } else {
      letterRef.current?.classList.remove("valid");
      letterRef.current?.classList.add("invalid");
    }

    // Validate capital letters
    const upperCaseLetters = /[A-Z]/g;
    if (passwordRefer.current?.value.match(upperCaseLetters)) {
      capitalRef.current?.classList.remove("invalid");
      capitalRef.current?.classList.add("valid");
    } else {
      capitalRef.current?.classList.remove("valid");
      capitalRef.current?.classList.add("invalid");
    }

    // Validate numbers
    const numbers = /[0-9]/g;
    if (passwordRefer.current?.value.match(numbers)) {
      numberRef.current?.classList.remove("invalid");
      numberRef.current?.classList.add("valid");
    } else {
      numberRef.current?.classList.remove("valid");
      numberRef.current?.classList.add("invalid");
    }

    // Validate length
    if (
      passwordRefer.current?.value.length &&
      passwordRefer.current?.value.length >= 8
    ) {
      lengthRef.current?.classList.remove("invalid");
      lengthRef.current?.classList.add("valid");
    } else {
      lengthRef.current?.classList.remove("valid");
      lengthRef.current?.classList.add("invalid");
    }
  }

  // Verify that confirm password matches with password
  function verifyPassword() {
    if (confirmPasswordRefer.current?.value === passwordRefer.current?.value) {
      setConfirmPwdValid("Password Match");
      return confirmPasswordRefer.current?.value;
    } else {
      return null;
    }
  }

  // Verify that confirm password matches with password
  function verifyPwdInputKeyUp() {
    if (
      confirmPasswordRefer.current?.value &&
      confirmPasswordRefer.current?.value === passwordRefer.current?.value
    ) {
      setConfirmPwdValid("Password Match");
      return;
    } else if (
      !confirmPasswordRefer.current?.value &&
      confirmPasswordRefer.current?.value === passwordRefer.current?.value
    ) {
      setConfirmPwdValid("");
      return;
    } else {
      setConfirmPwdValid("Password doesn't Match");
      return;
    }
  }

  function verifyPwdInputBlur() {
    if (confirmPasswordRefer.current?.value === passwordRefer.current?.value) {
      setConfirmPwdValid("");
      return;
    } else {
      setConfirmPwdValid("Password doesn't Match");
      return;
    }
  }

  // handler to sign up user and add user to admin customer
  async function handleSignUpUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("apiKey", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      firstName: firstNameRefer.current?.value,
      lastName: lastNameRefer.current?.value,
      email: emailRefer.current?.value,
      phoneNumber: phoneNumberRefer.current?.value,
      userType: unboardStore,
      userName: userNameRefer.current?.value,
      password: passwordRefer.current?.value,
      confirmPassword: verifyPassword(),
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    if (verifyPassword()) {
      await fetch(
        `${import.meta.env.VITE_BASEURL}/api/v1/user/add`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.responseDto.code === "dkss") {
            setIsLoading(false);
            formRef.current?.reset();
            setActiveSignInTab("sign-in");
          } else {
            setIsLoading(false);
            setError(result.responseDto.message);
          }
        })
        .catch(() => {
          setIsLoading(false);
          setError("Cannot connect to server");
        });
    } else {
      setIsLoading(false);
      setError("Cannot send your data, check your details again");
    }
  }

  

  return (
    <div className="personal-details-card">
      <form
        ref={formRef}
        className="register-account-form create-account-form"
        onSubmit={handleSignUpUser}
      >
        <input
          ref={firstNameRefer}
          type="text"
          placeholder="First Name"
          name="First Name"
          required
          style={{ marginTop: "17px" }}
        />

        <input
          ref={lastNameRefer}
          type="text"
          placeholder="Last Name"
          name="Last Name"
          required
        />

        <input
          ref={emailRefer}
          type="email"
          placeholder="Email"
          name="Email"
          required
        />

        <input
          ref={phoneNumberRefer}
          type="number"
          placeholder="Phone Number"
          name="Phone Number"
          required
        />

        <input
          ref={userNameRefer}
          type="text"
          placeholder="Add User Name"
          name="User Name"
          required
        />

        <input
          ref={passwordRefer}
          type="password"
          id="pwd_input"
          placeholder="Enter Password"
          name="Password"
          required
          onFocus={handlePasswordFocus}
          onBlur={handlePasswordBlur}
          onKeyUp={hanldePasswordKeyUp}
          pattern={import.meta.env.VITE_PASSWORD_REGEX}
          title={validations.pwd}
        />

        <input
          ref={confirmPasswordRefer}
          type="password"
          placeholder="Confirm Password"
          name="Confirm Password"
          required
          onKeyUp={verifyPwdInputKeyUp}
          onBlur={verifyPwdInputBlur}
          title={validations.confirmPwd}
        />
        <small
          style={{
            fontSize: "10px",
            fontWeight: "500",
            color:
              confirmPwdValid === "Password Match" ? "green" : "var(--pink)",
          }}
        >
          {confirmPwdValid}
        </small>

        <button type="submit" className="submit-form">
          Sign Up
        </button>
      </form>

      <div id="passwordMessage">
        <h3>Password must contain the following:</h3>
        <p ref={letterRef} className="invalid">
          A <b>lowercase</b> letter
        </p>
        <p ref={capitalRef} className="invalid">
          A <b>capital (uppercase)</b> letter
        </p>
        <p ref={numberRef} className="invalid">
          A <b>number</b>
        </p>
        <p ref={lengthRef} className="invalid">
          Minimum <b>8 characters</b>
        </p>
      </div>

      {error && <ErrorModal errorMsg={error} callbackFunction={setError} />}
      {isLoading && <Spinner animationType="grow" />}
    </div>
  );
}
