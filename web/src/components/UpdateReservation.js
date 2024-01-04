/*
 * File: UpdateReservation.js
 * Author: Dombepola D.A.C.T
 * Date: October 9, 2023
 * Description: This file contains the UI for updating a reservation by travel agent for a traveler.
 * Reference: https://youtube.com/playlist?list=PLKhlp2qtUcSYC7EffnHzD-Ws2xG-j3aYo&feature=shared
 */

import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import swal from "sweetalert";
import axios from "axios";
import LocalIP from "./LocalIP";
import { useParams } from "react-router-dom";

function UpdateReservation() {
  // Initialize the states
  const [trainId, setTrainId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [price, setPrice] = useState("");
  const [noOfTicket, setNoOfTicket] = useState("");
  const [total, setTotal] = useState("");
  const [trainName, setTrainName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const url = LocalIP + "api/Ticket/" + id;

    // Get the details of a particular reservation
    axios.get(url).then((response) => {
      var selectedDate = response.data.dateTime.split("|")[0].replace(/ /g, "");
      var selectedTime = response.data.dateTime.split("|")[1].replace(/ /g, "");
      setDate(selectedDate);
      setTime(selectedTime);
      setStart(response.data.start);
      setEnd(response.data.end);
      setPrice(response.data.price);
      setTotal(response.data.total);
      setNoOfTicket(response.data.noOfTicket);
      setTrainId(response.data.trainId);
    });
    // Get the train name by train id
    const urlForTrainName = LocalIP + "api/Train/" + trainId;
    axios.get(urlForTrainName).then((response) => {
      setTrainName(response.data[0].name);
    });
  }, []);

  // Resetting the form
  const onClear = () => {
    setNoOfTicket("");
  };

  // Update the reservation
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const selectedDate = new Date(date);

    const timeDifference = selectedDate - currentDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    // Check if the reservation can be updated (at least 5 days in the future)
    if (daysDifference < 5) {
      swal(
        "Error!",
        "Reservations can only be updated at least 5 days before the reservation date.",
        "error"
      );
      return;
    }

    //Update he reservation
    const url = LocalIP + "api/Ticket/" + id;
    const data = JSON.stringify({
      id: id,
      trainID: trainId,
      dateTime: date + " | " + time,
      start: start,
      end: end,
      price: price,
      noOfTicket: noOfTicket,
      total: total,
      userId: localStorage.getItem("id"),
    });
    await axios
      .put(url, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        swal("Success!", "Reservation is successfully updated!", "success");
        window.location.href = "/reservation_all";
      });
  };

  return (
    <div className="container" style={{ minHeight: 900 }}>
      <br></br>
      <br></br>
      <Card
        style={{
          width: "80%",
          borderWidth: 0,
          outline: "none",
          marginLeft: 110,
          border: "2px solid black",
        }}
      >
        <div
          style={{
            position: "relative",
            textAlign: "center",
            color: "white",
            fontSize: "65px",
            fontWeight: "bold",
          }}
        >
          {" "}
          <img
            src="https://blog.addpointment.com/wp-content/uploads/2020/12/a-fine-dining-restaurant-table-that-is-reserved-scaled.jpg"
            alt=""
            style={{
              width: "100%",
              height: "250px",
              background:
                "linear - gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))",
            }}
          ></img>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            Edit Reservation
          </div>
        </div>
        <Card.Body>
          <br></br>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="trainName">
              <Form.Control
                value={trainName}
                type="text"
                onChange={(e) => setTrainName(e.target.value)}
                disabled
                required
                style={{
                  height: 60,
                  fontSize: 18,
                  padding: "20px",
                }}
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="date">
              <Form.Control
                value={date}
                type="date"
                onChange={(e) => setDate(e.target.value)}
                disabled
                required
                style={{
                  height: 60,
                  fontSize: 18,
                  padding: "20px",
                }}
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="time">
              <Form.Control
                value={time}
                type="time"
                onChange={(e) => setTime(e.target.value)}
                disabled
                required
                style={{
                  height: 60,
                  fontSize: 18,
                  padding: "20px",
                }}
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="start">
              <Form.Control
                value={start}
                type="text"
                onChange={(e) => setStart(e.target.value)}
                disabled
                required
                style={{
                  height: 60,
                  fontSize: 18,
                  padding: "20px",
                }}
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="end">
              <Form.Control
                value={end}
                type="text"
                onChange={(e) => setEnd(e.target.value)}
                disabled
                required
                style={{
                  height: 60,
                  fontSize: 18,
                  padding: "20px",
                }}
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="price">
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled
                required
                style={{
                  height: 60,
                  fontSize: 18,
                  padding: "20px",
                }}
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="noOfTicket">
              <Form.Control
                type="number"
                value={noOfTicket}
                style={{
                  height: 60,
                  fontSize: 18,
                  padding: "20px",
                }}
                onChange={(e) => {
                  const newNoOfTicket = parseInt(e.target.value, 10);
                  if (newNoOfTicket >= 1 && newNoOfTicket <= 4) {
                    setNoOfTicket(newNoOfTicket);
                    const calculatedTotal = price * newNoOfTicket;
                    setTotal(calculatedTotal);
                  } else {
                    setNoOfTicket("");
                    swal(
                      "Invalid Number of Tickets",
                      "Number of tickets should be between 1 and 4.",
                      "error"
                    );
                  }
                }}
                required
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="total">
              <Form.Control
                type="number"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                disabled
                required
                style={{
                  height: 60,
                  fontSize: 18,
                  padding: "20px",
                }}
              />
            </Form.Group>
            <br></br>
            <Button
              style={{ fontSize: 20, marginTop: 10 }}
              type="submit"
              variant="primary"
            >
              Submit
            </Button>
            <Button
              style={{ fontSize: 20, marginTop: 10 }}
              className="mx-2"
              onClick={onClear}
              variant="danger"
            >
              Reset
            </Button>
          </Form>
        </Card.Body>
        <br></br>
      </Card>
      <br></br>
      <br></br>
    </div>
  );
}

export default UpdateReservation;
