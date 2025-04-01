import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Alert from './pages/Alert';
import DragAndDrop from './pages/DragAndDrop';
import Superstruct, { formAction } from './pages/Superstruct';
import Home from './pages/Home';
import Header from './components/Header';
import Main from './layouts/Main';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      children: [
        ,
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'alert',
          element: <Alert />,
        },
        {
          path: 'drag-and-drop',
          element: <DragAndDrop />,
        },
        {
          path: 'superstruct',
          element: <Superstruct />,
          action: formAction,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
