import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import {PostData} from "/Users/alxmrd/projects/heartbit/src/containers/PostData.js";
//import axios from 'axios';
//import $ from 'jquery';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleChange = this.handleChange.bind(this);
  }

  

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }



  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    
  }

  handleSubmit = event => {
    
    event.preventDefault();
    PostData('login',this.state).then ((result) =>{
      let responseJson = result;
      console.log(responseJson);
      if (responseJson.status==="success"){
        // alert('Logged in');
        window.location.assign('/VolunteersPage');
        //history.push('/');
      }
      else{
        window.location.assign('/login');
      }
      
      
    }) .catch( error => console.log("error",error));
    //axios.post('/api/login',{user: this.state});
     }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}