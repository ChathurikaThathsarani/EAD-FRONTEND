/*
 * File: Login.js
 * Author: Wanni Arachchige H.S
 * Date: October 8, 2023
 * Description: This file defines user login form
 * Reference: https://youtu.be/5OV-TYyJEnw?si=TVzFOnwSUi6DDJEv
 */

import React, { useState, useEffect } from "react";
import "../App.css";
import swal from "sweetalert";
import axios from "axios";
import LocalIP from "./LocalIP";

function LoginPage(props) {
  //initial state define
  const initialState = {
    id: "",
    username: "",
    usernameError: "",
    password: "",
    passwordError: "",
  };

  //manage form data state
  const [formData, setFormData] = useState(initialState);

  //handle component mount function
  const compDidMount = () => {
    if (localStorage.getItem("usertype") === "1") {
      window.location.href = "/office";
    } else if (localStorage.getItem("usertype") === "2") {
      window.location.href = "/agent";
    }
  };

  //useEffect to call compDidMount
  useEffect(() => {
    compDidMount();
  }, []);

  //handle form input changes function
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
    let usernameError = "";
    let passwordError = "";

    if (!formData.username) {
      usernameError = "Username is Required!";
    }
    if (!formData.password) {
      passwordError = "Passwordis is Required!";
    }
    if (usernameError || passwordError) {
      await setFormData({ ...formData, usernameError, passwordError });
      return false;
    } else {
      await setFormData({ ...formData, usernameError, passwordError });
      return true;
    }
  };

  //form submit handle
  const SubmitForm = async (e) => {
    e.preventDefault();
    if (await validation()) {
      console.log(formData);
      const url =
        LocalIP +
        "api/user/login/" +
        formData.username +
        "/" +
        formData.password;
      await axios
        .get(url, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.id) {
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("usertype", res.data.privilege);
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("loginAccess", true);
            if (res.data.privilege === 1) {
              props.history.push("/");
            } else if (res.data.privilege === 2) {
              props.history.push("/");
            }
          } else if (res.data === "Login Activation Fail") {
            swal(
              "Error!",
              " Your Login Activation is Failed! Try Again!",
              "error"
            );
          }
          setFormData(initialState);
        });
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="col-lg-6 border rounded p-4 shadow-lg">
        <h1 className="text-center">Login</h1>
        <form autoComplete="off" onSubmit={SubmitForm}>
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

          <div className="text-center mt-3">
            <input
              type="submit"
              className="btn btn-primary ml-3"
              value="Submit"
            />
            <input
              type="button"
              className="btn btn-danger mr-3"
              value="Cancel"
              onClick={() => onClear()}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
