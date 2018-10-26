import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class FormDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Volunteer</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please Insert The Username Of The Volunteer
            </DialogContentText>
            <Input
              id="username"
              name="username"
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
              autoFocus
              fullWidth
            />
            <DialogContentText>
              Please Insert The Email Of The Volunteer
            </DialogContentText>
            <TextField
              name="email"
              type="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <DialogContentText>
              Please Insert date of birth Of The Volunteer
            </DialogContentText>

            <Input
              className={classes.container}
              noValidate
              id="dateofbirth"
              label="date of birth"
              name="date of birth"
              type="date"
              onChange={this.handleChange}
            />

            <DialogContentText>
              Please Insert Latest Training Of The Volunteer
            </DialogContentText>

            <Input
              className={classes.container}
              noValidate
              id="latesttraining"
              label="Birthday"
              name="Latest Training"
              type="date"
              onChange={this.handleChange}

              // value={this.state.latesttraining}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} type="submit" color="primary">
              Insert
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
