import React, { Component } from "react";
import Karta from "./karta";

export default class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false
    };
  }

  handleClick = () => {
    const nextOpenState = !this.state.open;
    this.setState({ open: nextOpenState });
  };

  render() {
    let componentToRender = (
      <Karta
        word="paparia"
        onWorkClick={() => {
          console.log("kdpsae");
          this.handleClick();
        }}
      />
    );

    return (
      <div className="Home">
        <div className="lander">
          <h1
            onClick={e => {
              console.log("onClick event: ", e);
              this.handleClick();
            }}
          >
            HeartBit
          </h1>
          <p>{this.state.open ? componentToRender : null} </p>
        </div>
      </div>
    );
  }
}
