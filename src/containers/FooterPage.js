import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const styles = theme => ({
  footer: {
    backgroundColor: "#f5f5f5",
    opacity: "0.5",
    left: "0px",
    bottom: "0px",
    width: "100%",

    position: "fixed"
  }
});
class FooterPage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <footer className={classes.footer}>
          <Typography variant="caption" align="center" gutterBottom>
            © Developed by <i>Mironidis Alexandros</i>. Supervised by
            <i> Minas Dasygenis</i>
          </Typography>
          <Typography
            variant="caption"
            align="center"
            color="textSecondary"
            component="p"
          >
            University of Western Macedonia , Department of Informatics and
            Telecommunications Engineering.
          </Typography>
        </footer>
      </React.Fragment>
    );
  }
}

FooterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FooterPage);
