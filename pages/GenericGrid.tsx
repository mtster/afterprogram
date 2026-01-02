import React, { useState } from 'react';
import { Card, Button, Modal, Input, Toggle, Select } from '../components/Shared';
import { Icons } from '../components/Icons';

interface GenericItem {
  id: string;
  primary: string;
  secondary?: string;
  isDefault?: boolean;
}

interface GenericGridProps {
  title: string;
  type: 'tax' | 'currency' | 'language' | 'kitchen' | 'price' | 'discount' | 'delivery' | 'reason' | 'expense';
}

export const GenericGridPage: React.FC<GenericGridProps> = ({ title, type }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Mock Data Generators based on type
  const getMockData = (): GenericItem[] => {
    switch (type) {
      case 'tax': return [{ id: '1', primary: '18%', secondary: 'VAT', isDefault: true }, { id: '2', primary: '20%', secondary: 'VAT' }];
      case 'currency': return [{ id: '1', primary: '₾', secondary: 'Georgian Lari', isDefault: true }, { id: '2', primary: '$', secondary: 'US Dollar' }, { id: '3', primary: '€', secondary: 'Euro' }];
      case 'language': return [{ id: '1', primary: 'Eng', secondary: 'English', isDefault: true }, { id: '2', primary: 'Geo', secondary: 'Georgian' }];
      case 'kitchen': return [{ id: '1', primary: 'Kitchen 1', secondary: 'Main' }, { id: '2', primary: 'Kitchen 2', secondary: 'Bar' }];
      case 'price': return [{ id: '1', primary: 'Price Type', secondary: 'Retail', isDefault: true }, { id: '2', primary: 'Price Type', secondary: 'Wholesale' }];
      case 'discount': return [{ id: '1', primary: '20%', secondary: 'Staff' }, { id: '2', primary: '18%', secondary: 'Happy Hour' }];
      case 'delivery': return [{ id: '1', primary: 'TakeAway', secondary: 'Default', isDefault: true }, { id: '2', primary: 'Dine In', secondary: 'Hall' }, { id: '3', primary: 'Curbside', secondary: 'Pickup' }];
      case 'reason': return [{ id: '1', primary: 'Item Removal', secondary: 'Void' }, { id: '2', primary: 'Order Cancellation', secondary: 'Cancel' }];
      case 'expense': return [{ id: '1', primary: 'Rent', secondary: 'Monthly' }, { id: '2', primary: 'Utilities', secondary: 'Monthly' }];
      default: return [];
    }
  };

  const items = getMockData();

  const getIcon = () => {
    switch (type) {
        case 'tax': return <Icons.Tax className="w-8 h-8 text-primary-600" />;
        case 'currency': return <span className="text-3xl text-primary-600 font-bold"></span>; // Uses text
        case 'language': return <span className="text-2xl text-primary-600 font-bold"></span>;
        case 'delivery': return <Icons.Delivery className="w-8 h-8 text-primary-600" />;
        case 'reason': return <Icons.Action className="w-6 h-6 text-primary-600" />;
        case 'kitchen': return <Icons.Kitchen className="w-8 h-8 text-primary-600" />;
        default: return <Icons.Price className="w-8 h-8 text-primary-600" />;
    }
  }

  const renderCardContent = (item: GenericItem) => {
      // Custom rendering tweaks based on type to match screenshots
      if (type === 'currency' || type === 'language' || type === 'tax' || type === 'discount') {
         return (
             <div className="flex flex-col items-center justify-center gap-2">
                 {item.isDefault && <span className="bg-primary-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full absolute top-2 right-2">Default</span>}
                 {type === 'currency' || type === 'tax' || type === 'discount' || type === 'language' ? 
                   <span className="text-3xl font-bold text-primary-600">{item.primary}</span> :
                   getIcon()
                 }
                 <span className="text-xs text-slate-400 mt-1">{item.secondary}</span>
             </div>
         )
      }
      if (type === 'delivery') {
          return (
            <div className="flex flex-col items-center justify-center gap-3">
                 <div className="flex justify-between w-full absolute top-3 px-3">
                     <div className="w-1 h-4 border-l-2 border-dotted border-slate-300"></div>
                     <Toggle checked={true} onChange={() => {}} />
                 </div>
                 <div className="mt-4 text-primary-600"><Icons.Delivery className="w-8 h-8"/></div>
                 <span className="text-sm font-semibold text-slate-700">{item.primary}</span>
                 {item.isDefault && <div className="bg-primary-500 text-white text-[10px] px-3 py-0.5 rounded-full">Default</div>}
            </div>
          )
      }
      if (type === 'reason' || type === 'expense') {
        return (
             <div className="flex flex-col gap-2 p-2">
                 {type === 'reason' && <div className="flex items-center gap-2 text-primary-600 mb-2"><Icons.Action className="w-4 h-4"/> <span className="text-sm font-bold">{item.primary}</span></div>}
                 <p className="text-xs text-slate-500 text-center leading-relaxed">
                     {item.secondary || 'a dummy or placeholder text commonly used in publishing and web development.'}
                 </p>
             </div>
        )
      }

      return (
          <div className="flex flex-col items-center justify-center gap-2">
              <div className="text-primary-600">{getIcon()}</div>
              <span className="text-sm font-medium">{item.primary}</span>
          </div>
      )
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
        <div className="w-64 relative hidden sm:block">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(item => (
          <Card key={item.id} className="relative min-h-[140px] flex items-center justify-center hover:border-primary-200 cursor-pointer transition-all">
             {renderCardContent(item)}
          </Card>
        ))}
        <Card 
            onClick={() => setIsOpen(true)}
            className="min-h-[140px] flex items-center justify-center bg-primary-50/50 border-dashed border-primary-200 hover:bg-primary-50 hover:border-primary-300 cursor-pointer text-primary-500 transition-colors"
        >
            <Icons.Plus className="w-10 h-10" />
        </Card>
      </div>

      {/* Generic Modal Example - Content would vary based on type dynamically in a real app */}
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
               <Input label="Name" placeholder={`Enter ${title.slice(0, -1)} name`} defaultValue={type === 'tax' ? '20%' : ''} />
               {type === 'currency' && <Input label="Code" placeholder="USD" />}
               {type === 'delivery' && <div className="grid grid-cols-2 gap-4"><Select label="Type" options={[{label:'Delivery',value:'d'}]}/> <Input label="Fee" /></div>}
             </div>
             <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-sm font-medium text-slate-600">Enabled</span>
                <Toggle checked={true} onChange={() => {}} />
             </div>
             <div className="flex justify-start">
               <Button variant="danger" className="w-10 h-10 px-0" icon={<Icons.Delete className="w-5 h-5" />} />
             </div>
          </div>
      </Modal>
    </div>
  );
};