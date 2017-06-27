import React, { Component } from 'react';

export default class Greetings extends Component {
  render() {
    return (
      <h2 className="hello-world">
        <b className="hello-world__i">{this.props.name}</b>
      </h2>
    );
  }
}
