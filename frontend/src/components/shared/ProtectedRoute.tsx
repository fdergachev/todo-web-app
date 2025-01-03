import React, { PropsWithChildren, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

const ProtectedRoute = ({ children }: PropsWithChildren<{}>) => {
   const [isLoading, setIsLoading] = React.useState(true);
   const { authorize, user } = useAuth();
   const [userCurrent, setUserCurrent] = React.useState<any>(null);
   useEffect(() => {
      if (user) {
         setUserCurrent(user);
         setIsLoading(false);
      } else
         authorize().then((user: any) => {
            setUserCurrent(user);
            setIsLoading(false);
         });
   }, []);
   if (localStorage.getItem("site")) {
   }
   if (isLoading) {
      return <div>Loading...</div>
   }

   if (!userCurrent) {
      return <Navigate to="/login" replace />;
   }
   return children;
};

export default ProtectedRoute;