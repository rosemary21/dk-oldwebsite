import formatCurrency from "../../../utilities/FormatCurrency"

interface CheckoutProps {
  itemImg: string;
  itemName: string;
  itemCount: string;
  amount: number;
  subTotal: number;
  total: number;
  deliveryInfo: string;
}

export default function CheckOutCard({
  itemImg,
  itemName,
  itemCount,
  amount,
  subTotal,
  total,
  deliveryInfo,
}: CheckoutProps) {
  return (
    <div>
      <div className="checkout-right-top">
        <img src={itemImg} alt={`${itemName}-img`} />
        <div className="checkout-item-name ms-2">
          <h2>{itemName}</h2>
          <p>QTY {itemCount}</p>
        </div>
        <p className="checkout-item-amount">{formatCurrency(amount)}</p>
      </div>
      <div className="divider"></div>
      <div className="checkout-right-bottom">
        <div>
          <p className="checkout-card-prop">Subtotal</p>
          <p className="checkout-card-prop-bold">{formatCurrency(subTotal)}</p>
        </div>
        <div>
          <p className="checkout-card-prop">Delivery Information</p>
          <p className="checkout-card-prop">{deliveryInfo}</p>
        </div>
        <div>
          <p className="checkout-card-prop-bold">Total</p>
          <p className="checkout-card-prop-bold">{formatCurrency(total)}</p>
        </div>
      </div>
    </div>
  );
}
