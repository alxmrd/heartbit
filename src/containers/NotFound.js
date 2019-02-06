import React from "react";
import "./NotFound.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default () => (
  <div className="NotFound">
    <h3>Sorry, page not found, please log in!</h3>
    {sessionStorage.getItem("token") ? null : (
      <Button
        color="inherit"
        // className={classes.LoginButton}
        onClick={() => sessionStorage.clear()}
      >
        <Link to="/">RETURN TO LOGIN</Link>
      </Button>
    )}
  </div>
);
