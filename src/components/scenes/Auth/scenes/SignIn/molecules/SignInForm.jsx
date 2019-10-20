import { navigate } from 'gatsby';
import React from 'react';
import useResettableFormReducer from '../../../../../../utils/useResettableFormReducer';
import Button from '../../../../../atoms/Button';
import { HOME } from '../../../../../constants/routes';

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
        <div className="group">
          <input
            name="email"
            value={email}
            onChange={onChange}
            type="text"
            required
          />
          <span className="highlight" />
          <span className="bar" />
          <label>Email</label>
        </div>

        <div className="group group__password">
          <input
            name="password"
            value={password}
            onChange={onChange}
            type="password"
            required
          />
          <span className="highlight" />
          <span className="bar" />
          <label>Password</label>
        </div>
        <Button type="submit" text="Log in" disabled={isInvalid} />

        {error && <p>{error.message}</p>}
      </form>
    </>
  );
};

export default SignInForm;
