import React, { Component } from 'react';
import './App.css';
import ExperimentManager from './components/ExperimentManager/ExperimentManager'
import Header from './components/Header/Header';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-body">
          <ExperimentManager />        
        </div>
      </div>
    );
  }
}

export default App;
