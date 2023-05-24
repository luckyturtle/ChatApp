import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import Chats from './views/Chats';
import Login from './views/Login';
import Root from './layouts/Root';
import { SocketProvider } from './context/SocketContext';
import useSocketMessage from './hooks/useSocketMessage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'chat',
        element: <Chats />,
      },
    ],
  },
]);

function App() {
  const { onMessage } = useSocketMessage();

  return (
    <SocketProvider onMessage={onMessage}>
      <>
        <RouterProvider router={router} />
        <ToastContainer />
      </>
    </SocketProvider>
  );
}

export default App;
