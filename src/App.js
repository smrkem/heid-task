import React, { Component } from 'react';
import './App.css';
import AppRouter from './components/AppRouter/AppRouter';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-body">
          <AppRouter />
        </div>
      </div>
    );
  }
}

export default App;
