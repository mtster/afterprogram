import React from 'react';
import { Card, Button, Input, Select, Toggle } from '../../components/Shared';
import { Icons } from '../../components/Icons';

export const StoreDetail: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center sticky top-0 bg-slate-50/80 backdrop-blur-md py-4 z-10 border-b border-slate-200 -mx-8 px-8">
        <div className="flex items-center gap-3">
           <h2 className="text-lg font-bold text-slate-800">Store 1</h2>
        </div>
        <Button className="btn-gradient !px-12 !py-2 !rounded-lg text-sm font-bold shadow-lg">Save</Button>
      </div>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-500">General</h3>
        <Card className="grid grid-cols-2 gap-4">
          <Input label="Name" defaultValue="Name" />
          <Input label="Address" defaultValue="Address" />
          <Select label="Price Type" options={[{label: 'Price Type', value: '1'}]} />
          <Select label="Close Time" options={[{label: '19:00', value: '19:00'}]} />
          <div className="col-span-2 flex flex-col gap-4 pt-2">
            <Toggle label="Enable Table Service" checked={true} onChange={() => {}} />
            <Toggle label="Enabled" checked={true} onChange={() => {}} />
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-500">Sale Points</h3>
        <div className="flex gap-4">
          <Card className="flex items-center gap-4 py-3 px-4 min-w-[220px]">
            <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-500 flex items-center justify-center">
              <Icons.Printer className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">POS 2</p>
              <p className="text-[10px] text-slate-400">Warehouse 1</p>
            </div>
          </Card>
          <button className="w-12 h-12 rounded-xl border-2 border-dashed border-primary-200 flex items-center justify-center text-primary-400 hover:text-primary-600 transition-colors">
            <Icons.Plus className="w-6 h-6" />
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-500">Dining Areas</h3>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5].map(i => (
            <Card key={i} onClick={() => onNavigate('#/settings/dining/1')} className="flex items-center gap-3 py-3 px-4">
              <div className="text-primary-500">
                <Icons.Kitchen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold">Dining Area {i}</p>
                <p className="text-[10px] text-slate-400">10 Tables</p>
              </div>
            </Card>
          ))}
          <button className="w-12 h-12 rounded-xl border-2 border-dashed border-primary-200 flex items-center justify-center text-primary-400 hover:text-primary-600 transition-colors">
            <Icons.Plus className="w-6 h-6" />
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-500">Warehouses</h3>
        <div className="flex gap-4">
          <Card className="flex items-center gap-3 py-3 px-4 min-w-[180px]">
            <Icons.Warehouse className="w-6 h-6 text-primary-500" />
            <p className="text-sm font-bold">Warehouse 1</p>
          </Card>
          <Card className="flex items-center gap-3 py-3 px-4 min-w-[180px]">
            <Icons.Warehouse className="w-6 h-6 text-primary-500" />
            <p className="text-sm font-bold">Warehouse 1</p>
          </Card>
          <button className="w-12 h-12 rounded-xl border-2 border-dashed border-primary-200 flex items-center justify-center text-primary-400 hover:text-primary-600 transition-colors">
            <Icons.Plus className="w-6 h-6" />
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-500">Payment Methods</h3>
        <Card className="divide-y divide-slate-100">
          <div className="flex items-center justify-between py-4 first:pt-0">
             <div className="flex items-center gap-3">
               <Icons.Payment className="w-5 h-5 text-primary-500" />
               <span className="text-sm font-bold">Cash</span>
             </div>
             <Toggle checked={true} onChange={() => {}} />
          </div>
          <div className="flex items-center justify-between py-4 last:pb-0">
             <div className="flex items-center gap-3">
               <Icons.Payment className="w-5 h-5 text-primary-500" />
               <span className="text-sm font-bold">Card</span>
             </div>
             <Toggle checked={true} onChange={() => {}} />
          </div>
        </Card>
      </section>

      <div className="pt-4 pb-12">
        <Button variant="danger" className="!bg-white !text-red-500 !border-red-100 !px-8" icon={<Icons.Delete className="w-4 h-4"/>}>Delete Item</Button>
      </div>
    </div>
  );
};
