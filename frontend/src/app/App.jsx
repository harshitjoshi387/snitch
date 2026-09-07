import { RouterProvider } from 'react-router';
import { router } from '@/app/app.routes';

const App = () => {
  return (
    <RouterProvider router={router}/>
  );
};

export default App;
