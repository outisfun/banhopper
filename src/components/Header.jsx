import React, { useContext } from 'react';
import { Sticky } from 'react-sticky';
import Authentication from './Authentication';
import { UserContext } from '../providers/UserProvider';

// import withUser from './withUser';


const Header = () => {
  const user = useContext(UserContext);
  const bar = user ? user.currentBar : 'barrr';
  console.log('my user', user);
  return (
    <Sticky topOffset={0}>
      {({ style }) => (
        <header className = "fb-header" style={style}>
          <div className="fb-header__brand">{bar}</div>
          <Authentication />
        </header>
      )}
    </Sticky>
  )
}

export default Header;
