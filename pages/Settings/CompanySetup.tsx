import React, { useState } from 'react';
import { Card, Button, Input, Select, Toggle } from '../../components/Shared';
import { Icons } from '../../components/Icons';

export const CompanySetup: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center sticky top-0 bg-slate-50/80 backdrop-blur-md py-4 z-10 border-b border-slate-200 -mx-8 px-8">
        <div className="flex items-center gap-3">
           <h2 className="text-lg font-bold text-slate-800">Company & Setup</h2>
        </div>
        <Button className="btn-gradient !px-12 !py-2 !rounded-lg text-sm font-bold shadow-lg shadow-primary-200">Save</Button>
      </div>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-500 tracking-wide">Company Profile</h3>
        <Card className="space-y-6">
          <Input label="Company Name" placeholder="Company Name" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Tax Code" placeholder="12354" />
            <Select label="VAT Rate" options={[{label: '18%', value: '18'}, {label: '20%', value: '20'}]} />
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-500 tracking-wide">Business Type</h3>
        <Card className="divide-y divide-slate-100">
          <ConfigRow title="Retail" desc="Description" />
          <ConfigRow title="Food" desc="Description" />
          <ConfigRow title="Table Service" desc="Description" />
        </Card>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-500 tracking-wide">System Configuration</h3>
        <Card className="divide-y divide-slate-100">
          <ConfigRow title="Multi Store Support" desc="Description" defaultOn />
          <ConfigRow title="Multi Currency" desc="GEL" defaultOn />
          <ConfigRow title="Multi Language Receipts" desc="Description" defaultOn />
          <ConfigRow title="Delivery Services Integrations" desc="Description" />
          <ConfigRow title="Different Price Type" desc="Description" />
          <ConfigRow title="Multiple Warehouses on one Store" desc="Description" />
        </Card>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-500 tracking-wide">Device Configuration</h3>
        <Card className="divide-y divide-slate-100">
          <ConfigRow title="Enable Scale Integration" desc="Description" defaultOn />
          <ConfigRow title="Use Customer Display Monitor" desc="Description" defaultOn />
          <ConfigRow title="Use KDS" desc="Description" defaultOn />
          <ConfigRow title="Enable Barcode Scanner" desc="Description" />
          <ConfigRow title="Cash Drawer" desc="Description" />
          <ConfigRow title="Kitchen Printers" desc="Description" />
        </Card>
      </section>
    </div>
  );
};

const ConfigRow: React.FC<{ title: string; desc: string; defaultOn?: boolean }> = ({ title, desc, defaultOn = false }) => {
  const [enabled, setEnabled] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
      <div>
        <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
      <Toggle checked={enabled} onChange={setEnabled} />
    </div>
  );
};
