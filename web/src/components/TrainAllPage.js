/*
 * File: TrainAllPage.js
 * Author: Jayasingha U.A.C.L
 * Date: October 9, 2023
 * Description: This file is used to view all existing train on the system.
 * Reference: https://youtu.be/TNhaISOUy6Q?si=Vyi6zc9eC31rs4xV
 */

import React, { useState, useEffect } from "react";
import "../App.css";
import swal from "sweetalert";
import { Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import LocalIP from "./LocalIP";

const TrainAllPage = () => {
  const [search, setSearch] = useState("");
  const [train, setTrain] = useState([]);

  // writing use effect get data from backend api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = LocalIP + "api/Train/";
        const response = await axios.get(url);
        setTrain(response.data);
      } catch (error) {
        console.error("Error fetching train data:", error);
      }
    };
    fetchData();
  }, []);

  // Delete train details if deleting data failed show error message
  const onDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Delete this record!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = LocalIP + "api/Train/";
        axios
          .delete(url + id)
          .then((res) => {
            console.log(res.data);
            swal("Delete Successful!", {
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting train details:", error);
            swal("Error!", "Train details delete failed.", "error");
          });
      }
    });
  };

  // search train details
  const searchHandle = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div style={{ minHeight: 900 }}>
      <br />
      <br />
      <div className="justify-content-center">
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Train Management
        </h2>

        <div className="x_scroll">
          <div style={{ width: "300px", marginLeft: "75%" }}>
            <div>
              <input
                type="text"
                placeholder="Search Train Name..."
                style={{
                  width: 300,
                  height: 40,
                  borderRadius: 50,
                  padding: "10px",
                  paddingLeft: "15px",
                  marginLeft: "-20px",
                  fontSize: 18,
                }}
                onChange={searchHandle}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="x_scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date & Time</th>
                <th>Start Station</th>
                <th>End Station</th>
                <th>Price</th>
                <th>Cancel</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {train
                .filter((data) => {
                  if (search == null) return data;
                  else if (
                    data.name.toLowerCase().includes(search.toLowerCase()) ||
                    data.start.toLowerCase().includes(search.toLowerCase()) ||
                    data.end.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return data;
                  }
                })
                .map((train) => (
                  <tr key={train.id}>
                    <td>{train.name}</td>
                    <td>{train.dateTime}</td>
                    <td>{train.start}</td>
                    <td>{train.end}</td>
                    <td>{train.price}</td>
                    <td>{train.cancel === true ? "Canceled" : "Running"}</td>
                    <td className="">
                      <a
                        href={"train_edit/" + train.id}
                        className="btn btn-info"
                      >
                        Edit
                      </a>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => onDelete(train.id)}
                        class="btn btn-warning"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrainAllPage;
