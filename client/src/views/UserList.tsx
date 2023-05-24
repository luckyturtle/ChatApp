import { useState, useEffect, useContext } from 'react';
import { clsx } from 'clsx';
import { getUsers } from '../api/users';
import Spinner from '../components/Spinner';
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';

function UserList() {
  const [isFetching, setFetching] = useState(false);
  const { users, setUsers } = useContext(UserContext);
  const { profile } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      setFetching(true);
      try {
        const { data: users } = await getUsers();
        setUsers(users);
      } catch {
        setUsers([]);
      }
      setFetching(false);
    })();
  }, [setFetching, setUsers]);

  return (
    <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
      {isFetching ? (
        <Spinner />
      ) : (
        users.filter(user => user.username !== profile?.username).map(user => (
          <li key={user.username}>
            <div
              className={clsx(
                'flex flex-col items-center p-2 text-base font-normal text-gray-900 dark:text-gray-100 rounded-lg transition',
                'duration-75 hover:bg-gray-100 dark:hover:bg-gray-700'
              )}
            >
              <h3 className="font-bold">{user.name}</h3>
              <span className="text-gray-500 dark:text-gray-300">{user.username}</span>
            </div>
          </li>
        )
      ))}
    </ul>
  );
}

export default UserList;
