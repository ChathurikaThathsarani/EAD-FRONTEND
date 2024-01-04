/*
 * File: footer.js
 * Description: This file contains the footer of the web app.
 */

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Divider } from "@mui/material";

const Footer = () => {
  return (
    <Box>
      <Divider />
      <Container fluid className="footer-custom">
        <Container>
          <Row>
            <Col md={6}>
              <p>&copy; 2023 TravelPro Website. All rights reserved.</p>
            </Col>
            <Col md={6}>
              <p className="text-end">EAD Assignment</p>
            </Col>
          </Row>
        </Container>
      </Container>
    </Box>
  );
};

export default Footer;
