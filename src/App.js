import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Routes from "./Routes";
import { Link } from "react-router-dom";
import RouteNavItem from "./components/RouteNavItem";
import AddIcon from "@material-ui/icons/Add";

const drawerWidth = 240;
const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" color="primary" className={classes.grow}>
            <Link to="/">HeartBit</Link>
          </Typography>
          <Button color="inherit">
            <RouteNavItem href="/login">Login</RouteNavItem>
          </Button>
        </Toolbar>
      </AppBar>

      <Routes />
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);

// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { Nav, Navbar} from "react-bootstrap";
// import RouteNavItem from "./components/RouteNavItem";
// import "./App.css";
// import Routes from "./Routes";

// class App extends Component {
//   render() {
//     return (
//     <div className="App container">
//     <Navbar fluid collapseOnSelect>
//     <Navbar.Header>
//     <Navbar.Brand>
//     <Link to="/">HeartBit</Link>
//     </Navbar.Brand>
//     <Navbar.Toggle />
//     </Navbar.Header>
//     <Navbar.Collapse>
//     <Nav pullRight>
//     <RouteNavItem href="/signup">Home</RouteNavItem>
//     <RouteNavItem href="/login">Login</RouteNavItem>
//     </Nav>
//     </Navbar.Collapse>
//     </Navbar>
//     <Routes />
//     </div>
//     );
//    }
// }
// export default App;
