import React, { useContext, useRef, useEffect } from 'react';

const FirebaseContext = React.createContext(null);

export const useFirebase = callback => {
  const _initFirebase = useRef(false);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (callback && firebase && !_initFirebase.current) {
      _initFirebase.current = true;

      return callback(firebase);
    }
  });

  return firebase;
};

export default FirebaseContext;
