import { useState } from 'react';
import clsx from 'clsx';

interface MessageInputProps {
  onSend: (message: string) => void;
}

function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    message && onSend(message);
  };

  const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setMessage(event.currentTarget.value);
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        type="text"
        name="message"
        className={clsx(
          'rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500',
          'focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600',
          'dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
          'focus:outline-none'
        )}
        placeholder="Input Your Message"
        value={message}
        onChange={handleChange}
      />
      <button
        className={clsx(
          'inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300',
          'rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 cursor-pointer'
        )}
        type="submit"
      >
        Send
      </button>
    </form>
  );
}

export default MessageInput;
