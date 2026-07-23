import { createBrowserRouter } from 'react-router';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import CreateProduct from '@/pages/CreateProduct';
import Dashboard from '@/pages/Dashboard';
import GoogleAuthSuccess from '@/pages/GoogleAuthSuccess';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Register />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/product',
    element: <CreateProduct />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/auth/google/success',
    element: <GoogleAuthSuccess />
  }
]);
