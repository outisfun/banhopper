import React, { Component, createContext } from 'react';
import { auth, createUserProfileDocument } from '../firebase.js';

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null
  }

  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    console.log('mounts provider');
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({ user: {
            uid: snapshot.id,
            ...snapshot.data(),
            currentBar: null,
            enterBar: this.enterBar
          }})
        });
      }

      this.setState({ user: userAuth })
    });
  }

  componentDidUpdate = () => {
    console.log('updated');
  }

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  }

  _enterBar = (id) => {
    console.log('enter bar!!!', id);
    let { user } = this.state;
    user.currentBar = id;

    this.setState({ user });
  }
  enterBar = this._enterBar.bind(this);

  render() {
    const { user } = this.state;
    const { children } = this.props;
    console.log('update!', this.state);
    return (
      <UserContext.Provider value = {{ user: this.state.user, enterBar: this.enterBar }}>{children}</UserContext.Provider>
    )
  }
}

export default UserProvider;
