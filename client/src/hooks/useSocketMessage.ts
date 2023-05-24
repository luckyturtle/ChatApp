import { useCallback, useContext } from 'react';
import { toast } from 'react-toastify';
import { ChatContext } from '../context/ChatContext';

function useSocketMessage() {
  const { addChat } = useContext(ChatContext);

  const handleReceiveMessage = useCallback((message: MessageEvent) => {
    const payload = JSON.parse(message.data);

    switch (payload?.type) {
      case 'message': {
        addChat({ ...payload?.message, date: new Date(payload?.message?.date) });
        toast.info(payload?.message?.content);
        break;
      }
    }
  }, [addChat]);

  return {
    onMessage: handleReceiveMessage
  };
}

export default useSocketMessage;
