import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from './withRouter';
import { Accounts } from 'meteor/accounts-base';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleRegistration = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = this.state;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()\-_=+~<>?/{}[\]]{8,}$/;

    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    if (password === confirmPassword) {
      if (!passwordRegex.test(password)) {
        toast.warning(
          'Password must have at least 8 characters, one uppercase letter, one lowercase letter, and one number',
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          },
        );
      } else {
        Accounts.createUser({ profile: { firstName, lastName }, email, password }, (err) => {
          if (err) {
            alert(err.reason);
          } else {
            toast.success('Success Registration', {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
            this.setState({
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: '',
            });
          }
        });
      }
    } else {
      toast.warning("Password don't match", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  render() {
    const { firstName, lastName, email, password, confirmPassword } = this.state;

    return (
      <div className='login-container'>
        <div className='login-wrapper'>
          <h1>Sign Up</h1>
          <form onSubmit={this.handleRegistration}>
            <div className='input-wrap'>
              <input
                type='text'
                name='firstName'
                value={firstName}
                placeholder='First Name'
                onChange={this.handleInputChange}
                required
              />
              <input
                type='text'
                name='lastName'
                value={lastName}
                placeholder='Last Name'
                onChange={this.handleInputChange}
                required
              />
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
              <input
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                placeholder='Confirm Password'
                onChange={this.handleInputChange}
                required
              />
              <div className='link-register'>
                <Link to='/login'>Let's sign in!</Link>
              </div>
            </div>
            <button className='login-btn' type='submit'>
              Register
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(withTracker(() => {})(Registration));
