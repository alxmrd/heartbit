import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import PropTypes from "prop-types";
import "../../containers/Icons.css";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import {
  setVolunteerActivity,
  idCleaner,
  editVolunteer
} from "../../store/actions/actions";
import Snackbar from "@material-ui/core/Snackbar";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  deactivateButton: {
    color: "#C62828"
  }
});
class Activity extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      openSnack: false,
      vertical: "top",
      horizontal: "center"
    };
  }

  handleClick = e => {
    e.stopPropagation();
    this.setState({ openSnack: true });
  };

  handleClose = e => {
    e.stopPropagation();
    this.setState({ openSnack: false });
    this.props.onClose();
  };

  handleActivity = (e, status) => {
    e.stopPropagation();

    const id = this.props.id;
    this.props.onSetVolunteerActivity(status, id);

    this.setState({
      openSnack: false
    });
    this.props.onClose();
  };

  render() {
    const { vertical, horizontal, openSnack } = this.state;
    const { volunteerid, status, classes } = this.props;

    return (
      <TableCell>
        {status !== "0" ? (
          <Button
            onClick={e => {
              this.handleClick(e);
              this.props.onEditVolunteer(volunteerid);
            }}
          >
            <i className="material-icons red700 md-36">person</i>
          </Button>
        ) : (
          <Button
            onClick={e => {
              this.handleClick(e);
              this.props.onEditVolunteer(volunteerid);
            }}
          >
            <i className="material-icons teal600 md-36">person</i>
          </Button>
        )}
        {status !== "0" ? (
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={openSnack}
            onClose={this.handleClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={
              <span id="message-id">
                Are you sure you want to Activate this User?
              </span>
            }
            action={[
              <Button
                color="primary"
                key="Deactivate"
                size="small"
                onClick={e => this.handleActivity(e, status)}
              >
                Activate
              </Button>,

              <Button
                key="undo"
                color="secondary"
                size="small"
                onClick={e => this.handleClose(e)}
              >
                Cancel
              </Button>
            ]}
          />
        ) : (
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={openSnack}
            onClose={this.handleClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={
              <span id="message-id">
                Are you sure you want to deactivate this User?
              </span>
            }
            action={[
              <Button
                key="Deactivate"
                className={classes.deactivateButton}
                size="small"
                onClick={e => this.handleActivity(e, status)}
              >
                Deactivate
              </Button>,

              <Button
                key="undo"
                color="secondary"
                size="small"
                onClick={e => this.handleClose(e)}
              >
                Cancel
              </Button>
            ]}
          />
        )}
      </TableCell>
    );
  }
}

Activity.propTypes = {
  status: PropTypes.string,
  volunteerid: PropTypes.string,
  onEditVolunteer: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSetVolunteerActivity: PropTypes.func.isRequired,
  id: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const ActivityWithStyles = withStyles(styles)(Activity);
const mapStateToProps = state => ({
  id: state.id
});
const mapDispatchToProps = dispatch => ({
  onClose: id => dispatch(idCleaner(id)),
  onSetVolunteerActivity: (status, id) =>
    dispatch(setVolunteerActivity(status, id)),
  onEditVolunteer: id => dispatch(editVolunteer(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityWithStyles);
