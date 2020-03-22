import React, { Component, useContext } from 'react';
import { firestore } from '../firebase.js';

import withUser from './withUser';
import MdPin from 'react-ionicons/lib/MdPin';
import MdClose from 'react-ionicons/lib/MdClose';

import LayoutSide from './LayoutSide';
import BarMenu from './_BarMenu';
import BarEvents from './_BarEvents';
import BarThumbnail from './_BarThumbnail';
import BarPlaylist from './_BarPlaylist';
import BarPublic from './_BarPublic';

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
      ` : 'Thank you & cheers!';
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
        <h5 className="msg">
          { message }
        </h5>
        {drink && <div className="bh-modal__order">
          <h6>Your order</h6>
          <div className="bh-modal__order__summary">
            <h5 className="order-drink">{drink.name}</h5>
            <span className="order-price">{drink.price} EUR</span>
            <span className="order-credits">{drink.credits} credits</span>
          </div>
        </div>}
      </div>
      <div className="bh-modal__footer">
        {!drink && <button onClick={onCloseClick} className="bh-btn bh-btn--full bh-btn--md bh-btn--invert">Back to bar</button> }
        {drink && <button onClick={onCloseClick} className="bh-btn bh-btn--full bh-btn--md bh-btn--cancel">Cancel</button> }
        {drink && <button onClick={onConfirmClick} className="bh-btn bh-btn--full bh-btn--md bh-btn--confirm">Confirm</button> }
      </div>
    </Modal>
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
    const { order, showModal, hasOrdered } = this.state;
    const { user, currentBar, leaveBar } = this.props;

    return (
      <div className="bh-bar">
        <LayoutSide>
          { currentBar &&
            <BarThumbnail
              id={currentBar.id}
              name={currentBar.name}
              onLeaveClick={leaveBar}
              description={currentBar.description}
              photoUrl={currentBar.imageUrls[0]} />
          }

          <BarEvents />
          <BarMenu isExpanded={hasOrdered} items={menuItems} onItemClick={this.openModal} />

        </LayoutSide>
        { currentBar &&
          <BarPublic
            id={currentBar.id}
            backgroundImage={currentBar.imageUrls[0]} /> }

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
