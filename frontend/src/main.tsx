import { createRoot } from 'react-dom/client'
import {
   createBrowserRouter,
   Navigate,
   RouterProvider
} from "react-router-dom";
import './index.css'
import App from './App.tsx'
import Welcome from './components/pages/Welcome.tsx';
import Login from './components/pages/Login.tsx';
import Registration from './components/pages/Registration.tsx';
import { AuthProvider } from './components/AuthProvider.tsx';
import UnprotectedRoute from './components/shared/UnprotectedRoute.tsx';
import Workspace from './components/pages/Workspace.tsx';
import ProtectedRoute from './components/shared/ProtectedRoute.tsx';
import Editor from './components/shared/Editor.tsx';
import { DataProvidert } from './components/DataProvidert.tsx';


const router = createBrowserRouter([
   {
      path: "/",
      element:
         <UnprotectedRoute>
            <App />
         </UnprotectedRoute>,
      children: [
         {
            path: "",
            element: <Welcome />
         },
         {
            path: "login",
            element: <Login />
         },
         {
            path: "registration",
            element: <Registration />
         },

      ],
   },
   {
      path: "/workspace",
      element:
         <ProtectedRoute>
            <DataProvidert>
               <Workspace />
            </DataProvidert>
         </ProtectedRoute>,
      children: [
         {
            path: ":id",
            element: <Editor />
         }
      ]
   },
   {
      path: "*",
      element: <Navigate to="/" />,
   },
]);

createRoot(document.getElementById('root')!).render(
   <AuthProvider>
      <RouterProvider router={router} />
   </AuthProvider>
)
