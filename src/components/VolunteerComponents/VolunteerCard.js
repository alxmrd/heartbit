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
  }
});

const VolunteerCard = ({ classes, open, onClose, volunteerData }) => (
  <Dialog
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
      title={volunteerData.username}
      subheader="Username"
    />

    <Divider />

    <DialogContent>
      <TextField
        id="tel1"
        label="Contact Number"
        defaultValue={volunteerData.tel1}
        type="number"
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true
        }}
      />
      <TextField
        id="tel2"
        label="Second Contact Number"
        defaultValue={volunteerData.tel2}
        type="number"
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true
        }}
      />
      <TextField
        name="email"
        label="email"
        type="email"
        id="email"
        defaultValue={volunteerData.email}
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true
        }}
      />
      <TextField
        id="dateofbirth"
        label="Birthday"
        type="date"
        defaultValue={volunteerData.dateofbirth}
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true
        }}
        InputLabelProps={{
          shrink: true
        }}
      />

      <TextField
        noValidate
        id="latesttraining"
        label="Latest Training"
        type="date"
        fullWidth
        margin="normal"
        defaultValue={volunteerData.latesttraining}
        InputProps={{
          readOnly: true
        }}
        InputLabelProps={{
          shrink: true
        }}
      />
    </DialogContent>

    <DialogActions>
      <Button onClick={onClose} color="primary">
        Close Card
      </Button>
    </DialogActions>
  </Dialog>
);
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