import React from 'react';
import useResettableFormReducer from '../../../../../../utils/useResettableFormReducer';
import Button from '../../../../../atoms/Button';
import Input from '../../../../../atoms/Input';

const INITIAL_STATE = { passwordOne: '', passwordTwo: '' };

const DefaultLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink,
}) => {
  const [state, setFields, resetForm] = useResettableFormReducer(INITIAL_STATE);
  const { passwordOne, passwordTwo } = state;

  const onSubmit = event => {
    event.preventDefault();

    onLink(state.passwordOne);
    resetForm();
  };

  const onChange = event => {
    setFields({ [event.target.name]: event.target.value });
  };

  const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

  return isEnabled ? (
    <button
      type="button"
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
    >
      Deactivate {signInMethod.id}
    </button>
  ) : (
    <form onSubmit={onSubmit}>
      <Input
        name="passwordOne"
        value={passwordOne}
        onChange={onChange}
        type="password"
        labelName="New password"
        required
      />
      <Input
        name="passwordTwo"
        value={passwordTwo}
        onChange={onChange}
        type="password"
        labelName="Confirm New password"
        required
      />

      <Button
        disabled={isInvalid}
        type="submit"
        onClick={onSubmit}
        text={`Link ${signInMethod.id}`}
      />
    </form>
  );
};

export default DefaultLoginToggle;
