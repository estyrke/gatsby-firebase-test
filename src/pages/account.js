import React from 'react';
import Account from '../components/scenes/Settings/Settings';
import Layout from '../utils/layout';
import { AuthorizationRequired } from '../utils/Session';

const condition = authUser => !!authUser;
const AccountPage = () => (
  <AuthorizationRequired condition={condition}>
    <Account />
  </AuthorizationRequired>
);

export default () => (
  <Layout>
    <AccountPage />
  </Layout>
);
