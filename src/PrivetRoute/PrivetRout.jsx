import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivetRout = ({children}) => {
  const { user, isLoading } = useContext(AuthContext)
  if (isLoading) {
   return <p>Loading...</p>
  }
  if (user) {
    return children
  }

  return <Navigate to='/login'></Navigate>
};

export default PrivetRout;