import React, { PropsWithChildren, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

const UnprotectedRoute = ({ children }: PropsWithChildren<{}>) => {
   const { user } = useAuth();
   if (user) {
      return <Navigate to="/workspace" replace />;
   }
   return children;
};

export default UnprotectedRoute;