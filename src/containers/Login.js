import { PostData } from "./PostData.js";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from "../components/MySnackbarContentWrapper.js";
import { connect } from "react-redux";
import { successLogin } from "../store/actions/actions";
const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  // submit: {
  //   marginTop: theme.spacing.unit * 3
  // },
  margin: {
    marginTop: theme.spacing.unit * 3
  }
});
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      redirectToReferrer: false,
      open: false,
      message: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  handleSubmit = event => {
    event.preventDefault();
    PostData("login", this.state)
      .then(result => {
        let responseJson = result;

        if (responseJson.status === "success") {
          //alert("Logged in");
          sessionStorage.setItem("token", responseJson.token);
          sessionStorage.setItem("username", responseJson.username);
          const username = { username: this.state.username };

          this.props.onSuccessLogin(username);
          this.setState({ redirectToReferrer: true });
        } else {
          this.setState({ open: true, message: responseJson.message });
        }
      })
      .catch(error => alert("error", error));
    //axios.post('/api/login',{user: this.state});
  };

  render() {
    if (this.state.redirectToReferrer || sessionStorage.getItem("token")) {
      return <Redirect to={"/Map"} />;
    }
    const { classes } = this.props;
    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h6" variant="h2" color="primary">
              Heartbit
            </Typography>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  name="username"
                  type="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  autoComplete="current-password"
                />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.margin}
              >
                Login
              </Button>
              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
              >
                <MySnackbarContentWrapper
                  onClose={this.handleClose}
                  variant="error"
                  className={classes.margin}
                  message={this.state.message}
                />
              </Snackbar>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  onSuccessLogin: PropTypes.func.isRequired
};
const LoginWithStyles = withStyles(styles)(Login);

const mapDispatchToProps = dispatch => ({
  onSuccessLogin: username => dispatch(successLogin(username))
});
export default connect(
  null,
  mapDispatchToProps
)(LoginWithStyles);
