import { useRef, useState } from "react";
import Footer from "../../../components/general/Footer/Footer";
import ArtCraftNavbar from "../../../components/shop/ArtCraftNavbar/ArtCraftNavbar";
import { useAdminContext } from "../../../contexts/AdminContext";
import { useStoreContext } from "../../../contexts/StoreContext";
import ErrorModal from "../../../modals/Error";
import MailSuccess from "../../../modals/MailSuccess";
import Spinner from "../../../utilities/Spinner";
import "./Contact.css";

const ContactUs = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Initiate Refs
  const footerRef = useRef<null | HTMLFormElement>(null);
  const checkRef = useRef<null | HTMLInputElement>(null);

  const firstNameRef = useRef<null | HTMLInputElement>(null);
  const lastNameRef = useRef<null | HTMLInputElement>(null);
  const emailRef = useRef<null | HTMLInputElement>(null);
  const phoneNumberRef = useRef<null | HTMLInputElement>(null);
  const messageRef = useRef<null | HTMLTextAreaElement>(null);

  const { isMailSuccess, setIsMailSuccess } = useStoreContext();
  const { token } = useAdminContext();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("apiKey", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      emailAddress: emailRef.current?.value,
      phoneNumber: phoneNumberRef.current?.value,
      message: messageRef.current?.value,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    if (
      firstNameRef.current?.value &&
      lastNameRef.current?.value &&
      emailRef.current?.value &&
      phoneNumberRef.current?.value &&
      messageRef.current?.value &&
      isChecked
    ) {
      await fetch(
        `${import.meta.env.VITE_BASEURL}/api/v1/contact/add`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.responseDto.code === "dkss") {
            setIsLoading(false);
            footerRef.current?.reset();
            setIsChecked(false);
            setIsMailSuccess(true);
          } else {
            setIsLoading(false);
            setIsMailSuccess(false);
            setError(result.responseDto.message);
          }
        })
        .catch(() => {
          setIsLoading(false);
          setIsMailSuccess(false);
          setError("Cannot connect to server");
        });
    }
  }

  return (
    <div>
      <ArtCraftNavbar activeLink="" />

      <section className="contact-us-container">
        <h5>Contact us</h5>
        <h1>Get in touch</h1>
        <p>
          We'd love to hear how we can leverage the internet to solving your
          problems. Please fill out this form.
        </p>

        <form ref={footerRef} id="contact-us-form" onSubmit={handleSubmit}>
          <div className="contact-us-group">
            <div>
              <label htmlFor="contact-us-firstname">First name</label>
              <input
                ref={firstNameRef}
                type="text"
                id="contact-us-firstname"
                placeholder="First Name"
                required
              />
            </div>

            <div>
              <label htmlFor="contact-us-lastname">Last name</label>
              <input
                ref={lastNameRef}
                type="text"
                name="LastName"
                id="contact-us-lastname"
                placeholder="Last Name"
                required
              />
            </div>
          </div>

          <div className="contact-us-email">
            <label htmlFor="contact-us-email">Email</label>
            <input
              ref={emailRef}
              type="email"
              placeholder="you@company.com"
              name="ContactUsEmail"
              id="contact-us-email"
              required
            />
          </div>

          <div className="contact-us-email">
            <label htmlFor="contact-us-phone-number">Phone number</label>
            <input
              ref={phoneNumberRef}
              type="number"
              placeholder="0801 234 5678"
              name="ContactUsPhoneNumber"
              id="contact-us-phone-number"
              required
              title="Please enter a valid phone number"
            />
          </div>

          <div className="contact-us-message-group">
            <label>Message</label>
            <textarea
              ref={messageRef}
              placeholder="Enter message"
              name="contactMessage"
              id="contact-us-textarea"
              required
              title="Enter your message"
            />
          </div>

          <div className="contact-us-check-group">
            <input
              ref={checkRef}
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked((prev) => !prev)}
              required
              title="This field must be checked before submitting the form"
            />
            <h3>You agree to our friendly privacy policy.</h3>
          </div>

          <button
            disabled={!isChecked ? true : false}
            style={{
              cursor: !isChecked ? "not-allowed" : "pointer",
              backgroundColor: isChecked ? "var(--pink)" : "gray",
              border: isChecked ? "1px solid var(--pink)" : "1px solid gray",
            }}
          >
            Send message
          </button>
        </form>
      </section>

      <Footer />

      {isMailSuccess && <MailSuccess />}
      {error && <ErrorModal errorMsg={error} callbackFunction={setError} />}
      {IsLoading && <Spinner animationType="grow" />}
    </div>
  );
};

export default ContactUs;
