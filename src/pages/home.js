import { graphql } from 'gatsby';
import React from 'react';
import Home from '../components/scenes/Home/Home';
import Layout from '../utils/layout';
import { AuthorizationRequired } from '../utils/Session';

const condition = authUser => !!authUser;
const HomePage = () => (
  <AuthorizationRequired condition={condition}>
    <Home />
  </AuthorizationRequired>
);

export default () => (
  <Layout>
    <HomePage />
  </Layout>
);

export const query = graphql`
  query HomeSeo {
    site {
      siteMetadata {
        home {
          defaultTitle: title
          titleTemplate
          defaultDescription: description
          siteUrl: url
          defaultImage: image
          twitterUsername
        }
      }
    }
  }
`;
