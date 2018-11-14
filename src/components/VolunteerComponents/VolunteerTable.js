import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

const VolunteerTable = ({ classes, tabledata, onEditClick, onRowClick }) => (
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
          <TableCell>Delete Volunteer</TableCell>
          <TableCell>Edit Volunteer</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tabledata.map(function(item, key) {
          return (
            <TableRow key={item.id} onClick={() => onRowClick(item.id)} hover>
              <TableCell>{item.username}</TableCell>

              <TableCell>{item.name}</TableCell>
              <TableCell>{item.surname}</TableCell>
              <TableCell>{item.email}</TableCell>

              <TableCell>{item.dateofbirth}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>
                <DeleteIcon />
              </TableCell>
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

VolunteerTable.propTypes = {
  tabledata: PropTypes.array.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(VolunteerTable);
