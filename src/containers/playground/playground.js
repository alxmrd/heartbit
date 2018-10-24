import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false
    };
  }

  handleClick = () => {
    if (this.state.open === false) {
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
    }
  };

  render() {
    let componentToRender = "MyDiplomaThesis";
    if (this.state.open !== true) {
      componentToRender = "";
    }

    return (
      <div className="Home">
        <div className="lander">
          <h1 onClick={this.handleClick}>HeartBit</h1>
          <p>{componentToRender}</p>
        </div>
      </div>
    );
  }
}
