import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ambulance3 from "../ambulance3.png";
import { connect } from "react-redux";
import { successLogin } from "../store/actions/actions";
import InputAdornment from "@material-ui/core/InputAdornment";
import { TextField, Divider } from "@material-ui/core";

const styles = theme => ({
  card: {
    maxWidth: "100%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: "#4e878c",
    width: "100px",
    height: "100px"
  }
});

class Home extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  componentDidMount() {
    // this.props.onfetchLoggedInUser(this.props.loggedInAdminUsername);
    const username = { username: sessionStorage.getItem("username") };

    this.props.onSuccessLogin(username);
  }
  render() {
    const { classes, loggedInAdmin } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="Recipe"
              className={classes.avatar}
              src={ambulance3}
            />
          }
          title={
            <Typography component="h5" variant="h4" color="primary">
              {loggedInAdmin.name} {loggedInAdmin.surname}
            </Typography>
          }
          subheader={loggedInAdmin.type}
        />

        <CardContent>
          <Typography component="p">
            ΕΚΑΒ - Παράρτημα Κοζάνης <br /> Διεύθυνση: Ξηρολίμνης 20, <br />
            Κοζάνη 501 00 <br />
            Τηλέφωνο: 2461 029166 <br />
          </Typography>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>

        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Στοιχεία Διαχειριστή:</Typography>

            <TextField
              key={loggedInAdmin.id}
              id="tel"
              type="number"
              label="Τηλέφωνο επικοινωνίας"
              defaultValue={loggedInAdmin.tel}
              className={classes.textField}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true
              }}
              variant="outlined"
            />

            <TextField
              key={loggedInAdmin.id}
              id="email"
              type="email"
              label="email"
              defaultValue={loggedInAdmin.email}
              className={classes.textField}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true
              }}
              variant="outlined"
            />

            <TextField
              key={loggedInAdmin.id}
              id="address"
              type="address"
              label="Διεύθυνση"
              defaultValue={loggedInAdmin.address}
              className={classes.textField}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true
              }}
              variant="outlined"
            />

            <TextField
              id="outlined-textarea"
              margin="normal"
              label="Πληκτρολογείστε Μήνυμα"
              placeholder=""
              multiline
              variant="outlined"
              className={classes.textField}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment variant="outlined" position="end">
                    <IconButton color="primary">
                      <i className="material-icons">send</i>
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {/* <i className="material-icons">send</i> */}
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  onSuccessLogin: PropTypes.func.isRequired,
  loggedInAdmin: PropTypes.object.isRequired
};
const HomeWithStyles = withStyles(styles)(Home);

const mapStateToProps = state => ({
  loggedInAdmin: state.adminData
});

const mapDispatchToProps = dispatch => ({
  onSuccessLogin: username => dispatch(successLogin(username))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeWithStyles);
