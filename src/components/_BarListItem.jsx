import React from 'react';
import MdPerson from 'react-ionicons/lib/MdPerson';
import MdClose from 'react-ionicons/lib/MdClose';

import user from '../assets/user.jpg';

const BarListItem = ({ name, description, friends, currentBarhoppers, isActive, onClick, onEnter }) => {
  const cls = isActive ? 'is--active' : '';
  console.log(currentBarhoppers);
  return (
    <div className={`bh-bars__list__item ${cls}`}>
      <div className="bh-bars__list__item__header">
        <button onClick={onClick}>
          <p className="bh-item__title">
            {name}
          </p>
          <div className="bh-item__info">
            <div className="bh-item__info__all">
              <span className="bh-label">Banhoppers:</span>
              <MdPerson className="bh-icon bh-icon--small" /><span className="count">{ currentBarhoppers && currentBarhoppers.length }</span>
            </div>
            <div className="bh-item__info__friends">
              <span className="bh-label">Friends:</span>
              { friends && friends.map((friend, index) => <div className="user-thumb-small"><img src={user} alt="Logo" /></div> )}
            </div>
          </div>
        </button>
      </div>
      <div className="bh-bars__list__item__content">
        <div className="bh-bars__list__item__content--inner">
          <p>{description}</p>
          <button onClick={onEnter}>ENTER!!!</button>
        </div>
      </div>
    </div>
  )
}

export default BarListItem;
