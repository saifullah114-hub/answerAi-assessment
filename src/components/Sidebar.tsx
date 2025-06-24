import {
  Home,
  Bell,
  Target,
  SettingsIcon,
  User2,
  Menu
} from 'lucide-react';
import { onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, provider } from "../firebaseConfig";
import { useNavigate, useLocation } from 'react-router-dom';

const iconItems = [
  { icon: Menu, name: 'Menu', path: '' },
  { icon: Home, name: 'Home', path: '' },
  { icon: Bell, name: 'Notification', path: '/notification' },
  { icon: Target, name: 'Target', path: '/target' },
  { icon: SettingsIcon, name: 'Settings', path: '/settings' }
];

const SideBar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getBaseRoute = () => {
    const parts = location.pathname.split('/');
    return `/${parts[1]}`;
  };

  const getActiveIcon = () => {
    const match = iconItems.find(item => location.pathname.endsWith(item.path) && item.path !== '')
      || iconItems.find(item => item.name === 'Home');
    return match?.name || 'Home';
  };

  const activeIcon = getActiveIcon();

  const handleClick = (path: string) => {
    const base = getBaseRoute();
    const fullPath = path === '' ? base : `${base}${path}`;
    navigate(fullPath);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <aside className="-translate-x-full md:translate-x-0 fixed md:static inset-y-0 left-0 z-30 w-16 bg-[#0E0D0D] transition-transform duration-300 ease-in-out flex flex-col justify-between">
      <div className="flex flex-col items-center py-4 space-y-4">
        {iconItems.map(({ icon: Icon, name, path }) => (
          <button
            key={name}
            onClick={() => handleClick(path)}
            className={`p-3 rounded-lg transition-colors ${
              activeIcon === name
                ? 'bg-[#242424] text-white border border-[#5A5A5A]'
                : 'text-gray-400 hover:text-white hover:bg-gray-700 border border-transparent'
            }`}
          >
            <Icon className="w-6 h-6" />
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center mb-4">
        {user ? (
          <>
            <img
              src={user.photoURL || ''}
              alt="User"
              className="w-8 h-8 rounded-full mb-2"
            />
            <button
              onClick={handleSignOut}
              className="text-xs text-gray-400 hover:text-white"
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            onClick={handleSignIn}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <User2 className="w-6 h-6" />
            <span className="sr-only">Sign in</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default SideBar;
