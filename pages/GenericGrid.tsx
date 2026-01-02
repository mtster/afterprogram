import React, { useState } from 'react';
import { Card, Button, Modal, Input, Toggle, Select } from '../components/Shared';
import { Icons } from '../components/Icons';

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
  const [items, setItems] = useState<GenericItem[]>(() => {
    switch (type) {
      case 'tax': return [{ id: '1', primary: '18%', secondary: 'VAT', isDefault: true }, { id: '2', primary: '20%', secondary: 'VAT' }];
      case 'currency': return [{ id: '1', primary: '₾', secondary: 'Georgian Lari', isDefault: true }, { id: '2', primary: '$', secondary: 'US Dollar' }, { id: '3', primary: '€', secondary: 'Euro' }];
      case 'language': return [{ id: '1', primary: 'Eng', secondary: 'English', isDefault: true }, { id: '2', primary: 'Geo', secondary: 'Georgian' }];
      case 'kitchen': return [{ id: '1', primary: 'Kitchen 1', secondary: 'Main' }, { id: '2', primary: 'Kitchen 2', secondary: 'Bar' }];
      case 'price': return [{ id: '1', primary: 'Price Type', secondary: 'Retail', isDefault: true }, { id: '2', primary: 'Price Type', secondary: 'Wholesale' }];
      case 'discount': return [{ id: '1', primary: '20%', secondary: 'Staff' }, { id: '2', primary: '18%', secondary: 'Happy Hour' }];
      case 'delivery': return [
        { id: '1', primary: 'TakeAway', secondary: 'Default', isDefault: true, icon: 'takeaway' },
        { id: '2', primary: 'Dine In', secondary: 'Hall', icon: 'dinein' },
        { id: '3', primary: 'Curbside', secondary: 'Pickup', icon: 'curbside' },
        { id: '4', primary: 'Delivery', secondary: 'Google', icon: 'google' },
        { id: '5', primary: 'Delivery', secondary: 'Wolt', icon: 'wolt' },
        { id: '6', primary: 'Delivery', secondary: 'Bolt', icon: 'bolt' },
        { id: '7', primary: 'Delivery', secondary: 'Glovo', icon: 'glovo' },
      ];
      default: return [];
    }
  });

  const toggleItem = (id: string) => {
    // Just a UI mock for now
    console.log("Toggle item", id);
  };

  const getIcon = (item: GenericItem) => {
    if (type === 'delivery') {
      switch (item.icon) {
        case 'takeaway': return <Icons.Store className="w-8 h-8 text-primary-600" />;
        case 'dinein': return <Icons.Kitchen className="w-8 h-8 text-primary-600" />;
        case 'curbside': return <Icons.Store className="w-8 h-8 text-primary-600" />;
        case 'google': return <span className="text-3xl font-bold text-green-500">G</span>;
        case 'wolt': return <span className="text-3xl font-bold text-blue-400">W</span>;
        case 'bolt': return <span className="text-3xl font-bold text-green-600">B</span>;
        case 'glovo': return <span className="text-3xl font-bold text-yellow-500 italic">Go</span>;
        default: return <Icons.Delivery className="w-8 h-8 text-primary-600" />;
      }
    }
    switch (type) {
        case 'tax': return <Icons.Tax className="w-8 h-8 text-primary-600" />;
        case 'reason': return <Icons.Action className="w-6 h-6 text-primary-600" />;
        case 'kitchen': return <Icons.Kitchen className="w-8 h-8 text-primary-600" />;
        default: return <Icons.Price className="w-8 h-8 text-primary-600" />;
    }
  }

  const renderCardContent = (item: GenericItem) => {
      if (type === 'delivery') {
          return (
            <div className="flex flex-col items-center justify-center gap-3 w-full py-2">
                 {/* Grabber and Toggle */}
                 <div className="flex justify-between w-full px-3">
                     <div className="flex flex-col gap-0.5 opacity-20">
                         <div className="flex gap-0.5"><div className="w-1 h-1 rounded-full bg-slate-900"/><div className="w-1 h-1 rounded-full bg-slate-900"/></div>
                         <div className="flex gap-0.5"><div className="w-1 h-1 rounded-full bg-slate-900"/><div className="w-1 h-1 rounded-full bg-slate-900"/></div>
                         <div className="flex gap-0.5"><div className="w-1 h-1 rounded-full bg-slate-900"/><div className="w-1 h-1 rounded-full bg-slate-900"/></div>
                     </div>
                     <Toggle checked={true} onChange={() => toggleItem(item.id)} />
                 </div>
                 
                 <div className="text-primary-600">{getIcon(item)}</div>
                 
                 <div className="text-center">
                    <span className="text-[11px] font-bold text-slate-800 block">{item.primary}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{item.secondary}</span>
                 </div>

                 {item.isDefault && (
                    <div className="bg-primary-600 text-white text-[9px] font-bold px-4 py-0.5 rounded-full mt-1 uppercase tracking-tighter">Default</div>
                 )}
            </div>
          )
      }

      if (type === 'currency' || type === 'language' || type === 'tax' || type === 'discount') {
         return (
             <div className="flex flex-col items-center justify-center gap-2">
                 {item.isDefault && <span className="bg-primary-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full absolute top-2 right-2">Default</span>}
                 {type === 'currency' || type === 'tax' || type === 'discount' || type === 'language' ? 
                   <span className="text-3xl font-bold text-primary-600">{item.primary}</span> :
                   getIcon(item)
                 }
                 <span className="text-xs text-slate-400 mt-1">{item.secondary}</span>
             </div>
         )
      }

      return (
          <div className="flex flex-col items-center justify-center gap-2">
              <div className="text-primary-600">{getIcon(item)}</div>
              <span className="text-sm font-medium">{item.primary}</span>
          </div>
      )
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
             {renderCardContent(item)}
          </Card>
        ))}
        <Card 
            onClick={() => setIsOpen(true)}
            className="min-h-[140px] flex items-center justify-center bg-primary-50/50 border-dashed border-primary-200 hover:bg-primary-50 hover:border-primary-300 cursor-pointer text-primary-500 transition-colors"
        >
            <Icons.Plus className="w-8 h-8" />
        </Card>
      </div>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title={`New ${title.slice(0, -1)}`}
        footer={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsOpen(false)}>Save</Button>
            </>
        }
      >
          <div className="space-y-6">
             <div className="grid gap-4">
               <Input label="Name" placeholder={`Enter ${title.slice(0, -1)} name`} />
               {type === 'currency' && <Input label="Code" placeholder="USD" />}
             </div>
             <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-sm font-medium text-slate-600">Enabled</span>
                <Toggle checked={true} onChange={() => {}} />
             </div>
          </div>
      </Modal>
    </div>
  );
};