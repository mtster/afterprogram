import React from 'react';
import { Card, Toggle, Select } from '../../components/Shared';

export const AdvancedSettings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
       <h2 className="text-lg font-bold text-slate-800">Advanced Settings</h2>
       
       <Card className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
             <div>
               <h3 className="text-sm font-bold text-slate-800">Bill Design</h3>
               <p className="text-xs text-slate-400">Customize the receipt layout</p>
             </div>
             <Select options={[{label: 'Standard', value: 'std'}, {label: 'Compact', value: 'compact'}]} className="w-40" />
          </div>
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
             <div>
               <h3 className="text-sm font-bold text-slate-800">Default VAT Included</h3>
               <p className="text-xs text-slate-400">Prices include VAT by default</p>
             </div>
             <Toggle checked={true} onChange={() => {}} />
          </div>

          <div className="flex items-center justify-between">
             <div>
               <h3 className="text-sm font-bold text-slate-800">Debug Mode</h3>
               <p className="text-xs text-slate-400">Show technical details</p>
             </div>
             <Toggle checked={false} onChange={() => {}} />
          </div>
       </Card>
    </div>
  );
};