import React, { Component } from "react";
import axios from "axios";
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
    this.state = {
      tasklist: [],
    };
  }
  async componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/cards/").then((res) => {
      this.setState({ tasklist: res.data });
    });
  }

  render() {
    return (
      <Container className="p-3">
        <p>This is the trello clone</p>
        <Row>
          {this.state.tasklist.map((tasklist) => (
            <Col>
              {" "}
              <TaskList 
              listid = {tasklist.id}
              header={tasklist.title}
              tasks = {tasklist.tasks}
               />
              {" "}
            </Col>
          ))}
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
