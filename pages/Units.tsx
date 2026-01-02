import React, { useState } from 'react';
import { Card, Button, Modal, Input, Toggle, Select } from '../components/Shared';
import { Icons } from '../components/Icons';
import { useSupabaseTable } from '../hooks/useSupabaseData';
import { Unit } from '../types';

export const UnitsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: unitGroups } = useSupabaseTable<any>('base_unit_groups');
  
  const [units] = useState<Unit[]>([
    { id: '1', name: 'Pcs', shortName: 'Piece', category: 'Unit/Count' },
    { id: '7', name: 'Kg', shortName: 'Kilogram', category: 'Weight' },
    { id: '9', name: 'L', shortName: 'Liter', category: 'Volume' },
    { id: '13', name: 'M', shortName: 'Meter', category: 'Length' },
    { id: '15', name: 'Port', shortName: 'Portion', category: 'Custom' },
  ]);

  const unitGroupOptions = (unitGroups || []).map(g => ({ label: g.name, value: g.id }));

  const renderSection = (title: string, category: string) => {
    const categoryUnits = units.filter(u => u.category === category);
    return (
      <div className="mb-8">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 ml-1">{title}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categoryUnits.map(unit => (
            <Card key={unit.id} className="flex flex-col items-center justify-center py-6 gap-1 hover:border-primary-200">
               <span className="text-xl font-bold text-primary-600">{unit.name}</span>
               <span className="text-[10px] font-bold text-slate-400 uppercase">{unit.shortName}</span>
            </Card>
          ))}
          <Card 
             onClick={() => setIsModalOpen(true)}
             className="flex items-center justify-center py-6 bg-primary-50/50 border-dashed border-primary-200 hover:bg-primary-50 cursor-pointer text-primary-500"
          >
            <Icons.Plus className="w-8 h-8" />
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
       <div className="flex justify-between items-center mb-6">
         <div>
            <h2 className="text-lg font-bold">Units</h2>
            <p className="text-slate-400 text-sm">Define measurement systems</p>
         </div>
         <div className="w-64 relative">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary-500" />
         </div>
       </div>

       {renderSection('Unit/Count', 'Unit/Count')}
       {renderSection('Weight', 'Weight')}
       {renderSection('Volume', 'Volume')}
       {renderSection('Length', 'Length')}
       {renderSection('Custom', 'Custom')}

       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Unit">
          <div className="space-y-6">
             <div className="grid grid-cols-2 gap-4">
               <Input label="Symbol (e.g. kg)" placeholder="Kg" />
               <Input label="Full Name" placeholder="Kilogram" />
             </div>
             <Select label="Unit Group" options={[{label: 'Select Category...', value: ''}, ...unitGroupOptions]} />
             <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-sm font-medium text-slate-600">Enabled</span>
                <Toggle checked={true} onChange={() => {}} />
             </div>
             <div className="flex justify-end gap-3 pt-4">
               <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
               <Button className="btn-gradient" onClick={() => setIsModalOpen(false)}>Save Unit</Button>
             </div>
          </div>
       </Modal>
    </div>
  );
};