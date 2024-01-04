/*
 * File: ViewReservationAll.js
 * Author: Dombepola D.A.C.T
 * Date: October 9, 2023
 * Description: This file contains the UI for getting all reservations and deleting a reservation by travel agent for a traveler.
 * Reference: https://youtube.com/playlist?list=PLKhlp2qtUcSYC7EffnHzD-Ws2xG-j3aYo&feature=shared
 */

import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import LocalIP from "./LocalIP";

const ViewReservationAll = () => {
  const [search, setSearch] = useState("");
  const [reservation, setReservation] = useState([]);

  useEffect(() => {
    // Getting all reservations
    const fetchData = async () => {
      const url = LocalIP + "api/Ticket/";
      try {
        const response = await axios.get(url);
        setReservation(response.data);
      } catch (error) {
        console.error("Error getting  tickets:", error);
      }
    };

    fetchData();
  }, []);

  // Method to delete a specific reservation
  const onDelete = (id) => {
    const apiUrl = LocalIP + "api/Ticket/" + id;
    let dueDate;

    // Get the date of train reservation
    axios
      .get(apiUrl)
      .then((response) => {
        dueDate = response.data.dateTime.split("|")[0].replace(/ /g, "");

        const currentDate = new Date();
        const selectedDate = new Date(dueDate);

        const timeDifference = selectedDate - currentDate;
        const daysDifference = timeDifference / (1000 * 3600 * 24);

        // Check if the reservation can be deleted (at least 5 days in the future)
        if (daysDifference >= 5) {
          swal({
            title: "Are you sure?",
            text: "Delete the ticket!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              const url = LocalIP + "api/Ticket/";
              axios.delete(url + id).then((res) => {
                swal("Successfully deleted the ticket!", {
                  icon: "success",
                });
              });
              window.location.href = "/reservation_all";
            }
          });
        } else {
          swal(
            "Error!",
            "Reservations can only be deleted at least 5 days before the reservation date.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching date:", error);
      });
  };

  // Search method
  const searchHandle = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div
      style={{
        marginLeft: "10%",
        marginRight: "10%",
        marginBottom: "100px",
        minHeight: 900,
      }}
    >
      <br />
      <br />
      <div>
        <h1 style={{ fontWeight: "400", fontSize: "50px", marginLeft: "0" }}>
          Reservation Management
        </h1>
        <hr />
        <div>
          <div style={{ width: "300px", marginLeft: "75%" }}>
            <div>
              <input
                type="text"
                className="form-control"
                name="search"
                value={search}
                onChange={searchHandle}
                placeholder="Search ... "
              />
            </div>
          </div>
        </div>
        <hr />
        <div>
          <table style={{ width: "100%" }}>
            <thead>
              <tr
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  height: 60,
                }}
              >
                <th
                  style={{
                    width: 30,
                    fontSize: 20,
                  }}
                >
                  User NIC
                </th>
                <th
                  style={{
                    width: 150,
                    fontSize: 20,
                  }}
                >
                  Date & Time
                </th>
                <th
                  style={{
                    width: 30,
                    fontSize: 20,
                  }}
                >
                  From - To
                </th>
                <th
                  style={{
                    width: 20,
                    fontSize: 20,
                  }}
                >
                  No Of Ticket
                </th>
                <th
                  style={{
                    width: 30,
                    fontSize: 20,
                  }}
                >
                  Total
                </th>
                <th
                  style={{
                    width: 20,
                    fontSize: 20,
                  }}
                >
                  Edit
                </th>
                <th
                  style={{
                    width: 20,
                    fontSize: 20,
                  }}
                >
                  Remove
                </th>
              </tr>
            </thead>
            <tbody>
              {reservation
                .filter((data) => {
                  if (search == null) return data;
                  else if (
                    data.start.toLowerCase().includes(search.toLowerCase()) ||
                    data.end.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return data;
                  }
                })
                .map((reservation) => (
                  <tr
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                      height: 80,
                    }}
                    key={reservation.id}
                  >
                    <td
                      style={{
                        fontSize: 20,
                      }}
                    >
                      {reservation.nic}
                    </td>
                    <td
                      style={{
                        fontSize: 20,
                      }}
                    >
                      {reservation.dateTime}
                    </td>
                    <td
                      style={{
                        fontSize: 20,
                      }}
                    >
                      {reservation.start} - {reservation.end}
                    </td>
                    <td
                      style={{
                        fontSize: 20,
                      }}
                    >
                      {reservation.noOfTicket}
                    </td>
                    <td
                      style={{
                        fontSize: 20,
                      }}
                    >
                      {reservation.total}
                    </td>
                    <td
                      style={{
                        fontSize: 20,
                      }}
                    >
                      <button
                        style={{
                          fontSize: 20,
                          backgroundColor: "black",
                          borderRadius: 10,
                          border: "3px solid white",
                          width: "100px",
                          color: "white",
                          fontWeight: "400",
                        }}
                      >
                        <a
                          style={{ textDecoration: "none", color: "white" }}
                          href={"reservation_edit/" + reservation.id}
                        >
                          Edit
                        </a>
                      </button>
                    </td>
                    <td
                      style={{
                        fontSize: 20,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => onDelete(reservation.id)}
                        style={{
                          fontSize: 20,
                          backgroundColor: "red",
                          borderRadius: 10,
                          border: "3px solid white",
                          width: "100px",
                          color: "white",
                          fontWeight: "400",
                        }}
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

export default ViewReservationAll;
