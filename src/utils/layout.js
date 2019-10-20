import React, { Fragment, useEffect, useState } from 'react';

import Navigation from '../components/molecules/Navigation/Navigation';
import getFirebase, { FirebaseContext } from './Firebase';
import SEO from './SEO';
import '../styles/index.scss';
import { AuthUserProvider } from './Session';

const Layout = props => {
  const [firebase, setFirebase] = useState(null);

  useEffect(() => {
    const app = import('firebase/app');
    const auth = import('firebase/auth');
    const database = import('firebase/database');

    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0]);

      setFirebase(firebase);
    });
  }, []);

  return (
    <FirebaseContext.Provider value={firebase}>
      <AppWithAuthentication {...props} />
    </FirebaseContext.Provider>
  );
};

const AppWithAuthentication = ({ hideNav, seo, children }) => (
  <AuthUserProvider>
    <Fragment>
      <SEO {...seo} />
      {!hideNav && <Navigation />}
      {children}
    </Fragment>
  </AuthUserProvider>
);

export default Layout;
