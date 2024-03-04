import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Data from "../../../Data.json";
import "../FashionNavbar/FashionNavbar.css";
import mobileView from "../../../utilities/mobileView";

export default function SoftwareNavbar() {

    return (
        <Navbar
            style={{ backgroundColor: "transparent" }}
            expand="sm"
            variant="dark"
            className={`homeNav navStyle ${mobileView() ? "px-2" : "px-5"
                }`}
        >
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    <img src="/images/logo.png" alt="logo" width={50} />
                </Navbar.Brand>
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-sm`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
                    placement="end"
                    className="w-75"
                    data-bs-scroll="true"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                            Fashion Page Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            {Data.softwarePage.navbar.map(({ innerHtml, link }, idx) => (
                                <Nav.Link
                                    key={idx}
                                    as={HashLink}
                                    to={link}
                                    style={{ color: mobileView() ? "#000" : "#ddd" }}
                                >
                                    {innerHtml}
                                </Nav.Link>
                            ))}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
            </Container>
        </Navbar>
    )
}
