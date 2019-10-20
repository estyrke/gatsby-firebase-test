import React from 'react';
import { useFirebase } from '../../../utils/Firebase';
import useResettableFormReducer from '../../../utils/useResettableFormReducer';
import PasswordForgetForm from './atoms/PasswordForgetForm';

const INITIAL_STATE = {
  email: '',
  error: null,
};

const PasswordForget = ({ className }) => {
  const [state, setFields, resetForm] = useResettableFormReducer(
    INITIAL_STATE,
  );
  const { email, error } = state;

  const firebase = useFirebase();

  const onSubmit = event => {
    firebase
      .doPasswordReset(email)
      .then(() => {
        resetForm();
      })
      .catch(error => {
        setFields({ error });
      });

    event.preventDefault();
  };

  const onChange = event => {
    setFields({ [event.target.name]: event.target.value });
  };

  const isInvalid = email === '';

  return (
    <PasswordForgetForm
      className={className}
      onSubmit={onSubmit}
      onChange={onChange}
      email={email}
      error={error}
      isInvalid={isInvalid}
    />
  );
};

export default PasswordForget;
