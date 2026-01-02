import React, { useState } from 'react';
import { Card, Button, Modal, Input, Toggle } from '../components/Shared';
import { Icons } from '../components/Icons';
import { Unit } from '../types';

export const UnitsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Hardcoded for demo, normally fetched from Firebase
  const [units] = useState<Unit[]>([
    { id: '1', name: 'Pcs', shortName: 'Piece', category: 'Unit/Count' },
    { id: '2', name: 'Pkg', shortName: 'Package', category: 'Unit/Count' },
    { id: '3', name: 'Box', shortName: 'Box', category: 'Unit/Count' },
    { id: '4', name: 'Set', shortName: 'Set', category: 'Unit/Count' },
    { id: '5', name: 'Unit', shortName: 'Unit', category: 'Unit/Count' },
    { id: '6', name: 'Pair', shortName: 'Pair', category: 'Unit/Count' },
    { id: '7', name: 'Kg', shortName: 'Kilogram', category: 'Weight' },
    { id: '8', name: 'G', shortName: 'Gram', category: 'Weight' },
    { id: '9', name: 'L', shortName: 'Liter', category: 'Volume' },
    { id: '10', name: 'Ml', shortName: 'Milliliter', category: 'Volume' },
    { id: '11', name: 'Cl', shortName: 'Centiliter', category: 'Volume' },
    { id: '12', name: 'Gl', shortName: 'Gallon', category: 'Volume' },
    { id: '13', name: 'M', shortName: 'Meter', category: 'Length' },
    { id: '14', name: 'Cm', shortName: 'Centimeter', category: 'Length' },
    { id: '15', name: 'Port', shortName: 'Portion', category: 'Custom' },
    { id: '16', name: 'Shot', shortName: 'Shot', category: 'Custom' },
    { id: '17', name: 'Slice', shortName: 'Slice', category: 'Custom' },
    { id: '18', name: 'Serv', shortName: 'Serving', category: 'Custom' },
  ]);

  const renderSection = (title: string, category: string) => {
    const categoryUnits = units.filter(u => u.category === category);
    return (
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-slate-500 mb-4">{title}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categoryUnits.map(unit => (
            <Card key={unit.id} className="flex flex-col items-center justify-center py-6 gap-1 hover:border-primary-200 cursor-pointer">
               <span className="text-xl font-bold text-primary-600">{unit.name}</span>
               <span className="text-xs text-slate-400">{unit.shortName}</span>
            </Card>
          ))}
          <Card 
             onClick={() => setIsModalOpen(true)}
             className="flex items-center justify-center py-6 bg-primary-50/50 border-dashed border-primary-200 hover:bg-primary-50 hover:border-primary-300 cursor-pointer text-primary-500"
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
            <p className="text-slate-400 text-sm">Manage measurement units</p>
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

       <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="New Unit"
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsModalOpen(false)}>Save</Button>
            </>
          }
       >
          <div className="space-y-6">
             <div className="grid grid-cols-2 gap-4">
               <Input label="Name" placeholder="Name" />
               <Input label="Short Name" placeholder="Short Name" />
             </div>
             <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-600">Enabled</span>
                <Toggle checked={true} onChange={() => {}} />
             </div>
             <div className="flex justify-start">
               <Button variant="danger" icon={<Icons.Delete className="w-4 h-4" />}>
               </Button>
             </div>
          </div>
       </Modal>
    </div>
  );
};
