
import React, { useState } from 'react';
import { Card, Button, Input, Select, Toggle } from '../../components/Shared';
import { Icons } from '../../components/Icons';

export const DiningArea: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'tables'>('general');

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center sticky top-0 bg-slate-50/80 backdrop-blur-md py-4 z-10 border-b border-slate-200 -mx-8 px-8">
        <div className="flex items-center gap-6">
           <h2 className="text-lg font-bold text-slate-800">Dining Area 1</h2>
           <div className="flex items-center gap-6 border-l pl-6 border-slate-200">
             <button 
                onClick={() => setActiveTab('general')}
                className={`flex items-center gap-2 text-sm font-semibold transition-colors ${activeTab === 'general' ? 'text-primary-600 border-b-2 border-primary-600 pb-1 -mb-1' : 'text-slate-400 hover:text-slate-600'}`}
             >
               <Icons.Action className="w-4 h-4" /> General
             </button>
             <button 
                onClick={() => setActiveTab('tables')}
                className={`flex items-center gap-2 text-sm font-semibold transition-colors ${activeTab === 'tables' ? 'text-primary-600 border-b-2 border-primary-600 pb-1 -mb-1' : 'text-slate-400 hover:text-slate-600'}`}
             >
               <Icons.Table className="w-4 h-4" /> Tables (0)
             </button>
           </div>
        </div>
        <Button className="btn-gradient !px-12 !py-2 !rounded-lg text-sm font-bold shadow-lg">Save</Button>
      </div>

      <div className="mt-8">
        {activeTab === 'general' ? (
          <div className="space-y-8">
            <Card className="space-y-6">
              <Input label="Name" defaultValue="Name" />
              <div className="space-y-4">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Image & Color</label>
                <div className="flex gap-6">
                   <div className="w-32 h-24 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary-300 transition-colors">
                      <Icons.Image className="w-6 h-6 text-slate-300" />
                      <p className="text-[10px] text-center text-slate-400 px-2"><span className="text-primary-500 font-bold">Click here</span> to upload or drop files here</p>
                   </div>
                   <div className="grid grid-cols-5 gap-2 flex-1">
                      {['#f43f5e', '#f97316', '#f59e0b', '#facc15', '#4ade80', '#22c55e', '#22d3ee', '#0ea5e9', '#3b82f6', '#a855f7'].map(c => (
                        <div key={c} className={`w-8 h-8 rounded-lg cursor-pointer ${c === '#f43f5e' ? 'ring-2 ring-primary-500 ring-offset-2' : ''}`} style={{backgroundColor: c}} />
                      ))}
                   </div>
                </div>
              </div>
              <Select label="Price Type" options={[{label: 'Price Type', value: '1'}]} />
              <Toggle label="Enabled" checked={true} onChange={() => {}} />
            </Card>
            <Button variant="danger" className="!bg-white !text-red-500 !border-red-100 !px-8" icon={<Icons.Delete className="w-4 h-4"/>}>Delete Item</Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex gap-4 p-2 bg-white rounded-xl border border-slate-100 shadow-sm w-fit">
               <button className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"><Icons.Circle className="w-5 h-5" /></button>
               <button className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"><Icons.Square className="w-5 h-5" /></button>
               <button className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"><Icons.Polygon className="w-5 h-5" /></button>
               <div className="w-px h-8 bg-slate-100 mx-1"></div>
               <button className="p-2 bg-red-500 text-white rounded-lg transition-colors"><div className="w-5 h-5 bg-red-500 rounded" /></button>
               <button className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"><Icons.Image className="w-5 h-5" /></button>
               <button className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"><Icons.Map className="w-5 h-5" /></button>
               {/* Fix: Changed Icons.Maximize2 to Icons.Table as per Icons.tsx mapping */}
               <button className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"><Icons.Table className="w-5 h-5" /></button>
            </div>

            <div className="relative w-full h-[500px] bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-8 flex flex-wrap gap-4">
                {/* Simulated table workspace */}
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-20 h-14 bg-slate-700 text-white text-[10px] font-bold rounded-lg flex items-center justify-center cursor-move shadow-md">
                    Table {i}
                  </div>
                ))}
                <div className="absolute top-1/2 left-40 w-20 h-20 bg-slate-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center cursor-move shadow-md">
                   Table 1
                </div>
                <div className="absolute bottom-20 left-40 w-20 h-20 bg-slate-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center cursor-move shadow-md">
                   Table 1
                </div>
                <div className="absolute bottom-20 left-64 w-20 h-20 bg-slate-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center cursor-move shadow-md">
                   Table 1
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
