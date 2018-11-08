import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

import SimpleToolips from "../components/SimpleTooltips";
import VolunteerDialog from "../components/VolunteerComponents/VolunteerDialog";
import VolunteerTable from "../components/VolunteerComponents/VolunteerTable";
import { connect } from "react-redux";
import {
  fetchVolunteers,
  NewVolunteer,
  editVolunteer
} from "../store/actions/actions";

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
      opendialog: false
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
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
      username: this.state.username,
      email: this.state.email,
      dateofbirth: this.state.dateofbirth,
      latesttraining: this.state.latesttraining,
      tel1: this.state.tel1,
      tel2: this.state.tel2
    };

    this.props.NewVolunteer(dataPouStelnw);

    this.setState({ open: false });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
    this.setState({ opendialog: true });
    console.log("dialog", this.state.opendialog);
    console.log(this.state.open, "open");
  };

  handleEdit = () => {
    this.setState({ opendialog: false });
    console.log(this.state.opendialog, "opendialog");
  };

  handleClose = () => {
    this.setState({ open: false });
    console.log("cancel", this.state.open);
  };
  componentWillMount() {
    this.props.fetchVolunteers();

    // this.props.
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <VolunteerTable
          tabledata={this.props.data}
          //onEditClick={this.props.onEditVolunteer}
          onEditClick={e => {
            this.handleClickOpen(e);
            this.handleEdit(e);
          }}
        />
        <SimpleToolips
          definition="Add Volunteer"
          onButtonClick={e => {
            this.handleClickOpen(e);
          }}
        />
        <VolunteerDialog
          opendialog={this.state.opendialog}
          open={this.state.open}
          onClose={this.handleClose}
          onInputChange={this.handleChange}
          onNumberChange={this.handleNumber}
          onSave={this.handleSubmit}
        />
      </Paper>
    );
  }
}

Volunteer.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchVolunteers: PropTypes.func.isRequired,
  NewVolunteer: PropTypes.func.isRequired
};

const VolunteerWithStyles = withStyles(styles)(Volunteer);

// Container !!
const mapStateToProps = state => ({
  data: state.volunteers
});

const mapDispatchToProps = dispatch => ({
  fetchVolunteers: () => fetchVolunteers(dispatch),
  NewVolunteer: dataPouStelnw => NewVolunteer(dispatch, dataPouStelnw),
  onEditVolunteer: id => dispatch(editVolunteer(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VolunteerWithStyles);
