import React from 'react';
import { MOCK_USERS } from '../constants';
import { UserRole } from '../types';

const UserManagement: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
       <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Username</th>
              <th scope="col" className="px-6 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map(user => (
              <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4">
                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.role === UserRole.ADMIN ? 'bg-indigo-100 text-indigo-800' : 'bg-blue-100 text-blue-800'}`}>
                        {user.role}
                    </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
