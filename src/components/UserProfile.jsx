import React, { useState } from 'react';
import { UserContext } from '../providers/UserProvider';

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component!';
}

const UserProfile = (Component) => {

  const [bar, setBar] = useState(0);

  const WrappedComponent = props => {
    return (
      <UserContext.Consumer>
        { user => <Component user={user} {...props} /> }
      </UserContext.Consumer>
    );
  }

  WrappedComponent.displayName = `WithUser(${getDisplayName(WrappedComponent)})`
  return WrappedComponent;
}

export default UserProfile;
