import React, { Component } from 'react';
import './App.css';
import ExperimentManager from './components/ExperimentManager/ExperimentManager'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>HEID Task</h1>
        </header>
        <div className="App-body">
          <ExperimentManager />        
        </div>
      </div>
    );
  }
}

export default App;
