import React from 'react';
import MdPin from 'react-ionicons/lib/MdPin';
import MdClose from 'react-ionicons/lib/MdClose';

const BarMarker = ({ isActive, itemIndex, name, onEnter }) => {
  const cls = isActive ? 'is--active' : '';

  return (
    <div className = {`fb-marker ${cls}`}>
      <MdPin
        color ={isActive ? 'black' : '#32373a'}
        fontSize = {isActive ? '42px' : '24px'}
      />
      <div className="fb-marker__window">
        <button onClick={onEnter} className="bh-btn bh-btn--full bh-btn--enter">enter</button>
      </div>
    </div>
  )
}

export default BarMarker;
