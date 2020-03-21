import React from 'react';
import user from '../assets/user.jpg'; // placeholder

const User = ({ displayName, photoUrl, uid }) => {

  return (
    <div className="bh-user">
      <div className="bh-user__photo">
        {user && <img src={user} alt={displayName} />}
      </div>
      <div className="bh-user__info">
        <p>{ displayName }</p>
      </div>
    </div>
  )
}

export default User;
