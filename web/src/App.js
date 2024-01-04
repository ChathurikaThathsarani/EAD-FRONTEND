import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Officer from "./components/Officer";
import RegisterPage from "./components/RegisterPage";
import CreateReservation from "./components/CreateReservation";
import UpdateReservation from "./components/UpdateReservation";
import ViewReservationAll from "./components/ViewReservationAll";
import CreateTrain from "./components/CreateTrain";
import EditTrain from "./components/EditTrain";
import TrainAllPage from "./components/TrainAllPage";
import Agent from "./components/Agent";
import LoginPage from "./components/LoginPage";
import AllUsersPage from "./components/AllUsersPage";
import Nav from "./components/nav";
import Footer from "./components/footer";
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          backgroundImage: "url(/bg.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          height: "100%",
        }}
      >
        <Nav />
        <Route path="/reservation" component={CreateReservation}></Route>
        <Route
          path="/reservation_edit/:id"
          component={UpdateReservation}
        ></Route>
        <Route path="/reservation_all" component={ViewReservationAll}></Route>
        <Route path="/train" component={CreateTrain}></Route>
        <Route path="/train_edit/:id" component={EditTrain}></Route>
        <Route path="/train_all" component={TrainAllPage}></Route>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/allusers" component={AllUsersPage}></Route>
        <Route path="/office" component={Officer}></Route>
        <Route path="/agent" component={Agent}></Route>
        <Route path="/" component={HomePage} exact></Route>
        <Route path="/register" component={RegisterPage}></Route>
        <ButterToast position={{ vertical: POS_TOP, horizontal: POS_RIGHT }} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
