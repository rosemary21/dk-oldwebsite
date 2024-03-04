import "./CategoryCard.css"
import {useNavigate} from "react-router-dom"

interface CategoryCardProps {
  category: string;
  count: number;
  image: string;
}

export default function CategoryCard({
  category,
  count,
  image,
}: CategoryCardProps) {
  const navigate = useNavigate();

  // To render appropriate string in the browser
  const renderCategory = (category: string) => {
    if (category == "PROLAN") return "Lands"
    if (category == "PROAPA") return "Apartments";
    else return "Shortlets";
  };

  return (
    <div className="categoryCard" style={{ backgroundImage: `url(${image})` }}>
      <div className="categoryCard-desc">
        <div>
          <p className="cat">{renderCategory(category)}</p>
          <p className="cat-desc">{`${count} Available`}</p>
        </div>
        <button
          className="card-btn"
          onClick={() =>
            navigate(`/property-${renderCategory(category).toLowerCase()}`)
          }
        >
          <i className="bx bx-right-arrow-alt" />
        </button>
      </div>
    </div>
  );
}
