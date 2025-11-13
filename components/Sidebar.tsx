import React from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardIcon, DocumentIcon, UsersIcon, LogoutIcon } from './Icons';
import { User, UserRole } from '../types';

interface SidebarProps {
  user: User;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout }) => {
  const commonLinkClasses = 'flex items-center px-4 py-3 text-gray-600 transition-colors duration-300 transform rounded-lg';
  const activeLinkClasses = 'bg-gray-200 text-gray-800 font-medium';
  const inactiveLinkClasses = 'hover:bg-gray-200 hover:text-gray-800';

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r">
      <div className="flex items-center justify-center h-20 border-b">
        <div className="text-center">
          <h1 className="text-xl font-bold text-blue-600">LGU-SULOP</h1>
          <p className="text-xs text-gray-500">MPDO RMS</p>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <nav className="flex-1 space-y-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `${commonLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
          >
            <DashboardIcon className="w-5 h-5" />
            <span className="mx-4">Dashboard</span>
          </NavLink>
          <NavLink
            to="/records"
            className={({ isActive }) => `${commonLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
          >
            <DocumentIcon className="w-5 h-5" />
            <span className="mx-4">All Records</span>
          </NavLink>
          {user.role === UserRole.ADMIN && (
             <NavLink
                to="/users"
                className={({ isActive }) => `${commonLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
            >
                <UsersIcon className="w-5 h-5" />
                <span className="mx-4">User Management</span>
            </NavLink>
          )}
        </nav>
        <div className="mt-auto">
            <div className="px-4 py-2 my-2 text-sm text-center text-gray-500 bg-gray-100 rounded-lg">
                Logged in as <br/>
                <span className="font-semibold text-gray-700">{user.username} ({user.role})</span>
            </div>
            <button
              onClick={onLogout}
              className={`${commonLinkClasses} ${inactiveLinkClasses} w-full`}
            >
                <LogoutIcon className="w-5 h-5" />
                <span className="mx-4">Logout</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
