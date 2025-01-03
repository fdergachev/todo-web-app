import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext({});

interface AuthContext {
   user: any;
   token: string;
   login: (userData: { email: string, password: string }) => void;
   logout: () => void;
   authorize: () => void;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
   const [user, setUser] = useState<{ id: string, email: string } | null>(null); // { id: "some", email: "some" }
   const [token, setToken] = useState<string | null>(null);
   // const navigate = useNavigate();

   const authorize = async () => {
      if (localStorage.getItem("site")) {
         try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/user`, {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("site")}`
               }
            });
            const res = await response.json();
            if (res) {
               const user = { id: res.id, email: res.email }
               setUser(user);
               setToken(localStorage.getItem("site"));
               return user;
            }
            throw new Error(res.message);
         } catch (err) {
            // navigate("/login");
            console.error(err);
            return null;
         }
      } else {
         // navigate("/login");
         return null;
      }
   }
   const login = async (userData: { email: string, password: string }) => {
      // Implement login logic here (e.g., API call)
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...userData, remember_me: false }),
         });
         if (response.ok) {
            const res = await response.json();
            setToken(res.accessToken);
            localStorage.setItem("site", res.accessToken);
            authorize();
            return;
         }
         return response.statusText;
      } catch (err: any) {
         console.error(err);
      }
   };

   const logout = () => {
      // Implement logout logic here
      setUser(null);
      setToken(null);
      localStorage.removeItem("site");
      // navigate("/login");
   };

   return (
      <AuthContext.Provider value={{ user, token, login, logout, authorize }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = (): any => useContext(AuthContext);