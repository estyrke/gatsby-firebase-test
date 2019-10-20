import React from 'react';
import { useFirebase } from '../../../utils/Firebase';
import useResettableFormReducer from '../../../utils/useResettableFormReducer';
import PasswordChangeForm from './molecules/PasswordChangeForm';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const PasswordChange = ({ className }) => {
  const [state, setFields, resetForm] = useResettableFormReducer(
    INITIAL_STATE,
  );
  const { passwordOne, passwordTwo, error } = state;
  const firebase = useFirebase();

  const onSubmit = event => {
    firebase
      .doPasswordUpdate(passwordOne)
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

  const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

  return (
    <PasswordChangeForm
      className={className}
      passwordOne={passwordOne}
      passwordTwo={passwordTwo}
      error={error}
      isInvalid={isInvalid}
      onSubmit={onSubmit}
      onChange={onChange}
    />
  );
};

export default PasswordChange;
