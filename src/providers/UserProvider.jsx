import React, { Component, createContext } from 'react';
import firebase, { firestore } from '../firebase.js';
import { auth, createUserProfileDocument } from '../firebase.js';
import { withRouter } from 'react-router-dom';

const _ = require('lodash');

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null,
    currentBar: null
  }

  unsubscribeFromAuth = null;

  get barId() {
    const paths = _.split(this.props.location.pathname, '/');
    if (paths[1] === 'bars' && paths[2]) {
      return paths[2];
    }
    return false;
  }

  get barRef() {
    const { id } = this.state.currentBar;
    return firestore.doc(`bars/${id}`);
  }

  get userId() {
    return this.state.user.uid;
  }

  get userRef() {
    const { uid } = this.state.user;
    return firestore.doc(`users/${uid}`);
  }

  componentDidMount = async () => {

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          let user = {
            uid: snapshot.id,
            ...snapshot.data()
          }

          if (this.barId) {
            // get also bar
            firestore.doc(`bars/${this.barId}`).get().then((doc) => {
              if (doc.exists) {
                let currentBar = doc.data();
                currentBar.id = this.barId;
                this.setState({ user, currentBar });
              }
            }).catch((error) => {
              console.log("Error getting document:", error);
            });
          } else {
            this.setState({ user });
          }
        });
      }

      // this.setState({ user: userAuth })
    });
  }

  componentDidUpdate = () => {
    console.log('updated');
  }

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  }

  // the user can:
  // enter bars
  // pay for drinks

  _enterBar = async (id) => {
    console.log('enter bar!!!', id);

    firestore.doc(`bars/${id}`).get().then((doc) => {
      if (doc.exists) {
        let { currentBar } = this.state;
        currentBar = doc.data();
        currentBar.id = id;
        this.setState({ currentBar });
        this.props.history.push('/bars/' + id);
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }
  enterBar = this._enterBar.bind(this);

  _buyDrink = (drink) => {

    const { name, price, credits } = drink;
    const { user, currentBar } = this.state;

    // add to user profile
    const incrementDrinks = firebase.firestore.FieldValue.increment(1);
    this.userRef.update({ countDrinks: incrementDrinks });

    const incrementPledges = firebase.firestore.FieldValue.increment(price);
    this.userRef.update({ countPledges: incrementPledges });

    this.userRef.collection('drinks')
      .add(drink)
      .then((docRef) => {
        console.log('user bought drink!');
      });

    // add to bar
    this.barRef.update({ countPledges: incrementPledges });

    let pledge = {
      uid: user.uid,
      credits: credits,
      price: price
    }

    this.barRef.collection('pledges')
      .add(pledge)
      .then((docRef) => {
        console.log('bar got a pledge!');
      });
  }
  buyDrink = this._buyDrink.bind(this);

  render() {

    const { user } = this.state;
    const { children } = this.props;

    return (
      <UserContext.Provider value = {{
        user: this.state.user,
        currentBar: this.state.currentBar,
        enterBar: this.enterBar,
        buyDrink: this.buyDrink
      }}>{children}</UserContext.Provider>
    )
  }
}

export default withRouter(UserProvider);
