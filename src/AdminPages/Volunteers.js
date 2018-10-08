import React, { Component } from "react";
import { Table } from "react-bootstrap";

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
      .then(data => this.setState({ data: data }))
      //.then(parsedJSON => console.log("parsedJSON", parsedJSON))
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
            {this.state.data.map(function(item, key) {
              return (
                <tr key={key}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.password}</td>
                  <td>{item.tel1}</td>
                  <td>{item.tel2}</td>
                  <td>{item.name}</td>
                  <td>{item.surname}</td>
                  <td>{item.email}</td>
                  <td>{item.notes}</td>
                  <td>{item.latesttraining}</td>
                  <td>{item.dateofbirth}</td>
                  <td>{item.address}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
