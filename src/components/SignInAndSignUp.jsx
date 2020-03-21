import React, { Component } from 'react';
// import SignIn from './SignIn';
import SignInNew from './SignInNew';
// import SignUp from './SignUp';
import Modal from 'react-modal';

// icons
import MdLogIn from 'react-ionicons/lib/MdLogIn';
import MdClose from 'react-ionicons/lib/MdClose';

// import { auth } from '../../language/content';
// const lang = 'bg';

class SignInAndSignUp extends Component {

  state = {
    showModal: false
  }

  openModal = () => {
    this.setState({ showModal: true });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    console.log('sign in and sign up');
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        width: 300,
        minHeight: '50vh',
        border: '1px solid grey',
        transform             : 'translate(-50%, -50%)'
      }
    };
    return (
      <div className="fb-signin">
        <button className="fb-signin--barhopper" onClick={this.openModal}>
          Register as a barhopper
        </button>
        <button className="fb-signin--bar" onClick={this.openModal}>
          Register as a bar
        </button>
        <Modal
          style = {customStyles}
          isOpen={this.state.showModal} >
          <div className="urb-signin__header">
            <h6>Sign in with Google</h6>
            <MdClose
              className = "urb-icon urb-icon--sm"
              onClick = {this.closeModal} />
          </div>
          <SignInNew />
        </Modal>
      </div>
    );
  }
}

export default SignInAndSignUp;
