import React from 'react';
import PostBase from '../components/scenes/Post/Post';
import Layout from '../utils/layout';

export const Post = props => {
  const {
    pageContext: { title, description },
  } = props;

  const isLoaded = props['*'] === title;

  return (
    <Layout>
      <PostBase
        title={isLoaded ? title : props['*']}
        description={description}
        isLoaded={isLoaded}
      />
    </Layout>
  );
};

export default Post;
