import formatCurrency from "../../../utilities/FormatCurrency";
import "./CompleteReceiptCard.css";

interface CompleteReceiptCardProps {
  isRejected: boolean;
  reason: string;
}

export default function CompleteReceiptCard({
  isRejected,
  reason,
}: CompleteReceiptCardProps) {
  const receiptStatusStyle = {
    background: isRejected ? "#ffebeb" : "#EBFFF1",
    color: isRejected ? "red" : "#119C2B",
  };
  return (
    <div className="receipt_container">
      <div className="receipt_up">
        <img src="/images/Property/apartment1.png" alt="apartment1" />
        <div className="property_details">
          <div>
            <p className="receipt_property_title">Property Name</p>
            <h3 className="receipt_property_name">3 Bedroom Apartment</h3>
          </div>

          <div>
            <p className="receipt_property_title">Amount</p>
            <h3 className="receipt_property_name">{formatCurrency(1200000)}</h3>
          </div>
        </div>
      </div>

      <div className="receipt_down">
        <div className="receipt_customer_details">
          <img src="/images/Admin/user.png" alt="customer" />
          <div>
            <p className="receipt_customer_name">Ebiwari Meshach</p>
            <p className="receipt_customer_phone">+2349068657281</p>
          </div>
        </div>
        <div className="receipt_status_completed" style={receiptStatusStyle}>
          <i className={`bx bx-${isRejected ? "x" : "check"}`}></i>
          {isRejected ? "Rejected" : "Completed"}
        </div>
      </div>

      <p
        className="rejection_reason"
        style={{ display: isRejected ? "block" : "none" }}
      >
        {isRejected && reason}
      </p>
    </div>
  );
}
