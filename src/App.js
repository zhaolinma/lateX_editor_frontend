import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Wrapper from './components/wrapper';
const Place_holder= () =>(<div>place_holder for register</div>)
const Routes = () =>(
  <div>
            App goes here
  <Link to="/register">Register</Link>
  <Route path="/" Component={Wrapper} >
  <Route path="/register"  Component={Place_holder} />
  </Route>
  </div>
)
export default class App extends Component {
  render() {
    return (
      <Router>
        <Routes />
      </Router>
    );
  }
}
