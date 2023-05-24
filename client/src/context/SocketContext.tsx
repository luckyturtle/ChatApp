import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { socketUrl } from '../config';
import { getToken } from '../utils/storage';

interface SocketProviderProps {
  children: React.ReactNode;
  onMessage: (ev: MessageEvent) => void;
}

const INITIAL_STATE: {
  socket: null | WebSocket;
  sendMessage: (message: string) => void;
} = {
  socket: null,
  sendMessage: () => {}
};

export const SocketContext = createContext(INITIAL_STATE);

export const SocketProvider = ({ children, onMessage }: SocketProviderProps) => {
  const socket = useRef<null | WebSocket>(null);

  useEffect(() => {
    socket.current = new WebSocket(socketUrl);
    socket.current.addEventListener('message', onMessage);

    return () => {
      if (socket.current) {
        socket.current.removeEventListener('message', onMessage);
        if(socket.current.readyState === 1) {
          socket.current.close();
        }
      }
    };
  }, [onMessage]);

  const sendMessage = useCallback((message: string) => {
    if (socket.current) {
      socket.current.send(JSON.stringify({ type: 'message', data: message, token: getToken() }));
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socket.current, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useWebSocketMain = () => useContext(SocketContext);
