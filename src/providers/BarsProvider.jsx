import React, { Component, createContext } from 'react';
import { firestore } from '../firebase.js';
import { collectIdsAndDocs } from '../utilities.js';

import _ from 'lodash';
import { withRouter } from 'react-router-dom';

export const BarsContext = createContext();


const drinks = [
  'Wine', 'Beer', 'Cognac', 'Atlantic', 'Whiskey', 'Vodka', 'Aperol Spritz'
]

const barhoppers = [
  'Des Punkarova', 'Katerina Vaseva', 'Plamena Avramova',
  'Ksetka fon Teip', 'Fina Ste', 'Todor Mishinev', 'Roman Polanski',
  'Dimitar Tanchev', 'Mariya Karova', 'Angel Vasev', 'Slavka Manolova'
];

class BarsProvider extends Component {
  state = {
    bars: []
  }

  // bars must also know
  // which users are inside

  unsubscribeFromFirestore = null;

  componentDidMount = () => {
    this.unsubscribeFromFirestore = firestore.collection('bars').onSnapshot(snapshot => {
      let bars = snapshot.docs.map(collectIdsAndDocs);
      _.forEach(bars, (bar, index) => {
        bar.currentBarhoppers = [];
        bar.friends = [];
        let numberOfBarhoppers = _.random(barhoppers.length);
        let numberOfFriends = _.random(5);
        for (var i = 0; i < numberOfBarhoppers; i += 1) {
          let name = barhoppers[_.random(barhoppers.length - 1)];
          let drink = drinks[_.random(drinks.length) - 1];

          let banhopper = { name, drink };
          bar.currentBarhoppers.push(banhopper);
        }
        for (var i = 0; i < numberOfFriends; i += 1) {
          let name = barhoppers[_.random(barhoppers.length - 1)];
          let drink = drinks[_.random(drinks.length) - 1];

          let friend = { name, drink };
          bar.friends.push(friend);
        }
      });
      this.setState({ bars });
    });
  }

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  }

  render() {
    const { bars } = this.state;
    const { children } = this.props;
    return (
      <BarsContext.Provider value={bars}>{children}</BarsContext.Provider>
    )
  }
}

export default withRouter(BarsProvider);
