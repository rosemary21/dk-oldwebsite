import { useState } from 'react';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import "../../shop/FashionNavbar/FashionNavbar.css";
import Data from "../../../Data.json";
import mobileView from '../../../utilities/mobileView';

export default function PropertyNavbar({ activeLink }: { activeLink: string }) {
  const [activeNav, setActiveNav] = useState(activeLink);
  const navigate = useNavigate();

  return (
    <Navbar
      expand="sm"
      className={`homeNav navStyle ${mobileView() ? "px-2" : "px-5"}`}
      style={{ backgroundColor: "transparent" }}
    >
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">
          <img src="/images/logo.png" alt="logo" width={50} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />

        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-sm"
          aria-labelledby="offcanvasNavbarLabel-expand-sm"
          placement="end"
          className="w-75"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav
              className={`justify-content-end align-items-${
                mobileView() ? "start" : "center"
              } flex-grow-1 pe-3 gap-2`}
            >
              {Data.propertySection.navbar.map(({ id, title, link }) => (
                <Nav.Link
                  as={NavLink}
                  key={id}
                  to={link}
                  className={
                    activeNav === title.toLowerCase()
                      ? "navLink activeNav"
                      : "navLink"
                  }
                  onClick={() => setActiveNav(title.toLowerCase())}
                >
                  {title}
                </Nav.Link>
              ))}

              <img
                src="/images/Property/user.png"
                alt="login"
                className="propertyLogin"
                onClick={() => navigate("/signup")}
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

