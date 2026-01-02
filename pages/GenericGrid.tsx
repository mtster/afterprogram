import React, { useState } from 'react';
import { Card, Button, Modal, Input, Toggle, Select } from '../components/Shared';
import { Icons } from '../components/Icons';
import { useSupabaseTable } from '../hooks/useSupabaseData';

interface GenericItem {
  id: string;
  primary: string;
  secondary?: string;
  isDefault?: boolean;
  icon?: string;
}

interface GenericGridProps {
  title: string;
  type: 'tax' | 'currency' | 'language' | 'kitchen' | 'price' | 'discount' | 'delivery' | 'reason' | 'expense';
}

export const GenericGridPage: React.FC<GenericGridProps> = ({ title, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Supabase master data hooks
  const { data: masterCurrencies } = useSupabaseTable<any>('base_currencies');
  const { data: masterLanguages } = useSupabaseTable<any>('base_languages');

  const [items, setItems] = useState<GenericItem[]>(() => {
    switch (type) {
      case 'tax': return [{ id: '1', primary: '18%', secondary: 'VAT', isDefault: true }, { id: '2', primary: '20%', secondary: 'VAT' }];
      case 'currency': return [{ id: '1', primary: '₾', secondary: 'Georgian Lari', isDefault: true }, { id: '2', primary: '$', secondary: 'US Dollar' }];
      case 'language': return [{ id: '1', primary: 'Eng', secondary: 'English', isDefault: true }, { id: '2', primary: 'Geo', secondary: 'Georgian' }];
      case 'delivery': return [
        { id: '1', primary: 'TakeAway', secondary: 'Default', isDefault: true, icon: 'takeaway' },
        { id: '2', primary: 'Dine In', secondary: 'Hall', icon: 'dinein' },
        { id: '5', primary: 'Delivery', secondary: 'Wolt', icon: 'wolt' },
        { id: '6', primary: 'Delivery', secondary: 'Bolt', icon: 'bolt' },
        { id: '7', primary: 'Delivery', secondary: 'Glovo', icon: 'glovo' },
      ];
      default: return [];
    }
  });

  const getIcon = (item: GenericItem) => {
    if (type === 'delivery') {
      switch (item.icon) {
        case 'takeaway': return <Icons.Store className="w-8 h-8 text-primary-600" />;
        case 'dinein': return <Icons.Kitchen className="w-8 h-8 text-primary-600" />;
        case 'wolt': return <span className="text-3xl font-bold text-blue-400">W</span>;
        case 'bolt': return <span className="text-3xl font-bold text-green-600">B</span>;
        case 'glovo': return <span className="text-3xl font-bold text-yellow-500 italic">Go</span>;
        default: return <Icons.Delivery className="w-8 h-8 text-primary-600" />;
      }
    }
    return <Icons.Price className="w-8 h-8 text-primary-600" />;
  }

  const renderNewItemForm = () => {
    if (type === 'currency') {
      const options = masterCurrencies.map(c => ({ label: `${c.symbol} - ${c.name}`, value: c.id }));
      return (
        <div className="space-y-4">
          <Select label="Select Currency from Master List" options={[{label: 'Choose Currency...', value: ''}, ...options]} />
          <p className="text-[10px] text-slate-400">Data source: base_currencies table</p>
        </div>
      );
    }
    if (type === 'language') {
      const options = masterLanguages.map(l => ({ label: `${l.name} (${l.code})`, value: l.id }));
      return (
        <div className="space-y-4">
          <Select label="Select Language from Master List" options={[{label: 'Choose Language...', value: ''}, ...options]} />
          <p className="text-[10px] text-slate-400">Data source: base_languages table</p>
        </div>
      );
    }
    return <Input label="Name" placeholder={`Enter ${title.slice(0, -1)} name`} />;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
        <div className="w-64 relative">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {items.map(item => (
          <Card key={item.id} className="relative min-h-[140px] flex items-center justify-center hover:border-primary-200 cursor-pointer transition-all !p-2">
             <div className="flex flex-col items-center justify-center gap-2">
                {item.isDefault && <span className="bg-primary-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full absolute top-2 right-2">DEFAULT</span>}
                <div className="text-primary-600">{getIcon(item)}</div>
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-800 block">{item.primary}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{item.secondary}</span>
                </div>
             </div>
          </Card>
        ))}
        <Card onClick={() => setIsOpen(true)} className="min-h-[140px] flex items-center justify-center bg-primary-50/50 border-dashed border-primary-200 hover:bg-primary-50 cursor-pointer text-primary-500">
            <Icons.Plus className="w-8 h-8" />
        </Card>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={`Add ${title.slice(0, -1)}`}>
          <div className="space-y-6">
             {renderNewItemForm()}
             <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-sm font-medium text-slate-600">Set as Default</span>
                <Toggle checked={false} onChange={() => {}} />
             </div>
             <div className="flex justify-end gap-3 pt-4">
                <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button className="btn-gradient" onClick={() => setIsOpen(false)}>Add to List</Button>
             </div>
          </div>
      </Modal>
    </div>
  );
};