import React, { Component, useState } from "react";
import DjangoCSRFToken from "django-react-csrftoken";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

function List(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="secondary" onClick={handleShow} block>
          {props.name}
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.description}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }


class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      task: "",
      description: "",
    };
  }

  async componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/").then((res) => {
      this.setState({ tasks: res.data });
    });
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDelete = (id, e) => {
    console.log("Hello");
    axios.delete(`http://127.0.0.1:8000/api/${id}/`);
  };

  handleFormSubmit = (e, requestType, id) => {
    //e.preventDefault()
    const title = this.state.task;
    const description = this.state.description;

    switch (requestType) {
      case "post":
        return axios
          .post("http://127.0.0.1:8000/api/", {
            title: title,
            description: description,
            completed: false,
          })
          .then((res) => console.log(res))
          .catch((err) => console.error(err));
      case "put":
        return axios
          .put(`http://127.0.0.1:8000/api/${id}/`, {
            title: title,
            description: description,
          })
          .then((res) => console.log(res))
          .catch((err) => console.error(err));
    }
  };

  handleClose = () => {
    React.useState(false);
  };
  handleShow = () => {
    React.useState(true);
  };
  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Trello Header Title</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {this.state.tasks.map((task) => (
            <ListGroupItem>
              <List name={task.title} description={task.description} />
              <form onSubmit={(e) => this.handleDelete(task.id, e)}>
                <button>Del</button>
              </form>
            </ListGroupItem>
          ))}
        </ListGroup>
        <Card.Body>
          <form onSubmit={(event) => this.handleFormSubmit(event, "post", "")}>
            <DjangoCSRFToken />
            <InputGroup size="sm" className="mb-3">
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                name="task"
                placeholder="Enter your task"
                onChange={this.handleInputChange}
              />
            </InputGroup>

            <InputGroup size="sm" className="mb-3">
              <FormControl
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                name="description"
                placeholder="Enter task description"
                onChange={this.handleInputChange}
              />
            </InputGroup>

            <Button variant="light" type="submit">
              Add
            </Button>
          </form>
        </Card.Body>
      </Card>
    );
  }
}

export default TaskList;