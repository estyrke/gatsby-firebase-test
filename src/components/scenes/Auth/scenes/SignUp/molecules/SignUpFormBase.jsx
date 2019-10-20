import { navigate } from 'gatsby';
import React from 'react';
import { HOME } from '../../../../../../constants/routes';
import { useFirebase } from '../../../../../../utils/Firebase';
import useResettableFormReducer from '../../../../../../utils/useResettableFormReducer';
import Button from '../../../../../atoms/Button';
import Input from '../../../../../atoms/Input';

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
    An account with this E-Mail address already exists.
    Try to login with this account instead. If you think the
    account is already used from one of the social logins, try
    to sign in with one of them. Afterward, associate your accounts
    on your personal account page.
  `;

const SignUpFormBase = () => {
  const [state, setFields, resetForm] = useResettableFormReducer(
    INITIAL_STATE,
  );
  const { email, passwordOne, passwordTwo, error } = state;
  const firebase = useFirebase();

  const onSubmit = event => {
    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase Realtime Database too
        return firebase.user(authUser.user.uid).set({
          username: authUser.user.displayName,
          email: authUser.user.email,
          roles: [],
        });
      })
      .then(() => {
        resetForm();
        navigate(HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        setFields({ error });
      });

    event.preventDefault();
  };

  const onChange = event => {
    setFields({ [event.target.name]: event.target.value });
  };

  const isInvalid =
    passwordOne !== passwordTwo || passwordOne === '' || email === '';

  return (
    <div>
      <Input
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        required={true}
        labelName="Email"
      />

      <Input
        name="passwordOne"
        value={passwordOne}
        onChange={onChange}
        type="password"
        required={true}
        labelName="Password"
      />

      <Input
        name="passwordTwo"
        value={passwordTwo}
        onChange={onChange}
        type="password"
        required={true}
        labelName="Confirm Password"
        className="input--no-margin"
      />

      <Button
        type="submit"
        disabled={isInvalid}
        onClick={onSubmit}
        text="Sign Up"
      />

      {error && <p>{error.message}</p>}
    </div>
  );
};

export default SignUpFormBase;
