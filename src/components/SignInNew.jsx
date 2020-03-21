import React, { Component } from 'react';
import { signInWithGoogle } from '../firebase.js';

import LogoGoogle from 'react-ionicons/lib/LogoGoogle';
// import LogoFacebook from 'react-ionicons/lib/LogoFacebook';
// import FacebookLogin from 'react-facebook-login';

// import { auth } from '../../language/content';
// const lang = 'bg';

const trulySignIn = ({ userType }) => {

}


class SignInNew extends Component {
  state = { email: '', password: '' };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ email: '', password: '' });
  };

  render() {
    const { email, password } = this.state;
    return (
      <form className="urb-form urb-signin urb-form--signin" onSubmit={this.handleSubmit}>

        <div className="urb-signin__buttons">
          <button className = "urb-button urb-button--icon" onClick = {signInWithGoogle}>
            <LogoGoogle className="urb-icon urb-icon--sm" />Sign in with Google
          </button>

        </div>
      </form>
    );
  }
}

export default SignInNew;
