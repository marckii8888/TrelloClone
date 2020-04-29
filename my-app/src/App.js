import React, { Component } from "react";

import "./App.css";
import TaskList from "./Components/TaskList";

import Container from "react-bootstrap/Container";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <Container className="p-3">
        <p>This is the trello clone</p>
        <TaskList />
      </Container>
    );
  }
}

export default App;
