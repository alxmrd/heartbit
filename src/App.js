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
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Tooltip from "@material-ui/core/Tooltip";
import { withRouter } from "react-router-dom";
import Pusher from "pusher-js";
import {
  changeDefibrillatorLockerByArduino,
  changeDefibrillatorPresentFlagByArduino,
  storeArduinoData,
  clearArduinoData
} from "./store/actions/actions";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "./components/MySnackbarContentWrapper";

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
      width: theme.spacing.unit * 7.5
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
  },
  margin: {
    margin: theme.spacing.unit
  }
});

class App extends React.Component {
  state = {
    open: false,
    vertical: "top",
    horizontal: "center",
    warning: ""
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    var pusher = new Pusher("2f7f2a748cacde676705", {
      cluster: "eu",
      forceTLS: true
    });

    var channel = pusher.subscribe("channel");
    channel.bind("arduino", data => {
      this.props.onStoreArduinoData(data);
      if (data.identifier === "locker") {
        const defibrillatorData = {
          id: parseInt(data.id),
          locker: parseInt(data.locker)
        };

        this.props.onChangeDefibrillatorLockerByArduino(defibrillatorData);
        if (defibrillatorData.locker === 0) {
          this.setState({
            warning: "O απινιδωτής " + data.id + " κλειδώθηκε"
          });
        } else {
          this.setState({
            warning: "O απινιδωτής " + data.id + " ξεκλειδώθηκε"
          });
        }
      }
      if (data.identifier === "presentflag") {
        const defibrillatorData = {
          id: parseInt(data.id),
          presentflag: parseInt(data.presentflag)
        };

        this.props.onChangeDefibrillatorPresentFlagByArduino(defibrillatorData);
        if (defibrillatorData.locker === 0) {
          this.setState({
            warning: "O απινιδωτής " + data.id + " βρίσκεται πλέον στη θέση του"
          });
        } else {
          this.setState({
            warning: "O απινιδωτής" + data.id + "είναι εκτός θέσης"
          });
        }
      }
      if (data.identifier === "lowtempwarning") {
        this.setState({
          warning: "H θερμοκρασία του απινιδωτή " + data.id + " είναι χαμηλή!"
        });
      }
      if (data.identifier === "hightempwarning") {
        this.setState({
          warning: "H θερμοκρασία του απινιδωτή " + data.id + " είναι υψηλή!"
        });
      }
    });
  }
  handleClose = () => {
    this.props.onClearArduinoData(this.props.arduinoData);
  };
  render() {
    const { classes, theme, arduinoData } = this.props;
    const { vertical, horizontal } = this.state;
    return (
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
                    <Link to="/" className={classes.link}>
                      ΑΠΟΣΥΝΔΕΣΗ
                    </Link>
                  </Button>
                ) : (
                  <Button color="inherit" className={classes.LoginButton}>
                    <Link to="/" className={classes.link}>
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
              <Link to="/map" className={classes.link}>
                <ListItem>
                  <Tooltip title="Χάρτης" placement="right">
                    <ListItemIcon>
                      <i className="material-icons">map</i>
                    </ListItemIcon>
                  </Tooltip>
                  <ListItemText primary="Χάρτης" />
                </ListItem>
              </Link>
              <Link to="/home" className={classes.link}>
                <ListItem>
                  <Tooltip title="Προφίλ Διαχειριστή" placement="right">
                    <ListItemIcon>
                      <i className="material-icons">home</i>
                    </ListItemIcon>
                  </Tooltip>
                  <ListItemText primary="Προφίλ Διαχειριστή" />
                </ListItem>
              </Link>
              <Divider />
              <Link to="/admin" className={classes.link}>
                <ListItem>
                  <Tooltip title="Διαχειριστές" placement="right">
                    <ListItemIcon>
                      <i className="material-icons">account_circle</i>
                    </ListItemIcon>
                  </Tooltip>
                  <ListItemText primary="Περιστατικό" />
                </ListItem>
              </Link>
              <Link to="/Volunteers" className={classes.link}>
                <ListItem>
                  <Tooltip title="Εθελοντές" placement="right">
                    <ListItemIcon>
                      <i className="material-icons">supervised_user_circle</i>
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
                  <Tooltip title="Περιστατικά" placement="right">
                    <ListItemIcon>
                      <i className="material-icons">add_location</i>
                    </ListItemIcon>
                  </Tooltip>
                  <ListItemText primary="Περιστατικό" />
                </ListItem>
              </Link>
              <Divider />
            </Drawer>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Routes />
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={arduinoData.identifier ? true : false}
                onClose={this.handleClose}
                ContentProps={{
                  "aria-describedby": "message-id"
                }}
                autoHideDuration={6000}
              >
                <MySnackbarContentWrapper
                  onClose={this.handleClose}
                  variant="warning"
                  className={classes.margin}
                  message={this.state.warning}
                />
              </Snackbar>

              {/* <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={arduinoData.message ? true : false}
          // onClose={errormessage =>
          //   this.props.onErrorMessageCleaner(errormessage)
          // }
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          autoHideDuration={6000}
        >
          <MySnackbarContentWrapper
            // onClose={errormessage =>
            //   this.props.onErrorMessageCleaner(errormessage)
            // }
            variant="error"
            className={classes.margin}
            message={errormessage}
          />
        </Snackbar> */}
            </main>
          </React.Fragment>
        ) : (
          <main className={classes.login}>
            <div className={classes.toolbar} />
            <Routes />
          </main>
        )}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  arduinoData: PropTypes.object.isRequired,
  onChangeDefibrillatorLockerByArduino: PropTypes.func,
  onChangeDefibrillatorPresentFlagByArduino: PropTypes.func,
  onStoreArduinoData: PropTypes.func,
  onClearArduinoData: PropTypes.func
};
const AppWithStyles = withStyles(styles, { withTheme: true })(App);
const mapStateToProps = state => ({
  arduinoData: state.arduinoData
});
const mapDispatchToProps = dispatch => ({
  onChangeDefibrillatorLockerByArduino: defibrillatorData =>
    dispatch(changeDefibrillatorLockerByArduino(defibrillatorData)),
  onChangeDefibrillatorPresentFlagByArduino: defibrillatorData =>
    dispatch(changeDefibrillatorPresentFlagByArduino(defibrillatorData)),
  onStoreArduinoData: data => dispatch(storeArduinoData(data)),

  onClearArduinoData: data => dispatch(clearArduinoData(data))
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppWithStyles)
);
