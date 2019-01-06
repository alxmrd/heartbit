import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2
  },
  absolute: {
    position: "fixed",
    bottom: theme.spacing.unit * 6.5,
    right: theme.spacing.unit * 3,
    boxShadow: "5px 5px  5px grey "
  }
});

function SimpleTooltips({ classes, definition, onButtonClick }) {
  return (
    <Tooltip title={definition}>
      <Button
        variant="fab"
        color="secondary"
        className={classes.absolute}
        onClick={onButtonClick}
      >
        <AddIcon />
      </Button>
    </Tooltip>
  );
}

SimpleTooltips.propTypes = {
  classes: PropTypes.object.isRequired,
  definition: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired
};

export default withStyles(styles)(SimpleTooltips);
