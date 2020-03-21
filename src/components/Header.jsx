import React, { Component } from 'react';
import { Sticky } from 'react-sticky';
import Authentication from './Authentication';

import withUser from './withUser';


const Header = ({ user }) => {
  console.log('user', user);

  // user && user.enterBar('kotka i mishka');

  return (
    <Sticky topOffset={0}>
      {({ style }) => (
        <header className = "fb-header" style={style}>
          <div className="fb-header__brand">banhopper</div>
          <Authentication />
        </header>
      )}
    </Sticky>
  )
}

export default withUser(Header);
