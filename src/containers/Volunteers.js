import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { volunteers } from "../pages/volunteers/moufaData";

console.log("volunteers", volunteers);

export default class Volunteer extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      data: []
    };
  }

  loadFromServer = () => {
    fetch(`http://localhost:8080/api/volunteers`)
      .then(result => result.json())
      .then(parsedJSON => console.log("parsedJSON", parsedJSON))
      .catch(error => console.log("error", error));
  };
  componentDidMount() {
    // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    this.loadFromServer();
  }

  render() {
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>id</th>
              <th>username</th>
              <th>password</th>
              <th>tel1</th>
              <th>tel2</th>
              <th>name</th>
              <th>surname</th>
              <th>email</th>
              <th>notes</th>
              <th>latesttraining</th>
              <th>dateofbirth</th>
              <th>address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>alex</td>
              <td>test</td>
              <td>35235</td>
              <td>25535</td>
              <td> alex</td>
              <td>alex</td>
              <td> alexmrd1@hotmail.com</td>
              <td>dgadg</td>
              <td>2018-05-14</td>
              <td>2017-05-09</td>
              <td>sbsdbsdba</td>
            </tr>
            <tr>
              <td>2</td>
              <td>joey</td>
              <td>1234</td>
              <td>696969</td>
              <td> null</td>
              <td>joey</td>
              <td> tribbiani</td>
              <td>asasas@gmail.com</td>
              <td>null</td>
              <td>2018-06-04</td>
              <td>2018-06-28</td>
              <td>asdfadsgad</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
