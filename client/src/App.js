import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
//import NoMatch from "./Pages/NoMatch";
import Home from "./Pages/Home";
import DoctorPost from "./Pages/DoctorPost";
import Detail from "./Pages/Detail";
import About from "./Pages/About";
import Signup from "./Pages/Signup";
import Summary from "./Pages/Summary";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/blogs" component={Home} />          
            <Route exact path="/blogs/:id" component={Detail} />
            <Route exact path="/doctorpost" component={DoctorPost} />
            <Route exact path="/about" component={About} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/summary" component={Summary} />
            {/* <Route component={NoMatch} /> */}
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
