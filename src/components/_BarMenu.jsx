import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';


const BarMenu = ({ items, onItemClick }) => {

  let height = 500;

  return (
    <div className="bh-menu bh-left bh-left--menu">
      <div className="bh-menu__header">
        <h6 className="bh-menu__title">Menu</h6>
        <p className="bh-menu__label bh-label bh-label--price">Price</p>
        <p className="bh-menu__label bh-label bh-label--credits">Credits</p>
      </div>
      <Scrollbars style={{ height: 500 }}>
        <ul>
          { items.map((menuItem, index) => {
            const onClick = () => {
              onItemClick(index);
            }
            return (
              <button
                key={`item--${index}`}
                className="bh-menu__item bh-item"
                onClick={onClick} >
                  <p className="bh-item__title">{ menuItem.name }</p>
                  <p className="bh-item__label bh-label bh-label--price">{ menuItem.price } EUR</p>
                  <p className="bh-item__label bh-label bh-label--credits">{ menuItem.credits }</p>
              </button>
            );
          })}
        </ul>
      </Scrollbars>
    </div>
  )
}

export default BarMenu;
