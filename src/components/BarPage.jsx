import React, { Component, useContext } from 'react';
import { firestore } from '../firebase.js';
import { withRouter } from 'react-router-dom';
import withUser from './withUser';
import MdPin from 'react-ionicons/lib/MdPin';
import MdClose from 'react-ionicons/lib/MdClose';

const menuItems = [
  {
    name: 'Wine',
    price: 4,
    credits: 20
  },
  {
    name: 'Beer',
    price: 2.5,
    credits: 12
  },
  {
    name: 'Vodka',
    price: 6,
    credits: 30
  },
  {
    name: 'Whiskey',
    price: 7,
    credits: 35
  }
]

class BarPage extends Component {

  state = {

  }

  _buyDrink(index) {
    const { buyDrink } = this.props;
    const drink = menuItems[index];
    buyDrink(drink);
  }
  buyDrink = this._buyDrink.bind(this);

  render() {
    console.log('bar page props ', this.props);
    return (
      <div className="bh-bar">
        <div className="bh-bar__indoors">
        </div>
        <div className="bh-bar__menu">
          <h6>Menu</h6>
          <ul>
            { menuItems.map((menuItem, index) => {
              return (
                  <button onClick={() => { this.buyDrink(index) }}
                    className="bh-btn bh-btn--full"
                    data-credits={menuItem.credits}
                    data-price={menuItem.price}>
                    {menuItem.name}
                  </button>
                );
            })}
          </ul>
        </div>
      </div>
    )
  }
};


export default withUser(BarPage);
