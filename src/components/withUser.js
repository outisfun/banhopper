import React, { useState } from 'react';
import { UserContext } from '../providers/UserProvider';
import UserProfile from './UserProfile';

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component!';
}

const withUser = (Component) => {

  const WrappedComponent = props => {
    return (
      <UserContext.Consumer>
        { user => <Component {...user} {...props} /> }
      </UserContext.Consumer>
    );
  }

  WrappedComponent.displayName = `WithUser(${getDisplayName(WrappedComponent)})`
  return WrappedComponent;
}

export default withUser;
