import React, { createContext, Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      tasks : [],
      task: "",
      description: "",
    }
  }

  async componentDidMount(){
    const response = await fetch('api/todolist/')
    const json = await response.json()
    this.setState({tasks:json})
  }

  handleTaskChange = e =>{
    this.setState({task: e.target.value});
 }

 handleDescriptionChange = e => {
  this.setState({description: e.target.value});
}
createTask = () => {
  console.log(this.state.task);
  console.log(this.state.description);
  fetch('api/todolist/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'title': this.state.task,
      "description": this.state.description,
      "completed": false
    })
  })
}
  render(){
  return (
    <div>
      <p>This is the trello clone</p>
      <ul>
        {this.state.tasks.map(task =>(
          <li>
            {task.title} : {task.description}
          </li>
        ))}
      </ul>
      <form>
        <label for="task">Task</label>
        <input id="task_field"type="text" name="task" onChange={this.handleTaskChange}/>
        <label for="description">Description</label>
        <input type="text" size="40" name="description" onChange={this.handleDescriptionChange}/>
        <button type="button" onClick={this.createTask}>Add</button>
      </form>
    </div>
  );
  }
}

export default App;
