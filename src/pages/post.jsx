import { Router } from '@reach/router';
import React from 'react';
import Post from '../components/scenes/Post/Post';
import Layout from '../utils/layout';

const PostRouter = () => {
  return (
    <Layout>
      <Router>
        <Post path="/post/:id" />
      </Router>
    </Layout>
  );
};

export default PostRouter;
