import React, { Component } from 'react';
import { signInWithGoogle } from '../firebase.js';
import LogoGoogle from 'react-ionicons/lib/LogoGoogle';
import { withRouter } from 'react-router-dom';

import withUser from './withUser';

class Welcome extends Component {
  // const { user } = useContext(UserContext);

  async _handleSignIn(event) {
    console.log('signing in!');
    event.preventDefault();

    try {
      await signInWithGoogle();
      this.props.history.push("/bars");
    } catch (e) {
      alert(e.message);
    }
  }
  handleSignIn = this._handleSignIn.bind(this);

  render() {
    const { user } = this.props;
    console.log(user);

    return (
      <div className="bh-welcome">
        <div className="bh-welcome--inner">
          <div className="bh-welcome__intro">
            <h4>
              <span>
                Banhopper is a web app allowing people to support their favorite bars, restaurants and eateries during lockdown.
              </span>
            </h4>
            <p>
              By virtually checking in, ordering and paying for a drink, banhoppers receive credits to use when things are back to normal,
              socialize with their friends, listen to music and participate in events.
              Venues can decide independently and transparently how credits are to be used.
            </p>
            <button className="bh-button bh-button--outline bh-button--lg bh-button--signin" onClick = {this.handleSignIn}>
              <LogoGoogle className="bh-icon bh-icon--sm" /> Sign in with Google
            </button>
          </div>
          <small className="disclaimer">
            Please note that this is a prototype built for a hackathon. The featured bars are included only as placeholders,
            and you cannot support them - yet. Also, parts of the content are only static placeholders (e.g. the 'friends' in the bars
            are actually my own friends). I'd be happy to continue building it though. If you want to get in touch, say hello@zeroattentionspan.net.
            Many thanks to Boris Mihov for his magic UX touch.
          </small>
        </div>
      </div>
    )
  }
}

export default withRouter(withUser(Welcome));
