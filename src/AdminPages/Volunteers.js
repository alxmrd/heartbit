import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SimpleToolips from "../components/SimpleTooltips";
import VolunteerDialog from "../components/VolunteerComponents/VolunteerDialog";
import VolunteerTable from "../components/VolunteerComponents/VolunteerTable";
import { connect } from "react-redux";
import {
  fetchVolunteers,
  newVolunteer,
  editVolunteer,
  updateVolunteer
} from "../store/actions/actions";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },

  table: {
    minWidth: 700
  },

  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
  // AppBar: {
  //   backgroundColor: "4e878c",
  //   color: "wheat"
  // }
});

class Volunteer extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      open: false,
      username: "",
      email: "",
      dateofbirth: "",
      latesttraining: "",
      tel1: "",
      tel2: "",
      onEdit: false,
      hasChanged: false
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      hasChanged: true
    });
  };

  handleNumber = event => {
    this.setState({
      [event.target.id]: event.target.valueAsNumber
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const dataPouStelnw = {
      username: this.props.volunteerData.username,
      email: this.props.volunteerData.email,
      dateofbirth: this.props.volunteerData.dateofbirth,
      latesttraining: this.props.volunteerData.latesttraining,
      tel1: this.props.volunteerData.tel1,
      tel2: this.props.volunteerData.tel2
    };

    this.props.onNewVolunteer(dataPouStelnw);

    this.setState({ open: false });
  };
  handleUpdate = event => {
    event.preventDefault();
    const dataPouStelnw = {
      username: this.state.username,
      email: this.state.email,
      dateofbirth: this.state.dateofbirth,
      latesttraining: this.state.latesttraining,
      tel1: this.state.tel1,
      tel2: this.state.tel2
    };
    const id = this.props.id;
    this.props.onUpdateVolunteer(id, dataPouStelnw);

    this.setState({ open: false });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
    this.setState({ onEdit: true });
  };

  handleEdit = () => {
    this.setState({ onEdit: false });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ hasChanged: false });
  };
  componentWillMount() {
    this.props.fetchVolunteers();

    // this.props.
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Volunteers
            </Typography>
          </Toolbar>
        </AppBar>

        <Paper className={classes.root}>
          <VolunteerTable
            tabledata={this.props.data}
            onEditClick={id => {
              this.handleClickOpen();
              this.handleEdit();
              this.props.onEditVolunteer(id);
            }}
          />
          <SimpleToolips
            definition="Add Volunteer"
            onButtonClick={e => {
              this.handleClickOpen(e);
            }}
          />
          <VolunteerDialog
            onEdit={this.state.onEdit}
            open={this.state.open}
            onClose={this.handleClose}
            onInputChange={this.handleChange}
            onNumberChange={this.handleNumber}
            onSave={this.handleSubmit}
            onUpdate={this.handleUpdate}
            hasChanged={this.state.hasChanged}
          />
        </Paper>
      </div>
    );
  }
}

Volunteer.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchVolunteers: PropTypes.func.isRequired,
  onNewVolunteer: PropTypes.func.isRequired
};

const VolunteerWithStyles = withStyles(styles)(Volunteer);

// Container !!
const mapStateToProps = state => ({
  id: state.id,
  data: state.volunteers,
  volunteerData:
    state.volunteers.filter(volunteer => volunteer.id === state.id)[0] || {}
});

const mapDispatchToProps = dispatch => ({
  fetchVolunteers: () => fetchVolunteers(dispatch),
  onNewVolunteer: dataPouStelnw => newVolunteer(dispatch, dataPouStelnw),
  onEditVolunteer: id => dispatch(editVolunteer(id)),
  onUpdateVolunteer: (id, dataPouStelnw) =>
    dispatch(updateVolunteer(id, dataPouStelnw))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VolunteerWithStyles);
