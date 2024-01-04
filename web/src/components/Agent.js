/*
 * File: Agent.js
 * Author: Dombepola D.A.C.T
 * Date: October 9, 2023
 * Description: This file contains the UI for Travel Agent Dashboard.
 */

import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Agent() {
  return (
    <div className="container" style={{ minHeight: 900 }}>
      <div className="col-lg-12">
        <br />
        <br />
        <div className="justify-content-center">
          <h1>Travel Agent Dashboard</h1>
          <div>
            <hr />
            <br />
            <Link to="/reservation">
              <Button
                id="landingBtn"
                variant="info"
                size="lg"
                className="landingbutton"
                style={{ width: 350, height: 75 }}
              >
                Reservation
              </Button>
            </Link>
            <br />
            <br />
            <br />
            <Link to="/reservation_all">
              <Button
                id="landingBtn"
                variant="info"
                size="lg"
                className="landingbutton"
                style={{ width: 350, height: 75 }}
              >
                All Reservation
              </Button>
            </Link>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agent;
