import React, { useContext } from 'react';
import { Sticky } from 'react-sticky';
import Authentication from './Authentication';
// import { UserContext } from '../providers/UserProvider';

// import withUser from './withUser';


const Header = () => {
  // const { user } = useContext(UserContext);

  return (
    <Sticky topOffset={0}>
      {({ style }) => (
        <header className = "fb-header" style={style}>
          <div className="fb-header__brand"><h4>banhopper</h4></div>
          <Authentication />
        </header>
      )}
    </Sticky>
  )
}

export default Header;
