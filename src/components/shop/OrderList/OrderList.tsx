import "./OrderList.css";
import { useStoreContext } from "../../../contexts/StoreContext";
import formatCurrency from "../../../utilities/FormatCurrency";
import allbrands from "../../../utilities/Allbrands";
import { Alert } from "react-bootstrap";

interface OrderListProps {
  id: number;
  qty: number;
}

export default function OrderList({ id, qty }: OrderListProps) {
  const {increaseCartQty, decreaseCartQty, removeFromCart} = useStoreContext();

  const item = allbrands.find((item) => item.id === id);

  if (!item) {
    return (
      <Alert variant="danger">
        <p>Item not found</p>
      </Alert>
    );
  }

  return (
    <div className="orderlist_container">
      <div className="orderlist_top">
        <img
          src={item.itemImage[0]}
          alt={item.name}
          className="orderlist-img"
        />
        
        <span className="orderlist-desc">{item.name}</span>

        <span className="orderlist-qty text-muted">
          QTY: {qty} @ <p>{formatCurrency(item.price)}</p>
        </span>

        <span className="orderlist-price">
          {formatCurrency(item.price * qty)}
        </span>
      </div>
      <div className="orderlist_bottom">
        <button onClick={() => increaseCartQty(id)}>
          <i className="bx bx-plus" />
        </button>
        <button onClick={() => decreaseCartQty(id)}>
          <i className="bx bx-minus" />
        </button>
        <button onClick={() => removeFromCart(id)}>
          <i className="bx bx-trash" />
        </button>
      </div>
    </div>
  );
}
