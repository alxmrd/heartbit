import React, { Component } from "react";
import {Table} from 'react-bootstrap';
//import "./Volunteers.css";
export default class Volunteer extends Component {
  render() {
  return (
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
  );
  }
 }