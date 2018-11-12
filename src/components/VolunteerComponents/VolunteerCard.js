import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React from "react";
import red from "@material-ui/core/colors/red";
import Dialog from "@material-ui/core/Dialog";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const styles = theme => ({
  cardHeader: {
    minHeight: "100px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

const VolunteerCard = ({ classes, props, open, onClose, scroll }) => (
  <Dialog
    open={open}
    onClose={onClose}
    scroll={scroll}
    aria-labelledby="form-dialog-title"
  >
    <CardHeader
      className={classes.cardHeader}
      avatar={
        <Avatar aria-label="Recipe" className={classes.avatar}>
          R
        </Avatar>
      }
      title="Shrimp and Chorizo Paella"
      subheader="September 14, 2016"
    />

    <Divider />

    <DialogContent>
      <Typography>
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
        scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
        laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed
        consectetur. Praesent commodo cursus magna, vel scelerisque nisl
        consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
        auctor fringilla. Cras mattis consectetur purus sit amet fermentum. Cras
        justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus,
        porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus
        magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel
        augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum
        nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque
        nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non
        metus auctor fringilla. Cras mattis consectetur purus sit amet
        fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
        commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
        sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean
        lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna,
        vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
        ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur
        purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
        at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur
        et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
        auctor. Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
        cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
        Donec ullamcorper nulla non metus auctor fringilla. Cras mattis
        consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
        facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur
        ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
        nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum
        faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur.
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
        consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
        scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue
        laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed
        consectetur. Praesent commodo cursus magna, vel scelerisque nisl
        consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
        auctor fringilla.
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Close Card
      </Button>
    </DialogActions>
  </Dialog>
);

VolunteerCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VolunteerCard);
