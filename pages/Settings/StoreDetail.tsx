import React, { useState } from 'react';
import { Card, Button, Input, Select, Toggle, Modal } from '../../components/Shared';
import { Icons } from '../../components/Icons';
import { useSupabaseTable } from '../../hooks/useSupabaseData';

export const StoreDetail: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [isPosModalOpen, setIsPosModalOpen] = useState(false);
  const [posName, setPosName] = useState('New Sale Point 1');
  const [posEnabled, setPosEnabled] = useState(true);

  // Fetch Price Types from DB
  const { data: priceTypes, loading: loadingPrices } = useSupabaseTable<any>('directories_price_types');
  const priceTypeOptions = priceTypes.map(pt => ({ label: pt.name, value: pt.id }));
  const defaultPriceOptions = priceTypeOptions.length > 0 ? priceTypeOptions : [{label: 'Loading...', value: ''}];

  const menus = ['Menu1', 'Menu', 'Menu3', 'Menu2', 'Menu7'];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center sticky top-0 bg-slate-50/80 backdrop-blur-md py-4 z-10 border-b border-slate-200 -mx-8 px-8">
        <div className="flex items-center gap-3">
           <h2 className="text-lg font-bold text-slate-800">Store 1</h2>
        </div>
        <Button className="btn-gradient !px-12 !py-2 !rounded-lg text-sm font-bold shadow-lg">Save</Button>
      </div>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1">General</h3>
        <Card className="grid grid-cols-2 gap-4">
          <Input label="Name" defaultValue="Main Store" />
          <Input label="Address" defaultValue="Address Str. 42" />
          <Select 
            label="Price Type" 
            options={loadingPrices ? [{label: 'Loading...', value: ''}] : [{label: 'Select Price Type', value: ''}, ...priceTypeOptions]} 
          />
          <Select label="Close Time" options={[{label: '19:00', value: '19:00'}]} />
          <div className="col-span-2 flex flex-col gap-4 pt-2">
            <Toggle label="Enable Table Service" checked={true} onChange={() => {}} />
            <Toggle label="Enabled" checked={true} onChange={() => {}} />
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1">Sale Points</h3>
        <div className="flex gap-4">
          <Card className="flex items-center gap-4 py-3 px-4 min-w-[220px] hover:border-primary-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-500 flex items-center justify-center">
              <Icons.Printer className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">POS 2</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Warehouse 1</p>
            </div>
          </Card>
          <button 
            onClick={() => setIsPosModalOpen(true)}
            className="w-12 h-12 rounded-xl border-2 border-dashed border-primary-200 flex items-center justify-center text-primary-400 hover:text-primary-600 hover:border-primary-300 transition-all active:scale-95"
          >
            <Icons.Plus className="w-6 h-6" />
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1">Dining Areas</h3>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i} onClick={() => onNavigate(`#/settings/dining/${i}`)} className="flex items-center gap-3 py-3 px-4 hover:border-primary-300">
              <div className="text-primary-500">
                <Icons.Kitchen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold">Dining Area {i}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">10 Tables</p>
              </div>
            </Card>
          ))}
          <button className="w-12 h-12 rounded-xl border-2 border-dashed border-primary-200 flex items-center justify-center text-primary-400 hover:text-primary-600 hover:border-primary-300 transition-all active:scale-95">
            <Icons.Plus className="w-6 h-6" />
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1">Warehouses</h3>
        <div className="flex gap-4">
          <Card className="flex items-center gap-3 py-3 px-4 min-w-[180px]">
            <Icons.Warehouse className="w-6 h-6 text-primary-500" />
            <p className="text-sm font-bold">Warehouse 1</p>
          </Card>
          <button className="w-12 h-12 rounded-xl border-2 border-dashed border-primary-200 flex items-center justify-center text-primary-400 hover:text-primary-600 hover:border-primary-300 transition-all active:scale-95">
            <Icons.Plus className="w-6 h-6" />
          </button>
        </div>
      </section>

      <div className="pt-4 pb-12">
        <Button variant="danger" className="!bg-white !text-red-500 !border-red-100 !px-8" icon={<Icons.Delete className="w-4 h-4"/>}>Delete Item</Button>
      </div>

      <Modal 
        isOpen={isPosModalOpen} 
        onClose={() => setIsPosModalOpen(false)} 
        title={posName}
      >
        <div className="space-y-8">
          <div className="flex gap-4 items-start">
             <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-500 flex items-center justify-center shrink-0">
               <Icons.Printer className="w-7 h-7" />
             </div>
             <div className="grid grid-cols-2 gap-4 flex-1">
               <Input label="Name" value={posName} onChange={e => setPosName(e.target.value)} />
               <Select label="Warehouse" options={[{label: 'Warehouse 1', value: '1'}]} />
             </div>
          </div>
          
          <Toggle label="Enabled" checked={posEnabled} onChange={setPosEnabled} />

          <div className="space-y-4">
             <label className="text-sm font-bold text-slate-800">Menus</label>
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {menus.map(m => (
                  <div key={m} className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-white shadow-sm">
                    <span className="text-xs font-semibold text-slate-600">{m}</span>
                    <div className="scale-75 origin-right">
                      <Toggle checked={true} onChange={() => {}} />
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="flex justify-between items-center pt-4">
             <Button variant="danger" className="!bg-white !p-2 !h-12 !w-12 !border-red-100 !text-red-500">
               <Icons.Delete className="w-6 h-6" />
             </Button>
             <div className="flex gap-3">
               <Button variant="secondary" onClick={() => setIsPosModalOpen(false)} className="!px-8 !py-3 !rounded-xl !h-12 !border-slate-200 text-slate-500 font-bold">Cancel</Button>
               <Button className="btn-gradient !px-12 !py-3 !rounded-xl !h-12 text-sm font-bold shadow-lg" onClick={() => setIsPosModalOpen(false)}>Save</Button>
             </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};