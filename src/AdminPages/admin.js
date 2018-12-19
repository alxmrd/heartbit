import React, { Component } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { fetchAdmin } from "../store/actions/actions";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  fab: {
    margin: theme.spacing.unit * 2
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  }
});

class admin extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      data: [],
      open: false
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    this.props.onfetchAdmin();
  }

  render() {
    const { classes, admin } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>type</TableCell>
              <TableCell>name</TableCell>
              <TableCell>surname</TableCell>
              <TableCell>email</TableCell>
              <TableCell>address</TableCell>
              <TableCell>username</TableCell>
              <TableCell>password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admin.map(function(item, key) {
              return (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="item">
                    {item.id}
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.name}</TableCell>

                  <TableCell>{item.surname}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.password}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
admin.propTypes = {
  classes: PropTypes.object.isRequired,
  onfetchAdmin: PropTypes.func.isRequired,
  admin: PropTypes.array.isRequired
};
const adminWithStyles = withStyles(styles)(admin);
const mapStateToProps = state => ({
  admin: state.admin
});

const mapDispatchToProps = dispatch => ({
  onfetchAdmin: () => fetchAdmin(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(adminWithStyles);
