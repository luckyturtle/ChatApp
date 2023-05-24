import { useContext, useEffect, useState } from 'react';
import ChatList from '../components/ChatList';
import MessageInput from '../components/MessageInput';
import Spinner from '../components/Spinner';
import { ChatContext } from '../context/ChatContext';
import { SocketContext } from '../context/SocketContext';
import { getChats } from '../api/chats';

function Chats() {
  const [isFetching, setFetching] = useState(false);
  const { chats, setChats } = useContext(ChatContext);
  const { sendMessage } = useContext(SocketContext);

  useEffect(() => {
    (async () => {
      setFetching(true);
      try {
        const chats = await getChats();
        setChats(chats);
      } catch {
        setChats([]);
      }
      setFetching(false);
    })();
  }, [setFetching, setChats]);

  const handleSendMessage = async (message: string) => {
    setFetching(true);
    await sendMessage(message);
    setFetching(false);
  };

  return (
    <div className="h-full flex-grow flex flex-col">
      {isFetching ? (
        <Spinner />
      ) : (
        <div className="flex-grow overflow-auto">
          <ChatList chats={chats} />
        </div>
      )}
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
}

export default Chats;
