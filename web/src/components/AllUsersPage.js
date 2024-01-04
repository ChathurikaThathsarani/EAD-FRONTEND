/*
 * File: AllUsersPage.js
 * Author: Wanni Arachchige H.S
 * Date: October 8, 2023
 * Description: This file defines User table for handle user privilages, user details update,delete and profile activation tasks.
 * Reference: https://youtu.be/3IwGjihXHis?si=GCVb6wUITeEt9s2g
 */

import React, { useState, useEffect } from "react";
import "../App.css";
import swal from "sweetalert";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import MaterialTable from "material-table";
import LocalIP from "./LocalIP";

function AllUsersPage() {
  //initial state define
  const initialState = {
    users: [],
    columns: [
      { title: "Name", field: "name" },
      { title: "NIC", field: "nic" },
      { title: "Username", field: "username" },
      {
        title: "User Privilege",
        field: "privilege",
        lookup: { 1: "Travel Agent", 2: "Backoffice", 0: "User" },
      },
      {
        title: "Profile Activate Deactivate",
        field: "activation",
        lookup: { true: "Activate", false: "Deactivate" },
      },
    ],
  };

  //useState to define state
  const [state, setState] = useState(initialState);

  //fetch data from the API
  const fetchData = async () => {
    try {
      const url = LocalIP + "api/User";
      const response = await axios.get(url);
      setState((prevState) => ({
        ...prevState,
        users: response.data,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //useEffect to fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = LocalIP + "api/User";
        const response = await axios.get(url);
        setState((prevState) => ({
          ...prevState,
          users: response.data,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  //submit the form and update the user function
  const submitForm = async (newRow, oldRow) => {
    try {
      const url = LocalIP + "api/User/" + oldRow.id;
      const booleanValue = newRow.activation === "true" ? true : false;
      const data = {
        id: oldRow.id,
        name: newRow.name,
        nic: newRow.nic,
        username: newRow.username,
        password: oldRow.password,
        privilege: newRow.privilege,
        activation: booleanValue,
      };
      await axios.put(url, data, {
        headers: { "Content-Type": "application/json" },
      });
      swal("Success!", "Profile Updated Successful!", "success");
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  //delete a user function
  const onDelete = async (id) => {
    try {
      const willDelete = await swal({
        title: "Are you sure?",
        text: "Delete this record!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      if (willDelete) {
        const url = LocalIP + "api/User/";
        await axios.delete(url + id);
        swal("Success!", "Profile Deleted Successful!", "success");
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const { users, columns } = state;

  //the component
  return (
    <div style={{ minHeight: 900 }}>
      <br />
      <MaterialTable
        title="Users Table"
        columns={columns}
        data={users}
        style={{
          maxWidth: "80%",
          padding: "20px 5px",
          margin: "0 auto",
          fontFamily: "Arial, sans-serif",
          color: "darkblue",
        }}
        options={{
          filtering: true,
          sorting: true,
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowUpdate: (newRow, oldRow) =>
            new Promise(async (resolve, reject) => {
              submitForm(newRow, oldRow);
              setTimeout(() => resolve(), 300);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              onDelete(selectedRow.id);
              setTimeout(() => resolve(), 300);
            }),
        }}
        headerStyle={{
          fontWeight: "bold",
        }}
      />
      <br />
    </div>
  );
}

export default AllUsersPage;
