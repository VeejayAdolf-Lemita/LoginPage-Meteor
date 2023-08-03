import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Client from '../../api/classes/client/Client';
import { withRouter } from './withRouter';

class Login extends Component {
  constructor(props) {
    super(props);
    Client.setWatcher(this, 'App');
    this.state = {
      email: '',
      password: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    Client.initiateWatch('App');
    const { email, password } = this.state;
    const { isLogin } = this.props;

    if (isLogin) {
      this.props.navigate('/');
    }

    return (
      <div className='login-container'>
        <div className='login-wrapper'>
          <h1>Let's sign you in</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log('Email:', email);
              console.log('Password:', password);
              Client.loginWithPassword(email, password);
            }}
          >
            <div className='input-wrap'>
              <input
                type='email'
                name='email'
                value={email}
                placeholder='Email'
                onChange={this.handleInputChange}
                required
              />
              <input
                type='password'
                name='password'
                value={password}
                placeholder='Password'
                onChange={this.handleInputChange}
                required
              />
              <div className='link-register'>
                <Link to='/register'>I don't have an account</Link>
              </div>
            </div>
            <button className='login-btn' type='submit'>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(
  withTracker(() => {
    const isLogin = Client.User;

    return { isLogin };
  })(Login),
);
