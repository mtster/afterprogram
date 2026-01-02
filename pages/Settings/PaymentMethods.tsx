import React, { useState } from 'react';
import { Card, Button, Toggle } from '../../components/Shared';
import { Icons } from '../../components/Icons';

interface PaymentMethod {
  id: string;
  title: string;
  icon: any;
  desc?: string;
  enabled: boolean;
}

export const PaymentMethods: React.FC = () => {
  const [methods, setMethods] = useState<PaymentMethod[]>([
    { id: '1', title: 'Cash', icon: Icons.Payment, enabled: true },
    { id: '2', title: 'Card', icon: Icons.Payment, desc: 'TBC', enabled: true },
    // Fix: Using Icons.Company instead of non-existent Icons.Building2
    { id: '3', title: 'Bank', icon: Icons.Company, desc: 'Bank', enabled: true },
    { id: '4', title: 'Consignment', icon: Icons.Check, enabled: true },
    // Fix: Using Icons.Loyalty instead of non-existent Icons.Heart
    { id: '5', title: 'Loyalty Points', icon: Icons.Loyalty, enabled: true },
    { id: '6', title: 'Gift Card', icon: Icons.Price, enabled: true },
    { id: '7', title: 'Voucher', icon: Icons.Tax, enabled: true },
  ]);

  const toggleMethod = (id: string) => {
    setMethods(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-800">Payment Methods</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {methods.map((m) => (
          <Card 
            key={m.id} 
            className={`flex flex-col items-center justify-center min-h-[160px] gap-2 relative transition-all duration-300 ${!m.enabled ? 'opacity-60 grayscale-[0.5]' : ''}`}
          >
            <div className="absolute top-3 right-3 scale-75">
              <Toggle checked={m.enabled} onChange={() => toggleMethod(m.id)} />
            </div>
            <div className={`mt-2 ${m.enabled ? 'text-primary-500' : 'text-slate-400'}`}>
              <m.icon className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <span className="text-sm font-bold text-slate-800">{m.title}</span>
            {m.desc && <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">{m.desc}</span>}
          </Card>
        ))}

        <Card className="flex flex-col items-center justify-center min-h-[160px] gap-2 bg-primary-50/20 border-primary-100 border-dashed group hover:bg-primary-50 transition-colors cursor-pointer">
           <div className="text-primary-500 group-hover:scale-110 transition-transform">
             <Icons.Plus className="w-10 h-10" strokeWidth={1.5} />
           </div>
           <span className="text-xs font-bold text-primary-500">Add Card</span>
        </Card>

        <Card className="flex flex-col items-center justify-center min-h-[160px] gap-2 bg-primary-50/20 border-primary-100 border-dashed group hover:bg-primary-50 transition-colors cursor-pointer">
           <div className="text-primary-500 group-hover:scale-110 transition-transform">
             <Icons.Plus className="w-10 h-10" strokeWidth={1.5} />
           </div>
           <span className="text-xs font-bold text-primary-500">Add Bank</span>
        </Card>
      </div>

      <div className="flex justify-end pt-12">
        <Button className="btn-gradient !px-20 !py-3 !rounded-xl text-sm font-bold shadow-xl shadow-primary-200">Save</Button>
      </div>
    </div>
  );
};