import React, { Component } from 'react';
import './App.css';
import TaskManager from './components/TaskManager/TaskManager'
import Header from './components/Header/Header';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-body">
          <TaskManager />        
        </div>
      </div>
    );
  }
}

export default App;
