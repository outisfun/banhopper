import React from 'react';
import MdPin from 'react-ionicons/lib/MdPin';
import MdClose from 'react-ionicons/lib/MdClose';

const BarMarker = ({ isActive, itemIndex, name }) => {
  const cls = isActive ? 'is--active' : '';

  return (
    <div className = {`fb-marker ${cls}`}>
      <MdPin
        color ={isActive ? 'red' : 'blue'}
        fontSize = {isActive ? '42px' : '30px'}
      />
      <div className="fb-marker__window">
        <div className="fb-marker__window__header">
          <h5>{name}</h5>
          <button className="bh-btn bh-btn--icon"><MdClose /></button>
        </div>
        <div className="fb-marker__window__content">
          <span className="fb-label">Your friends here: </span>
        </div>
        <div className="fb-marker__window__footer">
          <button className="bh-btn bh-btn--full bh-btn--enter">enter</button>
        </div>
      </div>
    </div>
  )
}

export default BarMarker;
