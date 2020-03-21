import React from 'react';
import MdPerson from 'react-ionicons/lib/MdPerson';
import MdClose from 'react-ionicons/lib/MdClose';
import withUser from './withUser';
import Authentication from './Authentication';

const Header = ({ user, leaveBar }) => {
  return (
    <header className = "bh-header">
      <div className="bh-header__brand"><h4>banhopper</h4></div>
      <Authentication />

    </header>
  )
}


const LayoutSide = ({ user, leaveBar, children }) => {
  console.log('user', user);
  return (
   <div className="bh-layout bh-layout--left">
    <Header user={user} leaveBar={leaveBar}/>
    <div className="bh-layout--side___content">
      { children }
    </div>
   </div>
  )
}

export default withUser(LayoutSide);
