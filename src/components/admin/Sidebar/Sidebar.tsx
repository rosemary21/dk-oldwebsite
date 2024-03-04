import { useState } from "react";
import { AiOutlineStock } from "react-icons/ai";
import { BiCalendar, BiCategory, BiDetail, BiLock } from "react-icons/bi";
import { BsCardChecklist, BsHandbag } from "react-icons/bs";
import { GoDashboard } from "react-icons/go";
import { MdOutlineDescription } from "react-icons/md";
import { SlCompass } from "react-icons/sl";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useAdminContext } from "../../../contexts/AdminContext";

const ACTIVE = {
  Dashboard: "dashboard",
  Product: "product",
  Stock: "stock",
  Customers: "customers",
  Orders: "orders",
  Receipts: "receipts",
  Settings: "settings",
  LogOut: "logout",
};

type sideBarProps = {
  active: string;
};

export default function Sidebar({ active }: sideBarProps) {
  // ** States
  // To determine the active Side-bar
  const [activeSide, setActiveSide] = useState(active);
  // For the product dropdown
  const [dropdown, setDropdown] = useState("none");

  const {setLoginStates, setToken} = useAdminContext()

  const navigate = useNavigate()

  // This function toggles the product dropdown
  function productDropdown() {
    if (dropdown === "none") {
      setDropdown("block");
    } else {
      setDropdown("none");
    }
  }

  //   Handlet to sign out
  function signOut() {
    setLoginStates(prev => {
            return {...prev, isLoginFailed: false, isLoginSuccessful: false, user: ""}
    })
    setToken("")
    navigate;("/admin-login")
  }

  // Handle click for buttons
  function handleBtnClick(state: string) {
    // Make the clicked link the active side
    setActiveSide(state);
    // If product dropdown is open, close it
    setDropdown("none");
  }

  return (
    <aside className="admin-sidebar">
      <NavLink to="/">
        <img src="/images/logo.png" alt="logo" />
      </NavLink>

      <div className="menu">
        <Link className="side_link" to={`/admin-${ACTIVE.Dashboard}`}>
          <button
            onClick={() => handleBtnClick(ACTIVE.Dashboard)}
            className={
              activeSide === ACTIVE.Dashboard
                ? "side-btn active-side"
                : "side-btn"
            }
          >
            <div>
              <GoDashboard className="side-icon" />
              {ACTIVE.Dashboard}
            </div>
            <i
              className={`bx bx-chevron-${
                activeSide === ACTIVE.Dashboard ? "down" : "right"
              }`}
            />
          </button>
        </Link>

        <button
          onClick={() => {
            handleBtnClick(ACTIVE.Product);
            productDropdown();
          }}
          className={
            activeSide === ACTIVE.Product
              ? "side-btn active-side side_link"
              : "side-btn side_link"
          }
        >
          <div>
            <BsHandbag className="side-icon" />
            {ACTIVE.Product}
          </div>
          <i
            className={`bx bx-chevron-${
              activeSide === ACTIVE.Product ? "down" : "right"
            }`}
          />
        </button>
        <div className="dropdown-container" style={{ display: dropdown }}>
          <Link to="/prod-description">
            <MdOutlineDescription className="side-icon" /> Description
          </Link>

          <Link to="/prod-category">
            <BiCategory className="side-icon" /> Categories
          </Link>
        </div>

        <Link className="side_link" to={`/admin-${ACTIVE.Customers}`}>
          <button
            onClick={() => handleBtnClick(ACTIVE.Customers)}
            className={
              activeSide === ACTIVE.Customers
                ? "side-btn active-side"
                : "side-btn"
            }
          >
            <div>
              <SlCompass className="side-icon" />
              {ACTIVE.Customers}
            </div>
            <div></div>
          </button>
        </Link>

        <Link className="side_link" to={`/admin-${ACTIVE.Stock}`}>
          <button
            onClick={() => handleBtnClick(ACTIVE.Stock)}
            className={
              activeSide === ACTIVE.Stock ? "side-btn active-side" : "side-btn"
            }
          >
            <div>
              <AiOutlineStock className="side-icon" />
              {ACTIVE.Stock}
            </div>
            <div></div>
          </button>
        </Link>

        <Link className="side_link" to={`/admin-${ACTIVE.Orders}`}>
          <button
            onClick={() => handleBtnClick(ACTIVE.Orders)}
            className={
              activeSide === ACTIVE.Orders ? "side-btn active-side" : "side-btn"
            }
          >
            <div>
              <BsCardChecklist className="side-icon" />
              {ACTIVE.Orders}
            </div>
            <i
              className={`bx bx-chevron-${
                activeSide === ACTIVE.Orders ? "down" : "right"
              }`}
            />
          </button>
        </Link>

        <Link className="side_link" to={`/admin-${ACTIVE.Receipts}`}>
          <button
            onClick={() => handleBtnClick(ACTIVE.Receipts)}
            className={
              activeSide === ACTIVE.Receipts
                ? "side-btn active-side"
                : "side-btn"
            }
          >
            <div>
              <BiDetail className="side-icon" />
              {ACTIVE.Receipts}
            </div>
            <i
              className={`bx bx-chevron-${
                activeSide === ACTIVE.Receipts ? "down" : "right"
              }`}
            />
          </button>
        </Link>

        <Link className="side_link" to={`/admin-${ACTIVE.Settings}`}>
          <button
            onClick={() => handleBtnClick(ACTIVE.Settings)}
            className={
              activeSide === ACTIVE.Settings
                ? "side-btn active-side"
                : "side-btn"
            }
          >
            <div>
              <BiCalendar className="side-icon" />
              {ACTIVE.Settings}
            </div>
            <div></div>
          </button>
        </Link>

        <button
          onClick={signOut}
          className={
            activeSide === ACTIVE.LogOut
              ? "side-btn active-side side_link"
              : "side-btn side_link"
          }
        >   
        <div>
              <BiLock className="side-icon" />
              {ACTIVE.LogOut}
            </div>
        </button>
      </div>
    </aside>
  );
}
