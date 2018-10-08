import React, { Component } from "react";
import { Table } from "react-bootstrap";

export default class asthenis extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      data: []
    };
  }

  loadFromServer = () => {
    fetch(`http://localhost:8080/api/patients`)
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
              <th>name</th>
              <th>surname</th>
              <th>address</th>
              <th>history</th>
              <th>description</th>
              <th>birthdate</th>
              <th>gender</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(function(item, key) {
              return (
                <tr key={key}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.surname}</td>
                  <td>{item.address}</td>
                  <td>{item.history}</td>
                  <td>{item.description}</td>
                  <td>{item.birthdate}</td>
                  <td>{item.gender}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
