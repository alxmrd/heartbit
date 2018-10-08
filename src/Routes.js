import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Volunteers from "/Users/alxmrd/projects/heartbit/src/AdminPages/Volunteers.js";
import patients from "/Users/alxmrd/projects/heartbit/src/AdminPages/patients.js";
import event from "/Users/alxmrd/projects/heartbit/src/AdminPages/event.js";
import defibrillators from "/Users/alxmrd/projects/heartbit/src/AdminPages/defibrillators.js";
import admin from "/Users/alxmrd/projects/heartbit/src/AdminPages/admin.js";

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/Volunteers" exact component={Volunteers} />
    <Route path="/defibrillators" exact component={defibrillators} />
    <Route path="/patients" exact component={patients} />
    <Route path="/admin" exact component={admin} />
    <Route path="/event" exact component={event} />
    <Route path="/login" exact component={Login} />
    <Route component={NotFound} />
  </Switch>
);
