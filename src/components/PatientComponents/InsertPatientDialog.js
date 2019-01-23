import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button, TextField, Dialog } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
  cardHeader: {
    minHeight: "100px"
  },

  actions: {
    display: "flex"
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
    const { open, onClose } = this.props;
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Patient</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Insert The Name Of The Patient
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="name"
            type="name"
            fullWidth
          />
          <DialogContentText>
            Please Insert The Surname Of The Patient
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="surname"
            label="surname"
            type="surname"
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onClose} color="primary">
            Insert
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
