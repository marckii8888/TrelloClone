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

  onDragOver = (event) => {
    event.preventDefault();
  };

  onDrop = (event, tasklist) => {
    let taskid = event.dataTransfer.getData("taskid");
    axios
      .get(`http://127.0.0.1:8000/api/todos/${taskid}/`)
      .then((res) => {
        console.log(`This is what i got ${res.data.title}`);
        console.log(
          `Dropping task with id of ${taskid} to Card id ${tasklist.id}`
        );
        console.log(tasklist);
        // Delete task from todos
        axios.delete(`http://127.0.0.1:8000/api/todos/${taskid}/`);

        // Add the task again to the respective card
        const new_task = {
          title: res.data.title,
          description: res.data.description,
          completed: false,
        };
        tasklist.tasks.push(new_task);
        axios
          .put(`http://127.0.0.1:8000/api/cards/${tasklist.id}/`, {
            id: tasklist.id,
            title: tasklist.title,
            tasks: tasklist.tasks,
          })
          .then((res) => console.log(res))
          .then(() => window.location.reload(false))
          .catch((err) => console.error(err));
      })
  };

  render() {
    return (
      <Container fluid>
        <p>This is the trello clone</p>
        <Row>
          {this.state.tasklist.map((tasklist) => (
            <Col>
              {" "}
              <div
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => this.onDrop(e, tasklist)}
              >
                <TaskList
                  listid={tasklist.id}
                  header={tasklist.title}
                  tasks={tasklist.tasks}
                />
              </div>{" "}
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
