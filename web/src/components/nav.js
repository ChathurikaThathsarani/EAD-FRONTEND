/*
 * File: nav.js
 * Description: This file contains the nav bar of the web app.
 */

import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NavComponent = () => {
  const Logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const dashboard = () => {
    if (localStorage.getItem("usertype") === "1") {
      window.location.href = "/office";
    } else if (localStorage.getItem("usertype") === "2") {
      window.location.href = "/agent";
    }
  };

  if (localStorage.getItem("loginAccess") !== "true") {
    return (
      <Navbar className="navbar-custom" expand="lg">
        <Container>
          <Navbar.Brand href="/">TravelPro</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else if (
    localStorage.getItem("loginAccess") === "true" &&
    (localStorage.getItem("usertype") === "1" ||
      localStorage.getItem("usertype") === "2")
  ) {
    return (
      <Navbar className="navbar-custom" expand="lg">
        <Container>
          <Navbar.Brand href="/">TravelPro</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link onClick={dashboard}>Dashboard</Nav.Link>
              <Nav.Link onClick={Logout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  return null;
};

export default NavComponent;
