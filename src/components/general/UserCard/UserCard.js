import mobileView from "../../../utilities/mobileView"
import "../../../pages/General/UserProfile/UserProfile.css"

export default function UserCard({ title, subtitle, routeToLink }) {
    return (
        <div className="userCard-container" onClick={()=>routeToLink(title)}>
            <div>
                <h2>{title}</h2>
                <p>{subtitle}</p>
            </div>
            <i className={`bx bx-chevron-right bx-${mobileView() ? "sm" : "md"}`} style={{ color: "#d5d5d5" }} />
        </div>
    )
}
