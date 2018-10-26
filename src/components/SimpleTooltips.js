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
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  }
});

function SimpleTooltips(props, definition, onButtonClick) {
  const { classes } = props;
  return (
    <div>
      <Tooltip title={props.definition}>
        <Button
          variant="fab"
          color="secondary"
          className={classes.absolute}
          onClick={props.onButtonClick}
        >
          <AddIcon />
        </Button>
      </Tooltip>
    </div>
  );
}

SimpleTooltips.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTooltips);
