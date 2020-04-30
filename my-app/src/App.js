import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import TaskList from "./Components/TaskList";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasklist: [],
      newCard: "",
    };
  }
  async componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/cards/").then((res) => {
      this.setState({ tasklist: res.data });
    });
  }
  handleAddCard = (e) => {
    console.log(this.state.newCard);
    return axios
      .post("http://127.0.0.1:8000/api/cards/", {
        title: this.state.newCard,
        tasks: [],
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Container fluid>
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
            <Form onSubmit={this.handleAddCard}>
              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Col sm="20">
                  <Form.Control
                    placeholder="Add another list"
                    name="newCard"
                    onChange={this.handleInputChange}
                  />
                </Col>
                <Col>
                  <Button variant="light" type="submit">
                    Add
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
