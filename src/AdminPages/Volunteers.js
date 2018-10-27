import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { PostData } from "../containers/PostData";
import SimpleToolips from "../components/SimpleTooltips";
import VolunteerDialog from "../components/VolunteerComponents/VolunteerDialog";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },

  table: {
    minWidth: 700
  },

  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class Volunteer extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      data: [],
      open: false,
      username: "",
      email: "",
      dateofbirth: "",
      latesttraining: "",
      tel1: "",
      tel2: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleNumber = event => {
    this.setState({
      [event.target.id]: event.target.valueAsNumber
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const dataPouStelnw = {
      username: this.state.username,
      email: this.state.email,
      dateofbirth: this.state.dateofbirth,
      latesttraining: this.state.latesttraining,
      tel1: this.state.tel1,
      tel2: this.state.tel2
    };
    PostData("insert", dataPouStelnw)
      .then(result => {
        let responseJson = result;
        console.log(responseJson);
        const updatedData = [...this.state.data, dataPouStelnw];
        this.setState({
          data: updatedData
        });
      })

      .catch(error => console.log("error", error));

    this.setState({ open: false });
    //axios.post('/api/login',{user: this.state});
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  loadFromServer = () => {
    fetch(`http://localhost:8080/api/volunteers`)
      .then(result => result.json())
      .then(data => this.setState({ data: data }))
      //.then(parsedJSON => console.log("parsedJSON", parsedJSON))
      .catch(error => console.log("error", error));
  };
  componentDidMount() {
    // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    this.loadFromServer();
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
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
            {this.state.data.map(function(item, key) {
              return (
                <TableRow key={item.id}>
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
                    <EditIcon />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <SimpleToolips
          definition="Add Volunteer"
          onButtonClick={e => {
            this.handleClickOpen(e);
          }}
        />
        <VolunteerDialog
          open={this.state.open}
          onClose={this.handleClose}
          onInputChange={this.handleChange}
          onNumberChange={this.handleNumber}
          onSave={this.handleSubmit}
          // values={{
          //   username: this.state.username,
          //   email: this.state.email,
          //   dateofbirth: this.state.dateofbirth,
          //   latesttraining: this.state.latesttraining,
          //   tel1: this.state.tel1,
          //   tel2: this.state.tel2
          // }}
        />
      </Paper>
    );
  }
}
Volunteer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Volunteer);
