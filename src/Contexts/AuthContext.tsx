import { any } from '@hapi/joi';
import React, { useState, useContext, useEffect } from 'react';
import { auth } from '../middleware/Firebase/Auth';

interface IAuth {
  currentUser: any;
}

const AuthContext = React.createContext<IAuth>({} as IAuth);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value: IAuth = { currentUser };
  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
};
