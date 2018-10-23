import React from 'react'
import './Header.css';

const Header = () => (
  <header className="App-header">
    <h1>HEID task</h1>
    <div className="header-links">
      <a className="active" href="http://heid-task-app.s3-website-us-east-1.amazonaws.com/">HEID task</a>
      <a href="http://ms-heid-survey.s3-website-us-east-1.amazonaws.com/">Survey Prototype</a>
      <a href="http://ms-mid-task.s3-website-us-east-1.amazonaws.com/">Staircase Prototype</a>
    </div>
  </header>
)

export default Header