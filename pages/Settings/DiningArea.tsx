import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Input, Select, Toggle } from '../../components/Shared';
import { Icons } from '../../components/Icons';

interface Table {
  id: number;
  name: string;
  x: number;
  y: number;
  type: 'rect' | 'circle';
}

export const DiningArea: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'tables'>('general');
  const [selectedColor, setSelectedColor] = useState('#f43f5e');
  const [isEnabled, setIsEnabled] = useState(true);
  const [tables, setTables] = useState<Table[]>([
    { id: 1, name: 'Table 1', x: 20, y: 20, type: 'rect' },
    { id: 2, name: 'Table 2', x: 140, y: 20, type: 'rect' },
    { id: 3, name: 'Table 3', x: 260, y: 20, type: 'rect' },
    { id: 4, name: 'Table 4', x: 380, y: 20, type: 'rect' },
    { id: 5, name: 'Table 5', x: 500, y: 20, type: 'rect' },
    { id: 6, name: 'Table 1', x: 100, y: 150, type: 'circle' },
    { id: 7, name: 'Table 1', x: 100, y: 280, type: 'circle' },
    { id: 8, name: 'Table 1', x: 220, y: 280, type: 'circle' },
  ]);

  const [draggingId, setDraggingId] = useState<number | null>(null);
  const floorPlanRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingId === null || !floorPlanRef.current) return;
    
    const rect = floorPlanRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 40; // 40 is half-width
    const y = e.clientY - rect.top - 30;  // 30 is half-height
    
    setTables(prev => prev.map(t => t.id === draggingId ? { ...t, x, y } : t));
  };

  const colors = ['#f43f5e', '#f97316', '#f59e0b', '#facc15', '#4ade80', '#22c55e', '#22d3ee', '#0ea5e9', '#3b82f6', '#a855f7'];

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
               <Icons.Table className="w-4 h-4" /> Tables ({tables.length})
             </button>
           </div>
        </div>
        <Button className="btn-gradient !px-12 !py-2 !rounded-lg text-sm font-bold shadow-lg">Save</Button>
      </div>

      <div className="mt-8">
        {activeTab === 'general' ? (
          <div className="space-y-8">
            <Card className="space-y-6">
              <Input label="Name" defaultValue="Dining Area 1" />
              <div className="space-y-4">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Image & Color</label>
                <div className="flex gap-6">
                   <div className="w-32 h-24 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary-300 transition-colors group">
                      <Icons.Image className="w-6 h-6 text-slate-300 group-hover:text-primary-400" />
                      <p className="text-[10px] text-center text-slate-400 px-2 leading-tight"><span className="text-primary-500 font-bold">Click here</span> to upload or drop files here</p>
                   </div>
                   <div className="grid grid-cols-5 gap-2 flex-1 max-w-[200px]">
                      {colors.map(c => (
                        <div 
                          key={c} 
                          onClick={() => setSelectedColor(c)}
                          className={`w-8 h-8 rounded-lg cursor-pointer transition-transform hover:scale-110 ${c === selectedColor ? 'ring-2 ring-primary-500 ring-offset-2' : ''}`} 
                          style={{backgroundColor: c}} 
                        />
                      ))}
                   </div>
                </div>
              </div>
              <Select label="Price Type" options={[{label: 'Retail', value: '1'}, {label: 'Wholesale', value: '2'}]} />
              <Toggle label="Enabled" checked={isEnabled} onChange={setIsEnabled} />
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
               <button className="p-2 bg-red-500 text-white rounded-lg shadow-sm"><div className="w-5 h-5 bg-red-500 rounded" /></button>
               <button className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"><Icons.Image className="w-5 h-5" /></button>
               <button className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"><Icons.Map className="w-5 h-5" /></button>
               <button className="p-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"><Icons.Table className="w-5 h-5" /></button>
            </div>

            <div 
              ref={floorPlanRef}
              onMouseMove={handleMouseMove}
              onMouseUp={() => setDraggingId(null)}
              onMouseLeave={() => setDraggingId(null)}
              className="relative w-full h-[500px] bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-8 select-none"
            >
                {tables.map(table => (
                  <div 
                    key={table.id} 
                    onMouseDown={() => setDraggingId(table.id)}
                    style={{ 
                      left: table.x, 
                      top: table.y,
                      cursor: draggingId === table.id ? 'grabbing' : 'grab'
                    }}
                    className={`absolute w-20 h-16 bg-slate-700 text-white text-[10px] font-bold shadow-lg transition-shadow hover:shadow-xl flex items-center justify-center ${table.type === 'circle' ? 'rounded-full' : 'rounded-lg'}`}
                  >
                    {table.name}
                  </div>
                ))}
            </div>
            <p className="text-xs text-slate-400 italic">Tip: Click and drag tables to rearrange the layout.</p>
          </div>
        )}
      </div>
    </div>
  );
};