import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Pages/Home';
import DoctorPost from "./Pages/DoctorPost";
import Detail from './Pages/Detail';
import About from "./Pages/About";
import Signup from './Pages/Signup';

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/doctorpost" component={DoctorPost} />
                <Route exact path="/detail" component={Detail} />
                <Route exact path="/about" component={About} />
                <Route exact path="/signup" component={Signup} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
