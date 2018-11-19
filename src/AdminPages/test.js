import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  editVolunteer,
  setVolunteerActivity,
  idCleaner
} from "../../store/actions/actions";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Activity from "./Activity";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

class VolunteerTable extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      openSnack: false,
      vertical: "top",
      horizontal: "center"
    };
  }

  handleOnOffButtonClick = e => {
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
    const { classes, tabledata, onEditClick, onRowClick } = this.props;
    const { vertical, horizontal, openSnack } = this.state;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>username</TableCell>

              <TableCell>name</TableCell>
              <TableCell>surname</TableCell>
              <TableCell>email</TableCell>
              <TableCell>Birthday</TableCell>

              <TableCell>address</TableCell>
              <TableCell>Activate/Deactivate Volunteer</TableCell>
              <TableCell>Edit Volunteer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabledata.map(function(item, key) {
              return (
                <TableRow
                  key={item.id}
                  onClick={() => onRowClick(item.id)}
                  className={classes.row}
                  hover
                >
                  <TableCell>{item.username}</TableCell>

                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.surname}</TableCell>
                  <TableCell>{item.email}</TableCell>

                  <TableCell>{item.dateofbirth}</TableCell>
                  <TableCell>{item.address}</TableCell>

                  <Activity
                    status={item.status}
                    onOffClick={e => {
                      this.handleOnOffButtonClick(e);
                      // this.props.onEditVolunteer(item.id);
                    }}
                    onOnClick={(e, id) => {
                      this.handleClick(e);
                      this.props.onEditVolunteer(item.id);
                    }}
                  />
                  <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={openSnack}
                    // onClose={this.handleClose}
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
                        color="primary"
                        size="small"
                        onClick={e => this.handleActivity(e, item.status)}
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
                  <TableCell>
                    <Button onClick={e => onEditClick(e, item.id)}>
                      <EditIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

VolunteerTable.propTypes = {
  tabledata: PropTypes.array.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onEditVolunteer: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSetVolunteerActivity: PropTypes.func.isRequired,
  id: PropTypes.string
};
const VolunteerTableWithStyles = withStyles(styles)(VolunteerTable);
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
)(VolunteerTableWithStyles);
