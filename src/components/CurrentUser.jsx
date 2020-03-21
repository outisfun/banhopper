import React from 'react';
import { signOut } from '../firebase.js';
import { Link } from 'react-router-dom';
import MdLogOut from 'react-ionicons/lib/MdLogOut';

// import { menu } from '../../language/content';
// const lang = 'bg';

const CurrentUser = ({ displayName, photoUrl, email, createdAt, children, currentBar }) => {
  console.log('current bar', displayName);
  return (
    <section className="bh-user">

      <div className="bh-user__photo">
        {photoUrl && <img src={photoUrl} alt={displayName} />}
      </div>
      <div className="bh-user__info">
        <p>{ displayName }</p>
        { currentBar && <small>currently in {currentBar.name}</small> }
        <button onClick={signOut} className = "bh-btn bh-btn--link bh-btn--logout">
          <small>Log out</small>
        </button>
      </div>
    </section>
  );
};

CurrentUser.defaultProps = {
  displayName: 'Bill Murray',
  email: 'billmurray@mailinator.com',
  photoUrl: 'https://www.fillmurray.com/300/300',
  createdAt: new Date(),
};

export default CurrentUser;
