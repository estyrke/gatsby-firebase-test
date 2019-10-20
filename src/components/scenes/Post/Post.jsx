import React from 'react';
import { useFirebase } from '../../../utils/Firebase';

const Post = ({ isLoaded, title, description }) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  const getPost = (firebase) => {
    firebase
      .post({ title })
      .get()
      .then(result => {
        setPost(result.docs[0].data());
        setLoading(false);
      });
  };

  useFirebase(getPost);

  const finalDescription = isLoaded
    ? description
    : post && post.description;

  if (!isLoaded && loading) return null;

  return (
    <div className="post container">
      <h1>{title}</h1>
      <div>{finalDescription}</div>
    </div>
  );
};

export default Post;
