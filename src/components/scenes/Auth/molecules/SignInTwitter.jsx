import { navigate } from 'gatsby';
import React, { useState } from 'react';
import { FaTwitter } from 'react-icons/fa';
import { HOME } from '../../../../constants/routes';
import { useFirebase } from '../../../../utils/Firebase';

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

const SignInTwitter = () => {
  const [error, setError] = useState(null);
  const firebase = useFirebase();

  const onSubmit = event => {
    firebase
      .doSignInWithTwitter()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: [],
        });
      })
      .then(() => {
        setError(null);
        navigate(HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
        setError(error);
      });

    event.preventDefault();
  };

  return (
    <form
      className="login__content__providers__item login__content__providers__item--twitter"
      onSubmit={onSubmit}
    >
      <button type="submit">
        <FaTwitter />
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

export default SignInTwitter;
