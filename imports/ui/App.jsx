import React, { Component } from 'react';
import Client from '../api/classes/client/Client';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';

class App extends Component {
  constructor(props) {
    super(props);
    Client.setWatcher(this, 'App');
  }
  render() {
    Client.initiateWatch('App');
    return (
      <Router>
        <Routes>
          <Route path='/' element={this.props.isReady ? <Home /> : <Login />} />
          <Route path='/login' element={!this.props.isReady ? <Login /> : <Login />} />
          <Route path='/register' element={<Registration />} />
        </Routes>
      </Router>
    );
  }
}

export default withTracker(() => {
  return { isReady: Client.user() };
})(App);
