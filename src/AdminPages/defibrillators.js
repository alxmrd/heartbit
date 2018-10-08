import React, { Component } from "react";
import { Table } from "react-bootstrap";

export default class apinidotis extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      data: []
    };
  }

  loadFromServer = () => {
    fetch(`http://localhost:8080/api/defibrillators`)
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
              <th>installationdate</th>
              <th>upgradedate</th>
              <th>notes</th>
              <th>model</th>
              <th>presentflag</th>
              <th>locker</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(function(item, key) {
              return (
                <tr key={key}>
                  <td>{item.id}</td>
                  <td>{item.installationdate}</td>
                  <td>{item.upgradedate}</td>
                  <td>{item.notes}</td>
                  <td>{item.model}</td>
                  <td>{item.presentflag}</td>
                  <td>{item.locker}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
