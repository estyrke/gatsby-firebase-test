import React, { useState } from 'react';
import {
  FaFacebookF,
  FaGithub,
  FaGoogle,
  FaTwitter,
} from 'react-icons/fa';
import { useFirebase } from '../../../../../utils/Firebase';
import { useAuthUser } from '../../../../../utils/Session';
import SocialLoginToggle from './atoms/SocialLoginToggle';

const SIGN_IN_METHODS = [
  {
    id: 'google.com',
    provider: 'googleProvider',
    name: 'google',
    Icon: FaGoogle,
  },
  {
    id: 'facebook.com',
    provider: 'facebookProvider',
    name: 'facebook',
    Icon: FaFacebookF,
  },
  {
    id: 'twitter.com',
    provider: 'twitterProvider',
    name: 'twitter',
    Icon: FaTwitter,
  },
  {
    id: 'github.com',
    provider: 'githubProvider',
    name: 'github',
    Icon: FaGithub,
  },
];

const LoginManagement = props => {
  const [activeSignInMethods, setActiveSignInMethods] = useState([]);
  const [error, setError] = useState(null);

  const authUser = useAuthUser();

  const fetchSignInMethods = (firebase) => {
    firebase.auth
      .fetchSignInMethodsForEmail(authUser.email)
      .then(activeSignInMethods => {
        setActiveSignInMethods(activeSignInMethods);
        setError(null);
      })
      .catch(error => setError(error));
  };

  const firebase = useFirebase(fetchSignInMethods);

  const onSocialLoginLink = provider => {
    firebase.auth.currentUser
      .linkWithPopup(firebase[provider])
      .then(fetchSignInMethods)
      .catch(error => setError(error));
  };

  const onUnlink = providerId => {
    firebase.auth.currentUser
      .unlink(providerId)
      .then(fetchSignInMethods)
      .catch(error => setError(error));
  };

  const { className } = props;

  return (
    <div className={className}>
      <p>Sign In Methods</p>
      <div>
        {SIGN_IN_METHODS.map(signInMethod => {
          const onlyOneLeft = activeSignInMethods.length === 1;
          const isEnabled = activeSignInMethods.includes(
            signInMethod.id,
          );

          return (
            <div key={signInMethod.id}>
              <SocialLoginToggle
                onlyOneLeft={onlyOneLeft}
                isEnabled={isEnabled}
                signInMethod={signInMethod}
                onLink={onSocialLoginLink}
                onUnlink={onUnlink}
              />
            </div>
          );
        })}
      </div>
      {error && error.message}
    </div>
  );
};

export default LoginManagement;
