/* eslint-disable no-constant-condition */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Footer from "../../../components/general/Footer/Footer";
import ApartmentsMain from "../../../components/property/ApartmentsMain/ApartmentsMain";
import Pagination from "../../../components/property/Pagination/Pagination";
import PropertyBox from "../../../components/property/PropertyBox/PropertyBox";
import { useAdminContext } from "../../../contexts/AdminContext";
import { usePropertyContext } from "../../../contexts/PropertyContext";
import {
  PropertyResponseProps,
  TotalNoOfPropertiesResponseProps,
} from "../../../types/Properties";
import "../Apaprtments/Apartments.css";
import ErrorModal from "../../../modals/Error";
import NoPropertyAlert from "../../../components/property/NoPropertyAlert/NoPropertyAlert";
import { useNavigate } from "react-router-dom";

export default function Lands() {
  const [PropertiesArr, setPropertiesArr] = useState<PropertyResponseProps[]>(
    []
  );

  const navigate = useNavigate()

  const [error, setError] = useState("");

  const { token } = useAdminContext();
  const { state, currentPage, propertyPrice, setUnboardingFrom } =
    usePropertyContext();

  async function getLandProperties() {
    const myHeaders = new Headers();
    myHeaders.append("apiKey", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      location: state,
      prices: propertyPrice,
      property: "PROLAN",
      pageSize: 10,
      pageNo: currentPage - 1,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(
      `${import.meta.env.VITE_BASEURL}/api/v1/productdescription/search`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result: TotalNoOfPropertiesResponseProps) => {
        if (result.responseDto.code == "dkss") {
          setPropertiesArr(result.productDescriptionDtoList);
        } else {
          setError(result.responseDto.message);
        }
      })
      .catch(() => setError("Cannot connect to server"));
  }

  useEffect(() => {
    getLandProperties();
  }, [state, propertyPrice]);

  useEffect(() => {
    setUnboardingFrom("Lands");
  }, []);

  return (
    <div>
      <ApartmentsMain activeNavLink="lands" />

      <section>
        <hr className="property-break" />

        <div className="property-group">
          {PropertiesArr.length ? (
            PropertiesArr.map((item) => (
              <PropertyBox key={item.id} item={item} />
            ))
          ) : (
            <NoPropertyAlert />
          )}
        </div>

        <Pagination totalPost={PropertiesArr.length} />

        <div className="user-preference-ad">
          <div className="user-pref-left">
            <div className="property-box user-pref-left-box">
              <div className="property-box-feature">
                {20 ? <p>3D</p> : null}
              </div>
            </div>
          </div>

          <div className="user-pref-right">
            <h2>Not found what you are looking for?</h2>
            <p>
              Let us know your preference and our business team will reach out
              to you with what matches your request.
            </p>
            <button onClick={()=>navigate("/contact-us")}>
              Tell Us <i className="bx bx-right-arrow-alt" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {error && <ErrorModal errorMsg={error} callbackFunction={setError} />}
    </div>
  );
}
