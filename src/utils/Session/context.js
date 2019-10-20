import React, {useRef, useState, useEffect, useContext} from 'react';
import { FirebaseContext } from '../Firebase';
import { navigate } from 'gatsby';
import { SIGN_IN } from '../../constants/routes';
import EmailVerification from './EmailVerification';

const AuthUserContext = React.createContext(null);

export const AuthUserProvider = props => {
  const _initFirebase = useRef(false);

  const [authUser, setAuthUser] = useState(null);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (firebase && !_initFirebase.current) {
      _initFirebase.current = true;

      return firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          setAuthUser(authUser);
        },
        () => {
          localStorage.removeItem('authUser');
          setAuthUser(null);
        },
      );
    }
  });

  // Set authUser from local storage after first render
  useEffect(() => {
    setAuthUser(JSON.parse(localStorage.getItem('authUser')));
  }, []);

  return (
    <AuthUserContext.Provider value={authUser}>
      {props.children}
    </AuthUserContext.Provider>
  );
};

export const AuthorizationRequired = ({condition, children}) => {
  const _initFirebase = useRef(false);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (firebase && !_initFirebase.current) {
      _initFirebase.current = true;

      return firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            navigate(SIGN_IN);
          }
        },
        () => navigate(SIGN_IN),
      );
    }
  });

  const authUser = useContext(AuthUserContext);

  return condition(authUser) ? <EmailVerification>{children}</EmailVerification> : null;
};

export const useAuthUser = () => useContext(AuthUserContext);

export default AuthUserContext;
