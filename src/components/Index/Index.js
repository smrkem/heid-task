import React, { Component } from 'react';
import { Route } from "react-router-dom";
import WelcomeManager from '../Welcome/WelcomeManager';

class Index extends Component {
  state = {
    consented: null
  }


  componentDidMount() {
    let data = localStorage.getItem('HEID_data');
    if (!data) {
      console.log('do something?');
    }    
  }

  render() {

    return (
      <div className="index">
        <Route path="/welcome/" component={() => (
          <WelcomeManager />
        )} />
      </div>
    )
  }
}

export default Index
