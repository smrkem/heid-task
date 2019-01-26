import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Index from '../Index/Index';
import WelcomeManager from '../Welcome/WelcomeManager';
import QuestionnairesManager from '../Questionnaires/QuestionnairesManager';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Welcome</Link>
              </li>
              <li>
                <Link to="/questionnaires/">Questionnaires</Link>
              </li>
            </ul>
          </nav>
    
          <Route path="/" exact component={WelcomeManager} />
          <Route path="/questionnaires/:index?" component={QuestionnairesManager} />
    
        </div>
      </Router>
    )
  }
}

export default AppRouter;