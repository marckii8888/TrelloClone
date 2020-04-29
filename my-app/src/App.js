import React, { Component } from "react";

import "./App.css";
import TaskList from "./Components/TaskList";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className="p-3">
        <p>This is the trello clone</p>
        <Row>
          <Col>
            {" "}
            <TaskList />
            {" "}
          </Col>
          <Col>
            {" "}
            <InputGroup size="sm" className="mb-3">
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                name="description"
                placeholder="Enter task description"
                onChange={this.handleInputChange}
              />
            </InputGroup>{" "}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
