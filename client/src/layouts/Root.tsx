import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { whoami } from "../api/auth";
import { removeToken, setToken } from "../utils/storage";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { AuthContext } from '../context/AuthContext';

function Root() {
  const navigate = useNavigate();
  const [isFetching, setFetching] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { setProfile } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      setFetching(true);
      try {
        const { data: profile } = await whoami();
        setProfile(profile.user);
        setToken(profile.token);
      } catch {
        setHasError(true);
      }
      setFetching(false);
    })();
  }, [setProfile]);

  useEffect(() => {
    if (!isFetching) {
      if (hasError) {
        removeToken();
        navigate('/login');
      } else {
        navigate('/chat');
      }
    }
  }, [isFetching, hasError, navigate]);

  if (isFetching) {
    return (
      <div className="h-screen flex flex-col items-center w-full p-40">
        <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
          <div className="flex items-center w-full space-x-2">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          </div>
          <div className="flex items-center w-full space-x-2 max-w-[480px]">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
          </div>
          <div className="flex items-center w-full space-x-2 max-w-[400px]">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          </div>
          <div className="flex items-center w-full space-x-2 max-w-[480px]">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
          </div>
          <div className="flex items-center w-full space-x-2 max-w-[440px]">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
          </div>
          <div className="flex items-center w-full space-x-2 max-w-[360px]">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="bg-gray-300 flex flex-grow overflow-hidden">
        <Sidebar />
        <Outlet />
      </div>
    </section>
  );
}

export default Root;
