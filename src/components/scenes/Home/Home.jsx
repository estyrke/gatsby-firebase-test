import { Link } from 'gatsby';
import React, { useState } from 'react';
import { useFirebase } from '../../../utils/Firebase';
import CreatePostForm from './atoms/CreatePostForm';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = (firebase) => {
    firebase
      .posts()
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(item => item.data());
        setPosts(data);
        setLoading(false);
      });
  };

  const firebase = useFirebase(getPosts);

  const handleCreatePost = (title, description) => {
    const newPosts = [{ title, description }, ...posts];

    setPosts(newPosts);

    firebase
      .posts()
      .add({
        title,
        description,
      })
      .catch(reason => {
        console.error(reason);
        setPosts(posts);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="home container">
      <div className="home__details">
        <h1 className="home__title">Home Page</h1>
        <p className="home__description">
          The Home Page is accessible by every signed in user.
        </p>
      </div>

      <div className="home__posts">
        <CreatePostForm onCreatePost={handleCreatePost} />

        <div className="home__posts__items">
          {posts &&
            posts.length > 0 &&
            posts.map((item, id) => (
              <div key={id} className="home__post">
                <div className="home__post__image" />
                <div className="home__post__text">
                  <Link
                    className="home__post__title"
                    to={'/post/' + item.title}
                  >
                    {item.title}
                  </Link>
                  <div className="home__post__description" key={id}>
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
