import { RouterProvider, Outlet } from 'react-router'
import { router } from './app.routes'

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App