import React, { useState } from 'react';
import Input from '../../../atoms/Input';
import Button from '../../../atoms/Button';

export default ({ onCreatePost }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleChange = setter => e => {
    const { value } = e.target;
    setter(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onCreatePost(title, description);
  };

  return (
    <div className="home__posts__form">
      <div className="home__posts__form__title">Add Posts</div>
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          type="text"
          value={title}
          labelName="Title"
          onChange={handleChange(setTitle)}
          required
        />
        <Input
          name="description"
          type="text"
          value={description}
          labelName="Description"
          onChange={handleChange(setDescription)}
          required
        />

        <Button className="home__posts__form__btn" type="submit" />
      </form>
    </div>
  );
};
