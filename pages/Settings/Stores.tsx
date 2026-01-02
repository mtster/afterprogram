
import React, { useState } from 'react';
// Fix: Import Icons from the correct file and remove unused Button
import { Card } from '../../components/Shared';
import { Icons } from '../../components/Icons';

interface Store {
  id: string;
  name: string;
  posCount: number;
  isActive: boolean;
}

export const Stores: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [stores] = useState<Store[]>([
    { id: '1', name: 'Main Store', posCount: 2, isActive: true },
    { id: '2', name: 'Main Store', posCount: 2, isActive: false },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStores = stores.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-bold text-slate-800">Stores & Locations</h2>
        <div className="w-96 relative">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-100" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredStores.map(store => (
          <Card 
            key={store.id} 
            onClick={() => onNavigate(`#/settings/stores/${store.id}`)}
            className="flex flex-col items-center justify-center min-h-[160px] gap-2 relative"
          >
            {!store.isActive && (
              <span className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-400 text-white text-[10px] font-bold px-3 py-0.5 rounded-full">Inactive</span>
            )}
            <div className={`mt-2 ${store.isActive ? 'text-primary-500' : 'text-slate-300'}`}>
              <Icons.Store className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <span className={`text-sm font-bold ${store.isActive ? 'text-slate-800' : 'text-slate-400'}`}>{store.name}</span>
            <span className="text-[10px] uppercase font-bold text-slate-400">{store.posCount} POS</span>
          </Card>
        ))}
        
        <Card 
          className="flex items-center justify-center min-h-[160px] bg-primary-50/30 border-dashed border-primary-200 group hover:bg-primary-50 transition-colors"
        >
          <Icons.Plus className="w-12 h-12 text-primary-400 group-hover:text-primary-600 transition-colors" />
        </Card>
      </div>
    </div>
  );
};
