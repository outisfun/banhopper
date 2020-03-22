import React, { useContext } from 'react';
import CurrentUser from './CurrentUser';
import SignInAndSignUp from './SignInAndSignUp';
import { UserContext } from '../providers/UserProvider';


const Authentication = ({ loading }) => {
  const { user } = useContext(UserContext);
  if (loading) return null;
  return (
    //<div>{user ? <CurrentUser {...user} /> : <SignInAndSignUp />}</div>
    <div className="bh-auth">
      {(user !== null) ? <CurrentUser {...user} /> : <span>log in</span>}
    </div>
  );
};

export default Authentication;
