import React from 'react';
import { Card, Button, Input } from '../../components/Shared';
import { Icons } from '../../components/Icons';

export const UserManagement: React.FC = () => {
  const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', active: true },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', active: true },
    { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'Cashier', active: false },
  ];

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
           <h2 className="text-lg font-bold text-slate-800">User Management</h2>
           <p className="text-slate-500 text-sm">Manage access and permissions (users_users)</p>
        </div>
        <Button icon={<Icons.Plus className="w-4 h-4"/>}>Add User</Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Role</th>
              <th className="px-6 py-4 font-semibold text-center">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-700">{user.name}</td>
                <td className="px-6 py-4 text-slate-500">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.active ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    {user.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-primary-600 transition-colors">
                    <Icons.Settings className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};