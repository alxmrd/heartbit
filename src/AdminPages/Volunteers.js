import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import SimpleToolips from "../components/SimpleTooltips";
import VolunteerDialog from "../components/VolunteerComponents/VolunteerDialog";
import VolunteerTable from "../components/VolunteerComponents/VolunteerTable";
import { connect } from "react-redux";
import {
  fetchVolunteers,
  newVolunteer,
  editVolunteer,
  updateVolunteer,
  idCleaner
} from "../store/actions/actions";
import Typography from "@material-ui/core/Typography";
import VolunteerCard from "../components/VolunteerComponents/VolunteerCard";

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
      hasChanged: false,
      openCard: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.volunteerData.username !== state.username) {
      return {
        username: state.username,
        email: props.volunteerData.email,
        dateofbirth: props.volunteerData.dateofbirth,
        latesttraining: props.volunteerData.latesttraining,
        tel1: props.volunteerData.tel1,
        tel2: props.volunteerData.tel2
      };
    }
    return null;
  }

  handleCardOpen = () => {
    this.setState({
      openCard: true
    });
  };
  handleCardClose = value => {
    this.setState({ openCard: false });

    const id = this.props.id;
    this.props.onCloseDialog(id);
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      hasChanged: true
    });
  };

  handleNumber = event => {
    this.setState({
      [event.target.id]: event.target.valueAsNumber,
      hasChanged: true
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

    this.props.onCloseDialog(id);

    this.setState({ open: false });
  };
  handleClickOpen = e => {
    e.stopPropagation();
    this.setState({ open: true });
    this.setState({ onEdit: true });
  };

  handleEdit = () => {
    this.setState({ onEdit: false });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ hasChanged: false });

    const id = this.props.id;
    this.props.onCloseDialog(id);
  };

  componentDidMount() {
    this.props.fetchVolunteers();
  }

  render() {
    return (
      <Fragment>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Volunteers
          </Typography>
        </Toolbar>

        <VolunteerTable
          tabledata={this.props.data}
          onEditClick={(e, id) => {
            this.handleClickOpen(e);
            this.handleEdit();
            this.props.onEditVolunteer(id);
          }}
          onRowClick={id => {
            this.handleCardOpen();
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
        <VolunteerCard
          open={this.state.openCard}
          onClose={this.handleCardClose}
          scroll={this.state.scroll}
        />
      </Fragment>
    );
  }
}

Volunteer.propTypes = {
  fetchVolunteers: PropTypes.func.isRequired,
  onNewVolunteer: PropTypes.func.isRequired,
  onEditVolunteer: PropTypes.func.isRequired,
  onUpdateVolunteer: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  id: PropTypes.string
};

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
    dispatch(updateVolunteer(id, dataPouStelnw)),
  onCloseDialog: id => dispatch(idCleaner(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Volunteer);
