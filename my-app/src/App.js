import React, { createContext, Component } from 'react';
import DjangoCSRFToken from 'django-react-csrftoken';
import axios from 'axios'
import './App.css';

import Button from 'react-bootstrap/Button';

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
    axios.get('http://127.0.0.1:8000/api/api/')
    .then(res =>{
      this.setState({tasks: res.data})
    })
  }

 handleInputChange = e =>{
    this.setState({[e.target.name]: e.target.value});
 }

 handleDelete = (id, e) => {
   console.log(id);
  axios.delete(`http://127.0.0.1:8000/api/api/${id}/`);
 }

 handleFormSubmit = (e, requestType, id) => {
   //e.preventDefault()
   const title = this.state.task
   const description = this.state.description

   switch ( requestType ) {
     case 'post':
       return axios.post('http://127.0.0.1:8000/api/api/',{
         title: title,
         description: description
       }).then(res => console.log(res))
       .catch(err => console.error(err))
     case 'put':
      return axios.put(`http://127.0.0.1:8000/api/api/${id}/`,{
        title: title,
        description: description
      }).then(res => console.log(res))
      .catch(err => console.error(err))
   }
 }

  render(){
  return (
    <div>
      <p>This is the trello clone</p>
      <ul>
        {this.state.tasks.map(task =>(
          <li>
            {task.title} : {task.description}
            <form onSubmit={(e) => this.handleDelete(task.id, e)}>
              <button>delete</button>
            </form>
          </li>
        ))}
      </ul>
      <form onSubmit={(event) => this.handleFormSubmit(
        event,
        'post',
        '',
         )}>
        <DjangoCSRFToken/>
        <label for="task">Task</label>
        <input type="text" name="task" onChange={this.handleInputChange}/>
        <label for="description">Description</label>
        <input type="text" size="40" name="description" onChange={this.handleInputChange}/>
        <button>Add</button>
      </form>
    </div>
  );
  }
}

export default App;
