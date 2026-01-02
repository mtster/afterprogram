import React from 'react';
import { Card } from '../components/Shared';
import { Icons } from '../components/Icons';

interface SettingsProps {
  onNavigate: (path: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  const settingsItems = [
    { title: 'Units', icon: Icons.Ruler, desc: 'Name', path: '#/settings/units' },
    { title: 'Taxes', icon: Icons.Tax, desc: 'Rate, Set Default, Show In List', path: '#/settings/taxes' },
    { title: 'Currencies', icon: Icons.Currency, desc: 'Code, Name, Rate, Set Default', path: '#/settings/currencies' },
    { title: 'Languages', icon: Icons.Language, desc: 'Set Default, Show In List', path: '#/settings/languages' },
    { title: 'Kitchen Stations', icon: Icons.Kitchen, desc: 'Name, Autogenerate', path: '#/settings/kitchen' },
    { title: 'Price Types', icon: Icons.Price, desc: 'Name, Order, User Access, Stores', path: '#/settings/prices' },
    { title: 'Discounts', icon: Icons.Tax, desc: 'Value, Order, User Access, Stores', path: '#/settings/discounts' },
    { title: 'Delivery Types', icon: Icons.Delivery, desc: 'Name, Autogenerate, Dine-in', path: '#/settings/delivery' },
    { title: 'Action Reasons', icon: Icons.Action, desc: 'Void Item, Cancel Order, Clear', path: '#/settings/reasons' },
    { title: 'Expense Types', icon: Icons.Expense, desc: 'Name, Group', path: '#/settings/expenses' },
    { title: 'Customers', icon: Icons.User, desc: 'Manage client database', path: '#/customers' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Dictionaries</h2>
        <p className="text-slate-500">Manage your system configurations and definitions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {settingsItems.map((item) => (
          <Card 
            key={item.title} 
            className="group hover:border-primary-200 transition-all duration-300"
            onClick={() => onNavigate(item.path)}
          >
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600 flex items-center justify-center transition-colors duration-300">
                <item.icon className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed px-4">{item.desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
