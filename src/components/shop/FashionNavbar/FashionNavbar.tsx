import { useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Data from "../../../Data.json";
import { useStoreContext } from "../../../contexts/StoreContext";
import mobileView from "../../../utilities/mobileView";
import "./FashionNavbar.css";



export default function FashionNavbar({ activeLink }: { activeLink: string }) {
  const [active, setActive] = useState(activeLink);

  const { cartQty } = useStoreContext();

  const navigate = useNavigate();
  return (
    <Navbar
      bg="light"
      expand="sm"
      className={`homeNav shadow-sm ${mobileView() ? "px-2" : "px-5"}`}
      fixed="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="/images/logo.png" alt="logo" width={50} />
        </Navbar.Brand>
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-sm`}
          aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
          placement="end"
          className="w-75"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
              Fashion Page Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {Data.fashionPage.fashionNavbar.map(
                ({ innerHtml, link }, idx) => (
                  <Nav.Link
                    key={idx}
                    as={Link}
                    to={link}
                    className={
                      active === innerHtml.toLowerCase()
                        ? "menuLink activeNav"
                        : "menuLink"
                    }
                    onClick={() => setActive(innerHtml.toLowerCase())}
                  >
                    {innerHtml}
                  </Nav.Link>
                )
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <Navbar.Text className="nav-icons-container">
          <img
            src="/images/user.png"
            alt="user"
            onClick={() => navigate("/create-account")}
          />
          <img
            src="/images/heart.png"
            alt="wishlist"
            onClick={() => navigate("/order")}
          />
          <img
            src="/images/lock.png"
            alt="lock"
            onClick={() => navigate("/order")}
          />
          <span className="cart-notification-count">{cartQty}</span>
        </Navbar.Text>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
      </Container>
    </Navbar>
  );
}
