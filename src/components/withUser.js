import React, { useState } from 'react';
import { UserContext } from '../providers/UserProvider';
import UserProfile from './UserProfile';

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component!';
}

export const UP = () => {
  const [bar, setBar] = useState(0);

  return (
    <h1>func</h1>
  )
}

const withUser = (Component) => {

  const WrappedComponent = props => {
    console.log('return component');
    return (
      <UserContext.Consumer>
        { user => <Component user={user} {...props} /> }
      </UserContext.Consumer>
    );
  }

  WrappedComponent.displayName = `WithUser(${getDisplayName(WrappedComponent)})`
  return WrappedComponent;
}

export default withUser;
