/*
 * File: HomePage.js
 * Description: This file contains the home page of the web app.
 */

import React from "react";
import "./bootstrap.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const HomePage = () => {
  return (
    <div>
      <header className="masthead">
        <div className="container">
          <div className="masthead-subheading">
            Welcome To Admin Side Travel Pro!
          </div>
          <div className="masthead-heading text-uppercase">
            It's Nice To Meet You
          </div>
          <Link to="/">
            <Button
              variant="success"
              size="lg"
              className="landingbutton"
              style={{ width: 250, height: 70, fontSize: 20, borderRadius: 0 }}
            >
              Tell Me More
            </Button>
          </Link>
        </div>
      </header>
      <section className="page-section" id="services">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Services</h2>
            <h3 className="section-subheading text-muted">
              Let's take a look at our services.
            </h3>
          </div>
          <div className="row text-center">
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x green-color"></i>
                <i className="fas fa-sharp fa-solid fa-user fa-stack-1x fa-inverse white-color"></i>
              </span>
              <h4 className="my-3">User Management</h4>
              <p className="text-muted">
                We provide functionalities to manage the users more easily.
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x green-color"></i>
                <i className="fas fa-sharp fa-train fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Train Mangement</h4>
              <p className="text-muted">
                Manage the trains more easily with the customized dashbaord.
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x green-color"></i>
                <i className="fas fa-ticket fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Ticket Management</h4>
              <p className="text-muted">
                You can easily mangage the tickets of travelers with the help of
                the application.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="page-section " id="travel">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Our Destinations</h2>
            <h3 className="section-subheading text-muted">
              Enjoy your weekends with your family members
            </h3>
          </div>
          <div className="row">
            <div className="col-lg-4 col-sm-6 mb-4">
              <div className="travel-item">
                <img
                  className="img-fluid"
                  src="http://www.tripslanka.com/wp-content/uploads/2016/10/Galle.jpg"
                  alt="..."
                />
                <div className="travel-caption">
                  <div className="travel-caption-heading">Galle</div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mb-4">
              <div className="travel-item">
                <img
                  className="img-fluid"
                  src="https://www.tripsavvy.com/thmb/7Nt8tWDe9GxVTIn3H7HuwtESi20=/5000x2766/filters:fill(auto,1)/colombo-sri-lanka-12fb929f68f145379077137d65531e81.jpg"
                  alt="..."
                />
                <div className="travel-caption">
                  <div className="travel-caption-heading">Colombo</div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mb-4">
              <div className="travel-item">
                <img
                  className="img-fluid"
                  src="https://infolanka.lk/wp-content/uploads/2018/11/jaffna-nallur-kandaswamy-kovil.jpg"
                  alt="..."
                />
                <div className="travel-caption">
                  <div className="travel-caption-heading">Jaffna</div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 mb-4 mb-lg-0">
              <div className="travel-item">
                <img
                  className="img-fluid"
                  src="https://cdn.getyourguide.com/img/location/5c83eaac2b43a.jpeg/88.jpg"
                  alt="..."
                />

                <div className="travel-caption">
                  <div className="travel-caption-heading">Kandy</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6">
              <div className="travel-item">
                <img
                  className="img-fluid"
                  src="https://content.r9cdn.net/rimg/dimg/7f/81/f9b45daa-city-72211-16a79e90e29.jpg?crop=true&width=2160&height=1215&xhint=1356&yhint=1372"
                  alt="..."
                />
                <div className="travel-caption">
                  <div className="travel-caption-heading">Badulla</div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="travel-item">
                <img
                  className="img-fluid"
                  src="https://global-uploads.webflow.com/576fd5a8f192527e50a4b95c/5eaac99cbe49fe5481f65daf_snorkelling%20at%20pigeon%20island%20in%20trincomalee.jpg"
                  alt="..."
                />
                <div className="travel-caption">
                  <div className="travel-caption-heading">Trincomalee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
