import { createBrowserRouter } from 'react-router';
import Register from '@/features/auth/pages/Register';
import Login from '@/features/auth/pages/Login';
import GoogleAuthSuccess from '@/features/auth/pages/GoogleAuthSuccess';
import CreateProduct from '@/features/products/pages/CreateProduct';
import Dashboard from '@/features/products/pages/Dashboard';

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
