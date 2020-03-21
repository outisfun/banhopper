import React, { Component, createContext } from 'react';
import { firestore } from '../firebase.js';
import { collectIdsAndDocs } from '../utilities.js';

import _ from 'lodash';
import { withRouter } from 'react-router-dom';

export const BarsContext = createContext();

class BarsProvider extends Component {
  state = {
    bars: []
  }

  unsubscribeFromFirestore = null;

  componentDidMount = () => {
    this.unsubscribeFromFirestore = firestore.collection('bars').onSnapshot(snapshot => {
      console.log(snapshot);
      let bars = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ bars });
    });
  }

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  }

  render() {
    console.log('barsss', this.state);
    const { bars } = this.state;
    const { children } = this.props;
    return (
      <BarsContext.Provider value={bars}>{children}</BarsContext.Provider>
    )
  }
}

export default withRouter(BarsProvider);
