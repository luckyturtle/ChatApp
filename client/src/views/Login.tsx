import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { login } from '../api/auth';
import Spinner from '../components/Spinner';

function Login() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const name = formData.get('name') as string;
    try {
      setLoading(true);
      await login({ username, name });
      navigate('/');
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/dashboard"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <span className="text-5xl text-white uppercase mb-4">Chat App</span>
        </a>
        <div
          className={clsx(
            "w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800",
            "dark:border-gray-700"
          )}
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  maxLength={100}
                  className={clsx(
                    "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600",
                    "focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600",
                    "dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500",
                    "dark:focus:border-blue-500"
                  )}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  maxLength={100}
                  className={clsx(
                    "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600",
                    "focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600",
                    "dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500",
                    "dark:focus:border-blue-500"
                  )}
                  required
                />
              </div>
              <div className="text-center w-full">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={clsx(
                    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg",
                    "text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none",
                    "dark:focus:ring-blue-800 cursor-pointer mx-auto",
                  )}
                >
                  {isLoading && <Spinner />}
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
