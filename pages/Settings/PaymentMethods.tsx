
import React from 'react';
// Fix: Import Icons from the correct file instead of Shared.tsx
import { Card, Button, Toggle } from '../../components/Shared';
import { Icons } from '../../components/Icons';

export const PaymentMethods: React.FC = () => {
  const methods = [
    { title: 'Cash', icon: Icons.Payment, defaultOn: true },
    { title: 'Card', icon: Icons.Payment, desc: 'TBC', defaultOn: true },
    { title: 'Bank', icon: Icons.Building2, desc: 'Bank', defaultOn: true },
    { title: 'Consignment', icon: Icons.Check, defaultOn: true },
    { title: 'Loyalty Points', icon: Icons.Heart, defaultOn: true },
    { title: 'Gift Card', icon: Icons.Price, defaultOn: true },
    { title: 'Voucher', icon: Icons.Tax, defaultOn: true },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-800">Payment Methods</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {methods.map((m, i) => (
          <Card key={i} className="flex flex-col items-center justify-center min-h-[160px] gap-2 relative">
            <div className="absolute top-3 right-3">
              <Toggle checked={m.defaultOn} onChange={() => {}} />
            </div>
            <div className="text-primary-500 mt-2">
              <m.icon className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <span className="text-sm font-bold text-slate-800">{m.title}</span>
            {m.desc && <span className="text-[10px] uppercase font-bold text-slate-300">{m.desc}</span>}
          </Card>
        ))}

        <Card className="flex flex-col items-center justify-center min-h-[160px] gap-2 bg-primary-50/20 border-primary-100">
           <div className="text-primary-500">
             <Icons.Plus className="w-10 h-10" strokeWidth={1.5} />
           </div>
           <span className="text-sm font-bold text-primary-500">Add Card</span>
        </Card>

        <Card className="flex flex-col items-center justify-center min-h-[160px] gap-2 bg-primary-50/20 border-primary-100">
           <div className="text-primary-500">
             <Icons.Plus className="w-10 h-10" strokeWidth={1.5} />
           </div>
           <span className="text-sm font-bold text-primary-500">Add Bank</span>
        </Card>
      </div>

      <div className="flex justify-end pt-8">
        <Button className="btn-gradient !px-16 !py-2.5 !rounded-lg text-sm font-bold shadow-xl">Save</Button>
      </div>
    </div>
  );
};
