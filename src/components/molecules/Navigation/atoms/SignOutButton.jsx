import React from 'react';
import { useFirebase } from '../../../../utils/Firebase';

const SignOutButton = () => {
  const firebase = useFirebase();

  return (
    <div
      className="signout-btn"
      onClick={firebase ? firebase.doSignOut : () => {}}
    >
      Sign Out
    </div>
  );
};

export default SignOutButton;
