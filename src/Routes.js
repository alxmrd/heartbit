import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Volunteers from "./AdminPages/Volunteers.js";
import patients from "./AdminPages/patients.js";
import event from "./AdminPages/event.js";
import defibrillators from "./AdminPages/defibrillators.js";
import admin from "./AdminPages/admin.js";
import playground from "./containers/playground/playground.js";

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/Volunteers" exact component={Volunteers} />
    <Route path="/defibrillators" exact component={defibrillators} />
    <Route path="/patients" exact component={patients} />
    <Route path="/admin" exact component={admin} />
    <Route path="/event" exact component={event} />
    <Route path="/login" exact component={Login} />
    <Route path="/playground" exact component={playground} />
    <Route component={NotFound} />
  </Switch>
);
