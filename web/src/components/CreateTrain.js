/*
 * File: CreateTrain.js
 * Author: Jayasingha U.A.C.L
 * Date: October 9, 2023
 * Description: This file is used to create a new train for the system.
 * Reference: https://www.mongodb.com/languages/mern-stack-tutorial
 */

import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import "../App.css";
import swal from "sweetalert";
import axios from "axios";
import LocalIP from "./LocalIP";

function CreateTrain() {
  //intilize states
  const [trainId, setTrainId] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [price, setPrice] = useState("");

  const onClear = () => {
    setTrainId("");
    setDate("");
    setTime("");
    setStart("");
    setEnd("");
    setPrice("");
  };

  // submit form data to system
  const SubmitForm = async (e) => {
    e.preventDefault();
    console.log({
      trainId,
      name,
      date,
      time,
      start,
      end,
      price,
    });

    const url = LocalIP + "api/train/";
    const data = JSON.stringify({
      name,
      dateTime: date + " | " + time,
      start,
      end,
      price,
      cancel: false,
    });

    console.log(data);

    //check if train succesfully added to the system
    try {
      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        swal("Success!", "Train added successfully!", "success");
        window.location.href = "/train_all";
        onClear();
      } else {
        swal("Error!", "Failed to add train.", "error");
      }
      console.log(response.data);
      onClear();
      swal("Success!", "You have successfully added a train!", "success");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="TrainBackgroundCreate" style={{ minHeight: 900 }}>
      <Card
        style={{
          margin: 50,
          marginLeft: "25%",
          marginRight: "0%",
          width: "50%",
          borderRadius: 45,
          borderWidth: 2.0,
          marginTop: 20,
          paddingInline: 10,
          background: "rgba(231, 238, 238, 0.9)",
        }}
      >
        <br />
        <br />
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Add Train
        </h1>
        <div className="x_scroll">
          <hr />
          <Card.Body>
            <Form onSubmit={SubmitForm}>
              <Form.Group>
                <Form.Label>Train Name</Form.Label>
                <Form.Control
                  controlId="Train Name"
                  type="name"
                  value={name}
                  placeholder="Train Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <br />
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>

              <br />
              <Form.Group controlId="time">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  value={time}
                  type="time"
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>Start</Form.Label>
                <Form.Control
                  as="select"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  required
                >
                  <option value="">Select Start Station</option>
                  <option>Colombo</option>
                  <option>Kandy</option>
                  <option>Jaffna</option>
                  <option>Anuradhapura</option>
                </Form.Control>
              </Form.Group>
              <br />
              <Form.Group controlId="end">
                <Form.Label>End</Form.Label>
                <Form.Control
                  as="select"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  required
                >
                  <option value="">Select End Station</option>
                  <option>Colombo</option>
                  <option>Kandy</option>
                  <option>Jaffna</option>
                  <option>Anuradhapura</option>
                </Form.Control>
              </Form.Group>
              <br />
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  min="1"
                  name="price"
                  placeholder="Ticket Price"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Form.Group>
              <br />
              {/* submit and reset buttons */}
              <Button
                style={{ fontSize: 20, marginTop: 10 }}
                type="submit"
                variant="success"
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
          <br />
          <br />
        </div>
      </Card>
    </div>
  );
}
export default CreateTrain;
