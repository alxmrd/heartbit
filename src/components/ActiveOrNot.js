import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import PropTypes from "prop-types";
import "../containers/Icons.css";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { setVolunteerActivity } from "../store/actions/actions";
import Snackbar from "@material-ui/core/Snackbar";

class ActiveOrNot extends Component {
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
  };

  render() {
    const { vertical, horizontal, openSnack } = this.state;
    const { status, id } = this.props;

    return (
      <TableCell>
        {status !== "0" ? (
          <Button>
            <i className="material-icons red700 md-36">person</i>
          </Button>
        ) : (
          <Button onClick={e => this.handleClick(e)}>
            <i className="material-icons teal600 md-36">person</i>
          </Button>
        )}
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
              key="undo"
              color="secondary"
              size="small"
              onClick={e => this.handleClose(e)}
            >
              Cancel
            </Button>
          ]}
        />
      </TableCell>
    );
  }
}

ActiveOrNot.propTypes = {
  status: PropTypes.string,
  id: PropTypes.string
};

const mapDispatchToProps = dispatch => ({
  OnSetVolunteerActivity: (status, id) =>
    dispatch(setVolunteerActivity(status, id))
});

export default connect(mapDispatchToProps)(ActiveOrNot);
