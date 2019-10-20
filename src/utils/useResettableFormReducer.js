import { useReducer } from 'react';

const useResettableFormReducer = initialState => {
  const reducer = (state, action) => {
    if (action.type === '__reset') {
      return initialState;
    }

    const result = { ...state };
    result[action.type] = action.value;
    return result;
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const resetForm = () => dispatch({ type: '__reset' });
  const setFields = fields =>
    Object.keys(fields).forEach(k =>
      dispatch({ type: k, value: fields[k] }),
    );

  return [state, setFields, resetForm];
};

export default useResettableFormReducer;
