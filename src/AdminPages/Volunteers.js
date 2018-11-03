import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { PostData } from "../containers/PostData";
import SimpleToolips from "../components/SimpleTooltips";
import VolunteerDialog from "../components/VolunteerComponents/VolunteerDialog";
import VolunteerTable from "../components/VolunteerComponents/VolunteerTable";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/postActions";
import { volunteers } from "../dummyData/volunteers";

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
  componentWillMount() {
    // console.log("componentWillMount");
    this.props.fetchPosts();
  }
  render() {
    const { classes, onClick } = this.props;

    return (
      <Paper className={classes.root}>
        <div onClick={onClick}>SKATA</div>
        <VolunteerTable tabledata={this.props.data} />
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
        />
      </Paper>
    );
  }
}

Volunteer.propTypes = {
  classes: PropTypes.func.isRequired,
  fetchPosts: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired
};

const VolunteerWithStyles = withStyles(styles)(Volunteer);

// Container !!
const mapStateToProps = state => ({
  posts: state.posts.items,
  data: state.volunteers
});

const updateVolunteers = dispatch => {
  fetch(`http://localhost:8080/api/volunteers`)
    .then(result => result.json())
    .then(volunteers =>
      dispatch({
        type: "UPDATE_VOLUNTEERS",
        payload: volunteers
      })
    );
};

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => updateVolunteers(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VolunteerWithStyles);
