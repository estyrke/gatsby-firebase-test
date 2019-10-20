import React from 'react';
import { AuthUserContext } from '../../../utils/Session';
import PasswordChange from '../../molecules/PasswordChange/PasswordChange';
import PasswordForget from '../../molecules/PasswordForget/PasswordForget';
import LoginManagement from './molecules/LoginManagement/LoginManagement';

const Account = () => {
  return (
    <div className="settings container">
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <h1>Account: {authUser.email}</h1>
            <PasswordForget className="settings__password-forget" />
            <PasswordChange className="settings__password-change" />
            <LoginManagement
              className="settings__login-management"
              authUser={authUser}
            />
          </div>
        )}
      </AuthUserContext.Consumer>
    </div>
  );
};

export default Account;
