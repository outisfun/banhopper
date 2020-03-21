import React, { useContext } from 'react';
import CurrentUser from './CurrentUser';
import SignInAndSignUp from './SignInAndSignUp';
import { UserContext } from '../providers/UserProvider';

const Wtf = ({ user }) => {
  console.log('user is ', user.user);
  return (
    <h1>user</h1>
  )
}

const Authentication = ({ loading }) => {

  const user = useContext(UserContext);
  if (loading) return null;

  return (
    //<div>{user ? <CurrentUser {...user} /> : <SignInAndSignUp />}</div>
    <div className="urb-auth">

      {(user !== null) ? <CurrentUser {...user} /> : <SignInAndSignUp />}

    </div>
  );

};

export default Authentication;
