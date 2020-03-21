import React, { useContext } from 'react';
import { Sticky } from 'react-sticky';
import Authentication from './Authentication';
import MdArrowBack from 'react-ionicons/lib/MdArrowBack';
// import { UserContext } from '../providers/UserProvider';

import withUser from './withUser';


const Header = ({ user, currentBar, leaveBar }) => {
  // const { user } = useContext(UserContext);

  return (
    <Sticky topOffset={0}>
      {({ style }) => (
        <header className = "bh-header" style={style}>
          <div className="bh-header__nav">
            { currentBar &&
              <button
                className="bh-btn bh-btn--simple"
                onClick = {leaveBar}>
                <MdArrowBack />
                Exit Bar
              </button> }
          </div>
          <div className="bh-header__brand"><h4>banhopper</h4></div>
          <Authentication />
        </header>
      )}
    </Sticky>
  )
}

export default withUser(Header);
