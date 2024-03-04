import "../../css/UserProfile.css"
import mobileView from "../../utilities/mobileView"

export default function UserCard({ title, subtitle }) {
  return (
      <div className="userCard-container">
          <div>
              <h2>{title}</h2>
              <p>{subtitle}</p>
          </div>
          <i className={`bx bx-chevron-right bx-${mobileView() ? "sm" : "md"}`} style={{ color: "#d5d5d5" }} />
      </div>
  )
}
