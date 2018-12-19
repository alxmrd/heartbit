import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Routes from "./Routes";
import { Provider } from "react-redux";
import store from "./store/store";
import CssBaseline from "@material-ui/core/CssBaseline";
import Tooltip from "@material-ui/core/Tooltip";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },

  grow: {
    flexGrow: 1
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  LoginButton: { marginRight: "20px" },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  login: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    background:
      "linear-gradient(right top, #46929a, #68a89a, #94bd9a,#c5cea1 ,#f5deb3 )",
    height: "-webkit-fill-available"
  },

  link: {
    color: "wheat",
    textDecoration: "none"
  }
});

class App extends React.Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <Provider store={store}>
        <div className={classes.root}>
          <CssBaseline />
          <div id="map" />
          {sessionStorage.getItem("token") ? (
            <React.Fragment>
              <AppBar
                position="fixed"
                className={classNames(classes.appBar, {
                  [classes.appBarShift]: this.state.open
                })}
              >
                <Toolbar disableGutters={!this.state.open}>
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerOpen}
                    className={classNames(classes.menuButton, {
                      [classes.hide]: this.state.open
                    })}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography
                    variant="h4"
                    color="primary"
                    className={classes.grow}
                  >
                    <Link to="/home" className={classes.link}>
                      HeartBit
                    </Link>
                  </Typography>
                  {sessionStorage.getItem("token") ? (
                    <Button
                      color="inherit"
                      className={classes.LoginButton}
                      onClick={() => sessionStorage.clear()}
                    >
                      <Link to="/login" className={classes.link}>
                        LOGOUT
                      </Link>
                    </Button>
                  ) : (
                    <Button color="inherit" className={classes.LoginButton}>
                      <Link to="/login" className={classes.link}>
                        LOGIN
                      </Link>
                    </Button>
                  )}
                </Toolbar>
              </AppBar>
              <Drawer
                variant="permanent"
                className={classNames(classes.drawer, {
                  [classes.drawerOpen]: this.state.open,
                  [classes.drawerClose]: !this.state.open
                })}
                classes={{
                  paper: classNames({
                    [classes.drawerOpen]: this.state.open,
                    [classes.drawerClose]: !this.state.open
                  })
                }}
                open={this.state.open}
              >
                <div className={classes.toolbar}>
                  <IconButton onClick={this.handleDrawerClose}>
                    {theme.direction === "rtl" ? (
                      <ChevronRightIcon />
                    ) : (
                      <ChevronLeftIcon />
                    )}
                  </IconButton>
                </div>
                <Divider />
                <Link to="/home" className={classes.link}>
                  <ListItem>
                    <Tooltip title="Αρχική" placement="right">
                      <ListItemIcon>
                        <i className="material-icons">home</i>
                      </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Αρχική" />
                  </ListItem>
                </Link>
                <Link to="/Volunteers" className={classes.link}>
                  <ListItem>
                    <Tooltip title="Εθελοντές" placement="right">
                      <ListItemIcon>
                        <i className="material-icons">account_circle</i>
                      </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Εθελοντές" />
                  </ListItem>
                </Link>
                <Link to="/defibrillators" className={classes.link}>
                  <ListItem>
                    <Tooltip title="Απινιδωτές" placement="right">
                      <ListItemIcon>
                        <i className="material-icons">local_hospital</i>
                      </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Απινιδωτές" />
                  </ListItem>
                </Link>
                <Link to="/patients" className={classes.link}>
                  <ListItem>
                    <Tooltip title="Ασθενείς" placement="right">
                      <ListItemIcon>
                        <i className="material-icons">healing</i>
                      </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Ασθενείς" />
                  </ListItem>
                </Link>
                <Link to="/event" className={classes.link}>
                  <ListItem>
                    <Tooltip title="Περιστατικό" placement="right">
                      <ListItemIcon>
                        <i className="material-icons">add_location</i>
                      </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Περιστατικό" />
                  </ListItem>
                </Link>
                <Divider />
                <Link to="/AppMapContainer" className={classes.link}>
                  <ListItem>
                    <Tooltip title="Χάρτης" placement="right">
                      <ListItemIcon>
                        <i className="material-icons">map</i>
                      </ListItemIcon>
                    </Tooltip>
                    <ListItemText primary="Χάρτης" />
                  </ListItem>
                </Link>
              </Drawer>
              <main className={classes.content}>
                <div className={classes.toolbar} />
                <Routes />
              </main>
            </React.Fragment>
          ) : (
            <main className={classes.login}>
              <div className={classes.toolbar} />
              <Routes />
            </main>
          )}
        </div>
      </Provider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
