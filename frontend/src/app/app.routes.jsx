import { createBrowserRouter } from 'react-router'
import Register from './Register'
import Login from './Login'

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
  }
])