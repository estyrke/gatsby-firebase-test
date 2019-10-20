import React, { useState } from 'react';
import { useFirebase } from '../Firebase';
import AuthUserContext from './context';

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password');

const EmailVerification = ({ children }) => {
  const [isSent, setIsSent] = useState(false);
  const firebase = useFirebase();

  const onSendEmailVerification = () => {
    firebase.doSendEmailVerification().then(() => setIsSent(true));
  };

  return (
    <AuthUserContext.Consumer>
      {authUser =>
        needsEmailVerification(authUser) ? (
          <div className="email-verification container">
            {isSent ? (
              <p>
                E-Mail confirmation sent: Check you E-Mails (Spam
                folder included) for a confirmation E-Mail. Refresh
                this page once you confirmed your E-Mail.
              </p>
            ) : (
              <p>
                Verify your E-Mail: Click the button below, then check
                you E-Mails (Spam folder included) for a confirmation
                E-Mail or send another confirmation E-Mail.
              </p>
            )}

            <button
              type="button"
              onClick={onSendEmailVerification}
              disabled={isSent}
            >
              Send confirmation E-Mail
            </button>
          </div>
        ) : (
          <>{children}</>
        )
      }
    </AuthUserContext.Consumer>
  );
};

export default EmailVerification;
