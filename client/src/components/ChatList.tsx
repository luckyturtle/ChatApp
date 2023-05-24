import { useContext } from 'react';
import clsx from 'clsx';
import { Chat } from '../types';
import { AuthContext } from '../context/AuthContext';
import { formatDateTime } from '../utils/format';

interface ChatListProps {
  chats: Chat[];
}

function ChatList({ chats }: ChatListProps) {
  const { profile } = useContext(AuthContext);

  return (
    <ul className="px-4 py-3 flex flex-col justify-end space-y-8 flex-grow overflow-hidden">
      {chats.map((chat) => {
        const isMine = chat?.user.username === profile?.username;

        return (
          <li
            key={chat.id}
            className={clsx('relative flex', isMine ? 'justify-end' : 'justify-start')}
          >
            <div className="text-sm text-gray-500 absolute top-[-20px]">
              {formatDateTime(chat.date)}
            </div>
            <div
              className={clsx(
                'w-fit max-w-[400px] rounded-xl px-5 py-2',
                isMine ? 'bg-white rounded-br-none text-right' : 'bg-gray-400 rounded-bl-none text-left'
              )}
            >
              <div className="font-medium text-gray-900">{chat?.user.name}</div>
              <div className="mt-1 text-sm text-gray-800">{chat.content}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ChatList;
