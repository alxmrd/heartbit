import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";

const VolunteerTable = ({ tabledata, onEditClick, onRowClick }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>id</TableCell>
        <TableCell>username</TableCell>
        <TableCell>password</TableCell>
        <TableCell>tel1</TableCell>
        <TableCell>tel2</TableCell>
        <TableCell>name</TableCell>
        <TableCell>surname</TableCell>
        <TableCell>email</TableCell>
        <TableCell>notes</TableCell>
        <TableCell>latesttraining</TableCell>
        <TableCell>dateofbirth</TableCell>
        <TableCell>address</TableCell>
        <TableCell>Delete Volunteer</TableCell>
        <TableCell>Edit Volunteer</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {tabledata.map(function(item, key) {
        return (
          <TableRow key={item.id} onClick={() => onRowClick(item.id)} hover>
            <TableCell component="th" scope="item">
              {item.id}
            </TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.password}</TableCell>
            <TableCell>{item.tel1}</TableCell>
            <TableCell>{item.tel2}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.surname}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.notes}</TableCell>
            <TableCell>{item.latesttraining}</TableCell>
            <TableCell>{item.dateofbirth}</TableCell>
            <TableCell>{item.address}</TableCell>
            <TableCell>
              <DeleteIcon />
            </TableCell>
            <TableCell>
              <Button>
                <EditIcon onClick={() => onEditClick(item.id)} />
              </Button>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);
export default VolunteerTable;

// onClick={() => onEditClick(item.id)}
