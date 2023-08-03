import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Client from '../../api/classes/client/Client';
import { withRouter } from './withRouter';

class Home extends Component {
  constructor(props) {
    super(props);
    Client.setWatcher(this, 'Home');
  }

  handleLogout = (e) => {
    e.preventDefault();
    Client.logout();
    this.props.navigate('/login');
  };

  render() {
    console.log(Client.user());
    Client.initiateWatch('Home');
    if (!this.props.isReady) return <h1>Please Login</h1>;
    if (Client.user())
      return (
        <div>
          <h1>Welcome {this.props.Client.profile.firstName}</h1>
          <button onClick={this.handleLogout}>Logout</button>
        </div>
      );
  }
}

export default withRouter(
  withTracker(() => {
    return { isReady: Client.init(), Client: Client.user() };
  })(Home),
);
