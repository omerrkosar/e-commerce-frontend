import React from "react";

import {Nav,Navbar,Container,NavDropdown} from "react-bootstrap";

class DemoNavbar extends React.Component {



  render() {
    return (
        <Navbar sticky="top" fixed="top" bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">E-Commerce</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="product_management">Product Management</Nav.Link>
                <Nav.Link href="category_management">Category Management</Nav.Link>
                <NavDropdown.Divider />
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
  }
}



export default DemoNavbar;
