/*
 * File: EditTrain.js
 * Author: Jayasingha U.A.C.L
 * Date: October 9, 2023
 * Description: This file is used to edit existing train  details on the system.
 * Reference: https://stackoverflow.com/questions/41480234/update-functionality-in-react
 */

import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import "../App.css";
import swal from "sweetalert";
import axios from "axios";
import LocalIP from "./LocalIP";
import { useParams } from "react-router-dom";

const EditTrain = (match) => {
  const [trainId, setTrainId] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [price, setPrice] = useState("");
  const [cancel, setCancel] = useState("");
  const { id } = useParams();

  //gather data from backend api with useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = LocalIP + "api/Train/" + id;

        const response = await axios.get(url);
        var tempdate = response.data.dateTime.split("|")[0].replace(/ /g, "");
        var temptime = response.data.dateTime.split("|")[1].replace(/ /g, "");
        setName(response.data.name);
        setDate(tempdate);
        setTime(temptime);
        setStart(response.data.start);
        setEnd(response.data.end);
        setPrice(response.data.price);
        setCancel(response.data.cancel + "");
        setTrainId(response.data.trainId);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, id);

  // clear form data
  const onClear = () => {
    setPrice("");
  };

  // submit chnaged  data to system with clicking the button
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = LocalIP + "api/train/" + id;
    const tempCancel = cancel === "true";
    const tempDate = date + " | " + time;
    const data = JSON.stringify({
      id: trainId,
      name: name,
      dateTime: tempDate,
      start: start,
      end: end,
      price: price,
      cancel: tempCancel,
    });

    // check if any error happen while submiting the form
    try {
      const res = await axios.put(url, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data);
      swal("Success!", "Train Edit is Successful Updated!", "success");
      window.location.href = "/train_all";
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container">
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
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Train Edit
        </h1>
        <div className="x_scroll">
          <hr />
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Train Name</Form.Label>
                <Form.Control
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <br></br>
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  value={date}
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="time">
                <Form.Label>Time</Form.Label>

                <Form.Control
                  value={time}
                  type="time"
                  onChange={(e) => setTime(e.target.value)}
                  disabled
                  required
                />
              </Form.Group>
              <br />
              <div className="form-group">
                <label className="start">start</label>
                <select
                  className="form-control"
                  id="start"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  required
                >
                  <option value="">Select Start Station</option>
                  <option value={start.Colombo}>Colombo</option>
                  <option value={start.Kandy}>Kandy</option>
                  <option value={start.Jaffna}>Jaffna</option>
                  <option value={start.Anuradhapura}>Anuradhapura</option>
                </select>
              </div>

              <br />

              <div className="form-group">
                <label className="end">end</label>
                <select
                  className="form-control"
                  id="end"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  required
                >
                  <option value="">Select End Station</option>
                  <option value={end.Colombo}>Colombo</option>
                  <option value={end.Kandy}>Kandy</option>
                  <option value={end.Jaffna}>Jaffna</option>
                  <option value={end.Anuradhapura}>Anuradhapura</option>
                </select>
              </div>
              <br />
              <Form.Group controlId="price">
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Form.Group>
              <br />

              <div className="form-group">
                <label className="cancel">Cancel</label>
                <select
                  className="form-control"
                  id="cancel"
                  value={cancel}
                  onChange={(e) => setCancel(e.target.value)}
                  required
                >
                  <option value="">Select Cancel</option>
                  <option value="true">Canceled</option>
                  <option value="false">Running</option>
                </select>
              </div>
              <br />
              <div className="col-md-4 offset-md-4">
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
              </div>
              <br />
              <br />
            </Form>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default EditTrain;
