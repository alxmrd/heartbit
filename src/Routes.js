import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Volunteers from "./containers/Volunteers"



export default () =>
 <Switch>
  <Route path="/" exact component={Home} />
  <Route path="/Volunteers" exact component={Volunteers} />
  <Route path="/login" exact component={Login} />
  <Route component={NotFound} />
 </Switch>;
