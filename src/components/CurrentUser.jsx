import React from 'react';
import { signOut } from '../firebase.js';
import { Link } from 'react-router-dom';
import MdLogOut from 'react-ionicons/lib/MdLogOut';

// import { menu } from '../../language/content';
// const lang = 'bg';

const CurrentUser = ({ displayName, photoUrl, email, createdAt, children }) => {
  return (
    <section className="urb-auth__user">

      <div className="urb-user__photo">
        {photoUrl && <img src={photoUrl} alt={displayName} />}
      </div>
      <div className="urb-user__info">
        <p>{ displayName }</p>
      </div>
      <div className="urb-user__actions">
        <button onClick={signOut} className = "urb-user__logout urb-button urb-button--simple">
          signout
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
