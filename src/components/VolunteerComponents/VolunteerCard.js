import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button, TextField, Dialog } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import ReactToPrint from "react-to-print";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";

const styles = theme => ({
  cardHeader: {
    minHeight: "100px"
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
    backgroundColor: "#4e878c"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});
class VolunteerCard extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      showPassword: false
    };
  }
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes, open, onClose, volunteerData } = this.props;
    return (
      <Dialog
        ref={el => (this.componentRef = el)}
        open={open}
        onClose={onClose}
        scroll="paper"
        aria-labelledby="form-dialog-title"
      >
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              <i className="material-icons">account_circle</i>
            </Avatar>
          }
          action={
            <ReactToPrint
              trigger={() => (
                <IconButton>
                  <i className="material-icons">print</i>
                </IconButton>
              )}
              content={() => this.componentRef}
            />
          }
          // subheader="Όνομα Χρήστη"
          title="Kαρτέλα Εθελοντή"
        />

        <Divider />

        <DialogContent>
          <TextField
            id="username"
            type="text"
            label="Όνομα Χρήστη"
            name="username"
            className={classes.textField}
            defaultValue={volunteerData.username}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />
          <TextField
            id="password"
            label="Κωδικός"
            type={this.state.showPassword ? "text" : "password"}
            name="password"
            className={classes.textField}
            defaultValue={volunteerData.password}
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment variant="outlined" position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            id="name"
            type="name"
            label="Όνομα"
            name="name"
            className={classes.textField}
            defaultValue={volunteerData.name}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />
          <TextField
            id="surname"
            type="surname"
            label="Επίθετο"
            name="surname"
            className={classes.textField}
            defaultValue={volunteerData.surname}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />
          <TextField
            id="email"
            type="email"
            label="Εmail"
            name="email"
            className={classes.textField}
            defaultValue={volunteerData.email}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />
          <TextField
            id="tel1"
            type="number"
            label="Τηλέφωνο επικοινωνίας"
            defaultValue={volunteerData.tel1}
            className={classes.textField}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />
          <TextField
            id="tel2"
            type="number"
            label="Εναλλακτικό Τηλέφωνο επικοινωνίας"
            defaultValue={volunteerData.tel2}
            className={classes.textField}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />

          <TextField
            id="dateofbirth"
            label="Ημερομηνία Γέννησης"
            type="date"
            className={classes.textField}
            defaultValue={volunteerData.dateofbirth}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
          />

          <TextField
            noValidate
            id="latesttraining"
            label="Ημερομηνία Τελευταίας Εκπαίδευσης"
            type="date"
            fullWidth
            margin="normal"
            className={classes.textField}
            defaultValue={volunteerData.latesttraining}
            InputProps={{
              readOnly: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
          />
          <TextField
            id="address"
            type="address"
            label="Διεύθυνση"
            name="address"
            className={classes.textField}
            defaultValue={volunteerData.address}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />
          <TextField
            id="location"
            type="location "
            label="Περιφέρεια"
            name="location"
            className={classes.textField}
            defaultValue={volunteerData.location}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary">
            Κλεισιμο καρτελας
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const VolunteerCardWithStyles = withStyles(styles)(VolunteerCard);
const mapStateToProps = state => ({
  volunteerData:
    state.volunteers.filter(volunteer => volunteer.id === state.id)[0] || {}
});

VolunteerCard.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  volunteerData: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(VolunteerCardWithStyles);
