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
import IconButton from "@material-ui/core/IconButton";

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

  handleActivity = (e, volstatus) => {
    e.stopPropagation();

    const id = this.props.id;
    const sendstatus = {
      status: volstatus
    };
    this.props.onSetVolunteerActivity(sendstatus, id);

    this.setState({
      openSnack: false
    });
    this.props.onClose();
  };

  render() {
    const { vertical, horizontal, openSnack } = this.state;
    const { volunteerid, volstatus, classes } = this.props;

    return (
      <TableCell>
        {volstatus !== 0 ? (
          <IconButton
            onClick={e => {
              this.handleClick(e);
              this.props.onEditVolunteer(volunteerid);
            }}
          >
            <i className="material-icons red700 md-36">person</i>
          </IconButton>
        ) : (
          <IconButton
            onClick={e => {
              this.handleClick(e);
              this.props.onEditVolunteer(volunteerid);
            }}
          >
            <i className="material-icons teal600 md-36">person</i>
          </IconButton>
        )}
        {volstatus !== 0 ? (
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={openSnack}
            onClose={this.handleClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">Eίστε σίγουρος;</span>}
            action={[
              <Button
                color="primary"
                key="Deactivate"
                size="small"
                onClick={e => this.handleActivity(e, volstatus)}
              >
                Ενεργοποιηση
              </Button>,

              <Button
                key="undo"
                color="secondary"
                size="small"
                onClick={e => this.handleClose(e)}
              >
                Ακυρωση
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
            message={<span id="message-id">Eίστε σίγουρος;</span>}
            action={[
              <Button
                key="Deactivate"
                className={classes.deactivateButton}
                size="small"
                onClick={e => this.handleActivity(e, volstatus)}
              >
                Απενεργοποιηση
              </Button>,

              <Button
                key="undo"
                color="secondary"
                size="small"
                onClick={e => this.handleClose(e)}
              >
                Ακυρωση
              </Button>
            ]}
          />
        )}
      </TableCell>
    );
  }
}

Activity.propTypes = {
  volstatus: PropTypes.number,
  volunteerid: PropTypes.number.isRequired,
  onEditVolunteer: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSetVolunteerActivity: PropTypes.func.isRequired,
  id: PropTypes.number,
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
