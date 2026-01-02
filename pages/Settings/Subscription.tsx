import React from 'react';
import { Card, Button } from '../../components/Shared';
import { Icons } from '../../components/Icons';

export const Subscription: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
       <h2 className="text-lg font-bold text-slate-800">Subscription & Billing</h2>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-primary-500 ring-1 ring-primary-100 bg-primary-50/10">
             <div className="flex justify-between items-start mb-4">
                <div>
                   <h3 className="text-lg font-bold text-slate-800">Pro Plan</h3>
                   <p className="text-sm text-slate-500">Active until Dec 2024</p>
                </div>
                <div className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Active</div>
             </div>
             <div className="text-3xl font-bold text-slate-800 mb-6">$49<span className="text-base text-slate-400 font-normal">/mo</span></div>
             <Button className="w-full btn-gradient">Manage Subscription</Button>
          </Card>

          <Card>
             <h3 className="text-sm font-bold text-slate-800 mb-4">Payment Method</h3>
             <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg mb-4">
                <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-white text-[10px]">VISA</div>
                <div className="flex-1">
                   <p className="text-sm font-medium">•••• 4242</p>
                   <p className="text-xs text-slate-400">Expires 12/25</p>
                </div>
             </div>
             <Button variant="secondary" className="w-full">Update Card</Button>
          </Card>
       </div>
    </div>
  );
};