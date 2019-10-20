import React from 'react';
import { AuthUserContext } from '../../../utils/Session';

import NavigationAuth from './atoms/NavigationAuth';
import NavigationNonAuth from './atoms/NavigationNonAuth';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

export default Navigation;
