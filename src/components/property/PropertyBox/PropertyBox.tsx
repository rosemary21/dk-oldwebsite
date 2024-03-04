import { HashLink } from "react-router-hash-link";
import { usePropertyContext } from "../../../contexts/PropertyContext";
import { PropertyResponseProps } from "../../../types/Properties";
import formatCurrency from "../../../utilities/FormatCurrency";

interface PropertyBoxProps {
  item: PropertyResponseProps;
}
export default function PropertyBox({item}: PropertyBoxProps) {
  const { getPropertyItem } = usePropertyContext();

  const {id, imageUrl, location, description, amount} = item;
  return (
    <div
      className="property-box"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="property-box-feature">
        {amount ? <p>{formatCurrency(amount)}</p> : null}
      </div>
      <div className="property-box-overlay">
        <div>
          <h3>{description}</h3>
          <p>{location}</p>
        </div>
        <HashLink smooth to="/property-details#property-main-details">
          <button
            className="card-btn"
            onClick={() => getPropertyItem(id)}
          >
            <i className="bx bx-right-arrow-alt" />
          </button>
        </HashLink>
      </div>
    </div>
  );
}
