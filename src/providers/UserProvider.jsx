import React, { Component, createContext } from 'react';
import { auth, createUserProfileDocument } from '../firebase.js';

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null,
    currentBar: null
  }

  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({ user: { uid: snapshot.id, ...snapshot.data() }})
        });
      }

      this.setState({ user: userAuth })
    });
  }

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  }

  enterBar = (id) => {
    this.setState({
      currentBar: id
    })
  }

  render() {
    let { user } = this.state;
    user && (user.currentBar = this.state.currentBar);
    user && (user.enterBar = this.enterBar);
    const { children } = this.props;

    return (
      <UserContext.Provider value = {user}>{children}</UserContext.Provider>
    )
  }
}

export default UserProvider;
