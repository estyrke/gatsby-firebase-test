import { navigate } from 'gatsby';
import React from 'react';
import { HOME } from '../../../../constants/routes';
import { useFirebase } from '../../../../utils/Firebase';
import useResettableFormReducer from '../../../../utils/useResettableFormReducer';
import Button from '../../../atoms/Button';
import Input from '../../../atoms/Input';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const SignInForm = () => {
  const [state, setFields, resetForm] = useResettableFormReducer(
    INITIAL_STATE,
  );
  const { email, password, error } = state;

  const firebase = useFirebase();

  const onSubmit = event => {
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        resetForm();
        navigate(HOME);
      })
      .catch(error => {
        setFields({ error });
      });

    event.preventDefault();
  };

  const onChange = event => {
    setFields({ [event.target.name]: event.target.value });
  };

  const isInvalid = password === '' || email === '';

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          name="email"
          value={email}
          onChange={onChange}
          type="text"
          labelName="Email"
          required
        />

        <Input
          name="password"
          value={password}
          onChange={onChange}
          type="password"
          labelName="Password"
          className="input--no-margin"
          required
        />

        <Button disabled={isInvalid} type="submit" text="Log in" />

        {error && <p>{error.message}</p>}
      </form>
    </>
  );
};

export default SignInForm;
