import formatCurrency from "../../../utilities/FormatCurrency";
import "./AcceptedPaymentsCard.css";

interface AcceptedPaymentsCardProp {
  price: number;
  apartment: string;
}

export default function AcceptedPaymentsCard({ price, apartment }: AcceptedPaymentsCardProp) {
  return (
    <div className="acceptedPayments">
      <img src="/images/Property/apartment1.png" alt="apartment" />
      <p className="accepted_apartments">{apartment}</p>
      <p className="accepted_price ms-1">{formatCurrency(price)}</p>
    </div>
  );
}
