/*
 * File: Officer.js
 * Author: Dombepola D.A.C.T
 * Date: October 9, 2023
 * Description: This file contains the UI for Back Officer Dashboard Dashboard.
 */

import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Officer() {
  return (
    <div className="container" style={{ minHeight: 900 }}>
      <div className="col-lg-12">
        <br />
        <br />
        <div className="justify-content-center">
          <h1>Back Officer Dashboard</h1>
          <div>
            <hr />
            <br></br>
            <br />
            <br />
            <Link to="/register">
              <Button
                id="landingBtn"
                variant="info"
                size="lg"
                className="landingbutton"
                style={{ width: 350, height: 75 }}
              >
                User Registration
              </Button>
            </Link>
            <br />
            <br />
            <br />
            <Link to="/allusers">
              <Button
                id="landingBtn"
                variant="info"
                size="lg"
                className="landingbutton"
                style={{ width: 350, height: 75 }}
              >
                View Users
              </Button>
            </Link>
            <br />
            <br />
            <br />
            <Link to="/train">
              <Button
                id="landingBtn"
                variant="info"
                size="lg"
                className="landingbutton"
                style={{ width: 350, height: 75 }}
              >
                Create Train
              </Button>
            </Link>

            <br />
            <br />
            <br />
            <Link to="/train_all">
              <Button
                id="landingBtn"
                variant="info"
                size="lg"
                className="landingbutton"
                style={{ width: 350, height: 75 }}
              >
                View Trains
              </Button>
            </Link>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Officer;
