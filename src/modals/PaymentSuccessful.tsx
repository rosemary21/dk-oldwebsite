import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useStoreContext } from "../contexts/StoreContext";
import { StoreItemProps } from "../types/contexts";
import "./Modals.css";

interface DataResponse {
  responseDto: {
    code: string;
    message: string;
  };
}

export default function PaymentSuccessful() {
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useSearchParams();
  const [error, setError] = useState("");

  const reference = queryParams.get("reference");

  // Context
  const {
    userToken,
    userName,
    totalOrderPrice,
    setSelectedItem,
    setCartItems,
  } = useStoreContext();
  // const {  } = useAdminContext();

  // Handler to add transaction. (Save transaction to backend)
  async function handleAddTransaction() {
    const myHeaders = new Headers();
    myHeaders.append("apikey", userToken);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      currency: "NGN",
      userName,
      reference,
      descriptionCode: [
        {
          productDescriptionCode: "prodesc",
          productCategoryCode: "prodCode",
          productCode: "prodCode",
          productDescription: "prodsecrip",
          amount: totalOrderPrice,
          currency: "NGN",
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch(
      `${import.meta.env.VITE_BASEURL}/api/v1/transaction/add`,
      requestOptions
    );
    if (!response) throw new Error("Cannot connect to server");
    const data: DataResponse = await response.json();

    // If request was successful
    if (data.responseDto.code == "dkss") {
      // Set queryParams to empty stringify
      setQueryParams({ reference: "" });
      // Empty the cart
      setSelectedItem({} as StoreItemProps);
      setCartItems([]);
      // Route to fashion
      navigate("/");
    } else {
      setError(data.responseDto.message);
    }
  }

  // function closeModal(e: React.MouseEvent<HTMLDivElement>) {
  //     const target = e.target as HTMLDivElement;
  //   if (
  //     !target.classList.contains("modal-card") &&
  //     !target.classList.contains("modal-card-header") &&
  //     !target.classList.contains("modal-card-icon") &&
  //     !target.classList.contains("modal-card-subtitle")
  //   ) {
  //     return setIsPaymentSuccess(false);
  //   } else {
  //     return setIsPaymentSuccess(true);
  //   }
  // }

  return (
    <div className="modal-page-container">
      <div className="modal-card shadow-sm">
        <h2 className="modal-card-header">Payment Successful</h2>
        <i className="bx bx-check-circle modal-card-icon" />
        <p className="modal-card-subtitle">
          Congratulations!!!!! Your payment for the items was successful. Your
          reference number is <span>{reference}</span>.<br /> Our Legal team
          will get back to you shortly.
        </p>
        {error && (
          <div>
            <hr
              style={{
                backgroundColor: "gray",
                width: "100%",
                height: "2px",
                borderRadius: "4px",
                marginBottom: "1rem",
              }}
            />
            <span style={{ color: "red", fontSize: "12px" }}>{error}</span>
          </div>
        )}
        <button onClick={handleAddTransaction}>Done</button>
      </div>
    </div>
  );
}
