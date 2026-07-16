import { createBrowserRouter } from 'react-router'
import Register from '../features/auth/pages/Register'
import Login from '../features/auth/pages/Login'
import GoogleAuthSuccess from './GoogleAuthSuccess'

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
    path: '/auth/google/success',
    element: <GoogleAuthSuccess />
  }
])