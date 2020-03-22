import React, { Component } from 'react';
import { signOut } from '../firebase.js';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import MdLogOut from 'react-ionicons/lib/MdLogOut';

// import { menu } from '../../language/content';
// const lang = 'bg';

class CurrentUser extends Component {

  async _handleSignOut(event) {
    event.preventDefault();

    try {
      await signOut();
      console.log('log out!');
      // console.log('this is ', this);
      this.props.history.push("/");
    } catch (e) {
      alert(e.message);
    }
  }
  handleSignOut = this._handleSignOut.bind(this);

  render() {
    const { displayName, photoUrl } = this.props;
    return (
      <section className="bh-user">

        <div className="bh-user__photo">
          {photoUrl && <img src={photoUrl} alt={displayName} />}
        </div>
        <div className="bh-user__info">
          <p>{ displayName }</p>
          <button onClick={this.handleSignOut} className = "bh-btn bh-btn--link bh-btn--logout">
            <small>Log out</small>
          </button>
        </div>
      </section>
    );
  }
};

CurrentUser.defaultProps = {
  displayName: 'Bill Murray',
  email: 'billmurray@mailinator.com',
  photoUrl: 'https://www.fillmurray.com/300/300',
  createdAt: new Date(),
};

export default withRouter(CurrentUser);
