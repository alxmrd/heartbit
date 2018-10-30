import React, { Fragment } from "react";
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
  drawerPaper: {
    height: "-webkit-fill-available",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
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
      <Fragment>
        <div className={classes.root}>
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
              <Typography variant="h4" color="primary" className={classes.grow}>
                <Link to="/" className={classes.link}>
                  HeartBit
                </Link>
              </Typography>
              <Button
                color="inherit"
                href="/login"
                className={classes.LoginButton}
              >
                Login
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.state.open && classes.drawerPaperClose
              )
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
            <Link to="/" className={classes.link}>
              <ListItem>
                <ListItemIcon>
                  <i className="material-icons">home</i>
                </ListItemIcon>
                <ListItemText primary="Προφίλ" />
              </ListItem>
            </Link>
            <Link to="/Volunteers" className={classes.link}>
              <ListItem>
                <ListItemIcon>
                  <i className="material-icons">account_circle</i>
                </ListItemIcon>
                <ListItemText primary="Εθελοντές" />
              </ListItem>
            </Link>
            <Link to="/defibrillators" className={classes.link}>
              <ListItem>
                <ListItemIcon>
                  <i className="material-icons">local_hospital</i>
                </ListItemIcon>

                <ListItemText primary="Απινιδοτές" />
              </ListItem>
            </Link>
            <Link to="/patients" className={classes.link}>
              <ListItem>
                <ListItemIcon>
                  <i className="material-icons">healing</i>
                </ListItemIcon>
                <ListItemText primary="Ασθενείς" />
              </ListItem>
            </Link>
            <Link to="/event" className={classes.link}>
              <ListItem>
                <ListItemIcon>
                  <i className="material-icons">add_location</i>
                </ListItemIcon>
                <ListItemText primary="Περιστατικό" />
              </ListItem>
            </Link>
            <Divider />
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Routes />
          </main>
        </div>
      </Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
