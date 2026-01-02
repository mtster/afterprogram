import React from 'react';
import { Card } from '../components/Shared';
import { Icons } from '../components/Icons';

interface SettingsProps {
  onNavigate: (path: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  const settingsCategories = [
    { title: 'Company & Setup', icon: Icons.Company, desc: 'Company name, Tax code, Charge Vat, etc.', path: '#/settings/company' },
    { title: 'Stores & Locations', icon: Icons.Store, desc: 'Name, Address, Price type, Close time, Is Table Service, etc.', path: '#/settings/stores' },
    { title: 'Payment Methods', icon: Icons.Payment, desc: 'Bank Terminals, Bank Accounts', path: '#/settings/payments' },
    { title: 'User Management', icon: Icons.UserManagement, desc: 'Roles and Permissions, Users', path: '#/settings/users' },
    { title: 'Dictionaries', icon: Icons.Dictionaries, desc: 'Kitchen stations, Price Types, Discounts, Expense Types, etc.', path: '#/settings/dictionaries' },
    { title: 'Advanced Settings', icon: Icons.Advanced, desc: 'Bill Design, default VAT, VAT included in price', path: '#/settings/advanced' },
    { title: 'Subscription & Billing', icon: Icons.Billing, desc: 'Roles and Permissions, Users', path: '#/settings/subscription' },
  ];

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {settingsCategories.map((item) => (
          <Card 
            key={item.title} 
            className="group hover:border-primary-200 transition-all duration-300 min-h-[220px] flex items-center justify-center"
            onClick={() => onNavigate(item.path)}
          >
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 text-primary-500 group-hover:bg-primary-50 transition-colors duration-300 flex items-center justify-center">
                <item.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div className="px-4">
                <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">{item.desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
