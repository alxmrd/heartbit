import React from "react";
import TableCell from "@material-ui/core/TableCell";
import PropTypes from "prop-types";
import "../containers/Icons.css";
import { Button } from "@material-ui/core";

function ActiveOrNot({ status }) {
  return (
    <TableCell>
      <Button>
        {status !== "0" ? (
          <i className="material-icons red700 md-36">person</i>
        ) : (
          <i className="material-icons teal600 md-36">person</i>
        )}
      </Button>
    </TableCell>
  );
}

ActiveOrNot.propTypes = {
  status: PropTypes.string
};

export default ActiveOrNot;
