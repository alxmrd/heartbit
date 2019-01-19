import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import SimpleToolips from "../components/SimpleTooltips";
import VolunteerTable from "../components/VolunteerComponents/VolunteerTable";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  fetchVolunteers,
  editVolunteer,
  idCleaner
} from "../store/actions/actions";
import Typography from "@material-ui/core/Typography";
import VolunteerCard from "../components/VolunteerComponents/VolunteerCard";
import VolunteerDialog from "../components/VolunteerComponents/VolunteerDialogs/VolunteerDialog";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class Volunteer extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      open: false,
      onEdit: false,
      searched: "",
      openCard: false
    };
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

    const id = this.props.id;
    this.props.onCloseDialog(id);
  };

  handleClickAway = () => {
    this.setState({
      open: false
    });
  };

  componentDidMount() {
    this.props.fetchVolunteers();
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.root}>
          <Toolbar>
            <i className="material-icons teal600 md-36">
              supervised_user_circle
            </i>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Εθελοντές
            </Typography>
          </Toolbar>
        </div>

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
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <VolunteerDialog
            onEdit={this.state.onEdit}
            open={this.state.open}
            onClose={this.handleClose}
          />
        </ClickAwayListener>
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
  onEditVolunteer: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  id: PropTypes.number,
  classes: PropTypes.object.isRequired
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
  onEditVolunteer: id => dispatch(editVolunteer(id)),
  onCloseDialog: id => dispatch(idCleaner(id))
});

const VolunteerWithStyles = withStyles(styles)(Volunteer);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VolunteerWithStyles);
