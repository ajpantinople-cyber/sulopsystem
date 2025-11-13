import React from 'react';
import { useLocation } from 'react-router-dom';
import { PlusIcon } from './Icons';

interface HeaderProps {
  onAddNew: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddNew }) => {
  const location = useLocation();
  const getTitle = () => {
    switch (location.pathname) {
      case '/records':
        return 'All Municipal Records';
      case '/users':
        return 'User Management';
      case '/':
      default:
        return 'Analytics Dashboard';
    }
  };

  const showAddButton = location.pathname === '/' || location.pathname === '/records';

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800">{getTitle()}</h1>
      {showAddButton && (
        <button
          onClick={onAddNew}
          className="flex items-center px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        >
          <PlusIcon className="w-5 h-5 mr-1" />
          Add New Record
        </button>
      )}
    </div>
  );
};

export default Header;
