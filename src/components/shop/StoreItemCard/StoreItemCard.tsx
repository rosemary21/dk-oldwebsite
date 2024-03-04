import "./StoreItemCard.css"
import { HashLink } from 'react-router-hash-link'
import formatCurrency from '../../../utilities/FormatCurrency'
import mobileView from '../../../utilities/mobileView'
import { useStoreContext } from "../../../contexts/StoreContext"
import { StoreItemProps } from "../../../types/contexts"

interface StoreItemCardProps {
  id: number;
  itemImage: string[];
  name: string;
  price: number;
  description: string;
  store: StoreItemProps[];
}


export default function StoreItemCard({
  id,
  itemImage,
  name,
  price,
  description,
  store,
}: StoreItemCardProps) {
  const {getStoreItem} = useStoreContext();

  return (
    <figure
      className="items-card-container rounded-1 shadow-sm"
      style={{ backgroundImage: `url(${itemImage[0]})` }}
    >
      <figcaption className="items-description-card">
        <div className="items-description-up">
          <div className="items-card-prices">
            <del>USD9,780</del>
            {formatCurrency(price)}
          </div>
          <h1 className="items-card-title">{name}</h1>
        </div>

        <div className="items-description-down">
          <div className="items-description-down-left">
            <p className="items-card-description">{description}</p>
            <div className="stars">
              <i className="bx bxs-star" />
              <i className="bx bxs-star" />
              <i className="bx bxs-star" />
              <i className="bx bxs-star" />
              <i className="bx bx-star" />
            </div>
          </div>

          <div className="item-cartButton">
            <HashLink smooth to="/details-page#details-page">
              <button
                onClick={() => getStoreItem(id, store)}
                className={mobileView() ? "" : "ms-2"}
                style={{ background: "rgba(255, 255, 255, 0.29)" }}
              >
                <i className="bx bx-cart" />
              </button>
            </HashLink>
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
