import React, { Component } from 'react';

class Index extends Component {
  state = {
    data: null
  }

  componentDidMount() {
    let data = localStorage.getItem('HEID_data');
    if (!data) {
      console.log('do something?');
    }    
  }

  render() {

    return (
      <div className="index"></div>
    )
  }
}

export default Index
