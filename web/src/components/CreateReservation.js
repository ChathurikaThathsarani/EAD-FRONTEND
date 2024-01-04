/*
 * File: CreateReservation.js
 * Author: Dombepola D.A.C.T
 * Date: October 9, 2023
 * Description: This file contains the UI for creating a reservation by travel agent for a traveler.
 * Reference: https://youtube.com/playlist?list=PLKhlp2qtUcSYC7EffnHzD-Ws2xG-j3aYo&feature=shared
 */

import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import swal from "sweetalert";
import axios from "axios";
import LocalIP from "./LocalIP";

function CreateReservation() {
  // Initialize the states
  const [trainId, setTrainId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [price, setPrice] = useState("");
  const [noOfTicket, setNoOfTicket] = useState(0);
  const [total, setTotal] = useState(0);
  const [train, setTrain] = useState([]);
  const [nic, setNic] = useState();
  const [user, setUser] = useState("");

  useEffect(() => {
    // Getting running trains
    const apiUrl = LocalIP + "api/Train/running";
    axios
      .get(apiUrl)
      .then((response) => {
        const trainData = response.data;
        setTrain(trainData);
      })
      .catch((error) => {
        console.error("Error getting trains:", error);
      });
  }, []);

  // Update the train details when selecting a train from drop down
  const handleTrainChange = (selectedTrainId) => {
    const selectedTrain = train.find((tr) => tr.id === selectedTrainId);

    var selectedDate = selectedTrain.dateTime.split("|")[0].replace(/ /g, "");
    var selectedTime = selectedTrain.dateTime.split("|")[1].replace(/ /g, "");

    if (selectedTrain) {
      setTrainId(selectedTrain.id);
      setDate(selectedDate);
      setTime(selectedTime);
      setStart(selectedTrain.start);
      setEnd(selectedTrain.end);
      setPrice(selectedTrain.price);
      const calculatedTotal = selectedTrain.price * noOfTicket;
      setTotal(calculatedTotal);
    }
  };

  // Resettng the form
  const onClear = () => {
    setTrainId("");
    setDate("");
    setTime("");
    setStart("");
    setEnd("");
    setPrice("");
    setNoOfTicket("");
    setTotal("");
  };

  // Submit the form to create a new ticket
  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const selectedDate = new Date(date);

    const timeDifference = selectedDate - currentDate;
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    // Check whether if the reservation is within 30 days
    if (daysDifference <= 0 || daysDifference > 30) {
      swal(
        "Error!",
        "Reservation date must be within 30 days from the booking date.",
        "error"
      );
      return;
    }

    // Get the userID when entering the user NIC
    const url = LocalIP + "api/User/getByNic/" + nic;
    try {
      const response = await axios.get(url);
      const userId = response.data.id;
      const formData = {
        trainId,
        dateTime: `${date} | ${time}`,
        start,
        end,
        price,
        noOfTicket,
        total,
        userId,
      };

      // Post the ticket
      try {
        const postResponse = await axios.post(
          LocalIP + "api/ticket",
          formData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (postResponse.status === 200) {
          swal("Success!", "Successfully reservation is created!", "success");
          window.location.href = "/reservation_all";
          onClear();
        } else {
          swal("Error!", "Error adding a reservation.", "error");
        }
      } catch (error) {
        console.error("Error adding a reservation:", error);
        swal("Error!", "Error adding a reservation.", "error");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="container" style={{ minHeight: 900 }}>
      <br></br>
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
            src="https://www.forkliftandpalate.com/hubfs/reserved%20table%20outside.jpg"
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
            Add Reservation
          </div>
        </div>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="userNIC">
              <Form.Control
                value={nic}
                type="text"
                onChange={(e) => setNic(e.target.value)}
                required
                placeholder="Enter NIC"
                style={{
                  height: 60,
                  fontSize: 18,
                  padding: "20px",
                }}
              />
            </Form.Group>
            <Form.Group controlId="trainName">
              <br />
              <select
                style={{
                  height: 60,
                  fontSize: 18,
                  padding: "15px",
                  width: "100%",
                }}
                onChange={(e) => handleTrainChange(e.target.value)}
                required
                value={trainId}
              >
                <option value="">Select Train</option>
                {train.map((tr) => (
                  <option key={tr.id} value={tr.id}>
                    {`Name: ${tr.name} Start: ${tr.start} End: ${tr.end}`}
                  </option>
                ))}
              </select>
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
                placeholder="Start Station"
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
                placeholder="End Station"
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
                placeholder="Ticket Price"
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

export default CreateReservation;
