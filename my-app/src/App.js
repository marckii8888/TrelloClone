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
    const response = await fetch('/api/')
    const json = await response.json()
    this.setState({tasks:json})
  }

 handleInputChange = e =>{
    this.setState({[e.target.name]: e.target.value});
 }

//  handleDescriptionChange = e => {
//   this.setState({description: e.target.value});
// }
createTask = () => {
  const new_task = {
    "title": this.state.task,
    "description": this.state.description,
    "completed": false
  }
  console.log(JSON.stringify(new_task))
  fetch('/api/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(new_task)
  }).then(()=>{
    alert('Completed')
  }).catch(function(error){
    console.log(error)
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
        <input type="text" name="task" onChange={this.handleInputChange}/>
        <label for="description">Description</label>
        <input type="text" size="40" name="description" onChange={this.handleInputChange}/>
        <button type="button" onClick={this.createTask}>Add</button>
      </form>
    </div>
  );
  }
}

export default App;
