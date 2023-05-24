import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { logout } from '../api/auth';
import UserList from '../views/UserList';
import { AuthContext } from '../context/AuthContext';

function Sidebar() {
  const navigate = useNavigate();
  const { profile, setProfile } = useContext(AuthContext);

  const handleLogout = async () => {
    logout();
    setProfile(null);
    navigate('/login');
  };

  return (
    <aside
      id="default-sidebar"
      className="w-0 sm:w-64 transition-all overflow-hidden"
      aria-label="Sidenav"
    >
      <div
        className={clsx(
          'overflow-y-auto py-5 px-3 h-full bg-white border-r border-t border-gray-200 dark:bg-gray-800',
          'dark:border-gray-700'
        )}
      >
        <div className="space-y-2">
          <div className="text-center mb-4">
            <h3 className="text-black dark:text-white text-2xl font-extrabold">
              {profile?.name ?? 'Guest'}
            </h3>
            <span className="text-gray-500 dark:text-gray-300">{profile?.username ?? 'guest'}</span>
          </div>
          <button
            onClick={handleLogout}
            className={clsx(
              'text-md font-bold text-xl text-black dark:text-white cursor-pointer border border-gray-200',
              'dark:border-gray-700 w-full rounded py-2 hover:bg-gray-100 dark:hover:bg-gray-700',
              'group-hover:text-gray-900 dark:group-hover:text-gray-200'
            )}
          >
            Logout
          </button>
        </div>
        <UserList />
      </div>
    </aside>
  );
}

export default Sidebar;
