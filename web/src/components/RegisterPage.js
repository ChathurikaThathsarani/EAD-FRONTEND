/*
 * File: RegisterPage.js
 * Author: Wanni Arachchige H.S
 * Date: October 8, 2023
 * Description: This file defines user regitration to the system
 * Reference: https://youtu.be/5OV-TYyJEnw?si=TVzFOnwSUi6DDJEv
 */

import React, { useState } from "react";
import "../App.css";
import swal from "sweetalert";
import axios from "axios";
import LocalIP from "./LocalIP";

function RegisterPage() {
  //initial state define
  const initialState = {
    id: "",
    name: "",
    nameError: "",
    nic: "",
    nicError: "",
    username: "",
    usernameError: "",
    password: "",
    passwordError: "",
    cPassword: "",
    cPasswordError: "",
  };

  //manage form data state
  const [formData, setFormData] = useState(initialState);

  //input changes handle
  const handleChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    setFormData({
      ...formData,
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  //clear the form
  const onClear = () => {
    setFormData(initialState);
  };
  //form validation
  const validation = async () => {
    let nameError = "";
    let nicError = "";
    let usernameError = "";
    let passwordError = "";
    let cPasswordError = "";

    if (!formData.name) {
      nameError = "Name is Required!";
    }
    if (!formData.nic) {
      nicError = "Nic is Required!";
    }
    if (!formData.username) {
      usernameError = "Email is Required!";
    }
    if (!formData.password) {
      passwordError = "Password is Required!";
    }
    if (!formData.cPassword) {
      cPasswordError = "Confirm Password is Required!";
    }
    if (formData.cPassword !== formData.password) {
      cPasswordError = "Password & Confirm Passwords are Not Match! Try again!";
    }
    if (
      nameError ||
      nicError ||
      usernameError ||
      passwordError ||
      cPasswordError
    ) {
      setFormData({
        ...formData,
        nameError,
        nicError,
        usernameError,
        passwordError,
        cPasswordError,
      });

      return false;
    } else {
      setFormData({
        ...formData,
        nameError,
        nicError,
        usernameError,
        passwordError,
        cPasswordError,
      });
      return true;
    }
  };
  //form submit handle
  const SubmitForm = async (e) => {
    e.preventDefault();
    if (await validation()) {
      console.log(formData);
      const url = LocalIP + "api/User";
      const data = JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        nic: formData.nic,
        username: formData.username,
        password: formData.password,
        privilege: 0,
        activation: true,
      });
      console.log(data);
      await axios
        .post(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res.data);
          setFormData(initialState);
          swal("Success!", "User Add Successfully!", "success");
        });
    }
  };
  //component render
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="col-lg-6 border rounded p-4 shadow-lg">
        <h1 className="text-center">Register</h1>
        <form autoComplete="off" onSubmit={SubmitForm}>
          <div className="form-group">
            <label className="font-weight-bold field-label">Name:</label>
            <input
              type="text"
              className="form-control field-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <div style={{ color: "red" }}>{formData.nameError}</div>
          </div>

          <div className="form-group">
            <label className="font-weight-bold field-label">NIC:</label>
            <input
              type="text"
              className="form-control field-input"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
            />
            <div style={{ color: "red" }}>{formData.nicError}</div>
          </div>

          <div className="form-group">
            <label className="font-weight-bold field-label">Username:</label>
            <input
              type="text"
              className="form-control field-input"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <div style={{ color: "red" }}>{formData.usernameError}</div>
          </div>

          <div className="form-group">
            <label className="font-weight-bold field-label">Password:</label>
            <input
              type="password"
              className="form-control field-input"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div style={{ color: "red" }}>{formData.passwordError}</div>
          </div>

          <div className="form-group">
            <label className="font-weight-bold field-label">
              Confirm Password:
            </label>
            <input
              type="password"
              className="form-control field-input"
              name="cPassword"
              value={formData.cPassword}
              onChange={handleChange}
            />
            <div style={{ color: "red" }}>{formData.cPasswordError}</div>
          </div>

          <div className="text-center mt-3">
            <input
              type="submit"
              className="btn btn-primary ml-3"
              value="Submit"
            />
            <input
              type="button"
              className="btn btn-danger mr-3"
              value="Clear"
              onClick={onClear}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
