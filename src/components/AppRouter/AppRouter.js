import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Index from '../Index/Index';
import WelcomeManager from '../Welcome/WelcomeManager';


const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/welcome/">Welcome</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" component={Index} />
      <Route path="/welcome/" component={WelcomeManager} />
      

    </div>
  </Router>
);

export default AppRouter;