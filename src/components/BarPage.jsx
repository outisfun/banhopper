import React, { Component, useContext } from 'react';
import { firestore } from '../firebase.js';
import { withRouter } from 'react-router-dom';
import withUser from './withUser';
import MdPin from 'react-ionicons/lib/MdPin';
import MdClose from 'react-ionicons/lib/MdClose';

import LayoutSide from './LayoutSide';

import Modal from 'react-modal';

import user from '../assets/user.jpg';
// <Link to="/"><img src={logo} alt="Logo" /></Link>
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
  },
  {
    name: 'Gin',
    price: 6,
    credits: 30
  },
  {
    name: 'Aperol Spritz',
    price: 7,
    credits: 30
  },
  {
    name: 'Soda',
    price: 2,
    credits: 5
  },
  {
    name: 'Rakia',
    price: 4,
    credits: 20
  },
  {
    name: 'Ouzo',
    price: 6,
    credits: 25
  },
  {
    name: 'Berliner Luft',
    price: 5,
    credits: 20
  },
  {
    name: 'Mint Liquor',
    price: 5,
    credits: 10
  }
];

const OrderDrinkModal = ({ drink, isOpen, onCloseClick, onConfirmClick }) => {
  const message = drink ? `
        Thank you for supporting us through difficult times!
        You are ordering ${drink.name} for ${drink.price} EUR,
        and will receive ${drink.credits} credits to use
        in better days.
      ` : 'Thank you!!!';
  return (
    <Modal
      className="bh-modal"
      ariaHideApp={false}
      isOpen={isOpen} >
      <div className="bh-modal__header">
        <h6>Orders</h6>
        <MdClose
          className = "urb-icon urb-icon--sm"
          onClick = {onCloseClick} />
      </div>
      <div className="bh-modal__content">
        <h5>
          { message }
        </h5>
      </div>
      <div className="bh-modal__footer">
        {!drink && <button onClick={onCloseClick} className="bh-btn bh-btn--full bh-btn--md bh-btn--invert">Back to bar</button> }
        {drink && <button onClick={onCloseClick} className="bh-btn bh-btn--full bh-btn--md bh-btn--invert">Cancel</button> }
        {drink && <button onClick={onConfirmClick} className="bh-btn bh-btn--full bh-btn--md bh-btn--confirm">Confirm</button> }
      </div>
    </Modal>
  )
}

const BarWelcome = ({ }) => {
  return (
    <div className="bh-bar__welcome">
      <h1>Welcome!</h1>
      <img src={user} alt="Logo" />
    </div>
  )
}

class BarPage extends Component {

  state = {
    order: null,
    showModal: false,
    hasOrdered: false
  }

  _buyDrink() {
    const { buyDrink } = this.props;
    const { order } = this.state;
    buyDrink(order);

    this.setState({
      order: null,
      hasOrdered: true // set it to expire and get reminders after a while
    })
  }
  buyDrink = this._buyDrink.bind(this);

  _openModal = (index) => {
    const drink = menuItems[index];
    this.setState({
      order: drink,
      showModal: true
    });
  }
  openModal = this._openModal.bind(this);

  _closeModal = () => {
    this.setState({
      order: null,
      showModal: false
    });
  }
  closeModal = this._closeModal.bind(this);

/*
<div className="bh-about">
            <div className="bh-about__image">
            </div>
            <div className="bh-about--inner">
              <h4 className="bh-about__name">{ currentBar && currentBar.name }</h4>
              <p className="bh-about__description">{ currentBar && currentBar.description }</p>
            </div>
          </div>*/
  render() {
    const { order, showModal } = this.state;
    const { user, currentBar, leaveBar } = this.props;

    return (
      <div className="bh-bar">
        <LayoutSide>

          <div className="bh-menu bh-left bh-left--menu">
            <div className="bh-menu__header">
              <h6 className="bh-menu__title">Menu</h6>
              <p className="bh-menu__label bh-label bh-label--price">Price</p>
              <p className="bh-menu__label bh-label bh-label--credits">Credits</p>
            </div>
            <ul>
              { menuItems.map((menuItem, index) => {
                return (
                  <button
                    key={`item--${index}`}
                    className="bh-menu__item bh-item"
                    onClick={() => { this.openModal(index); }} >
                      <p className="bh-item__title">{ menuItem.name }</p>
                      <p className="bh-item__label bh-label bh-label--price">{ menuItem.price } EUR</p>
                      <p className="bh-item__label bh-label bh-label--credits">{ menuItem.credits }</p>
                  </button>
                );
              })}
            </ul>
          </div>
          <button className="bh-btn bh-btn--leave" onClick={leaveBar}>leave</button>
        </LayoutSide>
        <BarWelcome />

        <OrderDrinkModal
          drink={order}
          isOpen={showModal}
          onCloseClick={this.closeModal}
          onConfirmClick={this.buyDrink}
        />
      </div>
    )
  }
};


export default withUser(BarPage);
