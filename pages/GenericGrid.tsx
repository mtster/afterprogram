import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Input, Toggle, Select } from '../components/Shared';
import { Icons } from '../components/Icons';
import { useSupabaseTable } from '../hooks/useSupabaseData';
import { supabase } from '../supabase';

interface GenericItem {
  id: string;
  primary: string;
  secondary?: string;
  isDefault?: boolean;
  icon?: string;
}

interface GenericGridProps {
  title: string;
  type: 'tax' | 'currency' | 'language' | 'kitchen' | 'price' | 'discount' | 'delivery' | 'reason' | 'expense';
}

export const GenericGridPage: React.FC<GenericGridProps> = ({ title, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newItemData, setNewItemData] = useState<any>({});
  const [loadingAction, setLoadingAction] = useState(false);
  
  // 1. Determine which table to fetch the LIST from
  const getTableName = () => {
    switch(type) {
      case 'currency': return 'directories_currencies';
      case 'price': return 'directories_price_types';
      case 'language': return 'directories_languages';
      case 'tax': return 'directories_vat_taxes';
      case 'kitchen': return 'directories_kitchen_stations';
      case 'discount': return 'directories_discounts';
      case 'delivery': return 'directories_delivery_types';
      case 'reason': return 'directories_action_reasons';
      case 'expense': return 'directories_expense_types';
      default: return '';
    }
  };

  const tableName = getTableName();
  const { data: dbItems, loading, error } = useSupabaseTable<any>(tableName);

  // 2. Fetch Master Data for dropdowns (Currencies, Languages)
  const { data: masterCurrencies } = useSupabaseTable<any>('base_currencies');
  const { data: masterLanguages } = useSupabaseTable<any>('base_languages');

  // 3. Transform DB data into View Data
  const getDisplayItems = (): GenericItem[] => {
    if (!dbItems || !Array.isArray(dbItems)) return [];
    
    return dbItems.map(item => {
        if (type === 'currency') {
            // Join with master currency logic manually or assume mapped
            // For simplicity, we try to find the match in masterCurrencies if available
            const master = (masterCurrencies || []).find(c => c.id === item.base_currency_id);
            return {
                id: item.id,
                primary: master ? master.symbol : '?',
                secondary: master ? master.name : 'Unknown',
                isDefault: item.is_default
            };
        }
        if (type === 'price') {
            return {
                id: item.id,
                primary: item.name,
                secondary: 'Price List',
                isDefault: item.is_default
            };
        }
        // Fallback for others
        return {
            id: item.id,
            primary: item.name || item.value || 'Item',
            secondary: type,
            isDefault: item.is_default
        };
    });
  };

  const items = getDisplayItems();

  const getIcon = (item: GenericItem) => {
    if (type === 'delivery') return <Icons.Delivery className="w-8 h-8 text-primary-600" />;
    if (type === 'price') return <Icons.Price className="w-8 h-8 text-primary-600" />;
    if (type === 'currency') return <Icons.Currency className="w-8 h-8 text-primary-600" />;
    return <Icons.Settings className="w-8 h-8 text-primary-600" />;
  }

  const handleSave = async () => {
    setLoadingAction(true);
    try {
        const payload: any = { is_default: newItemData.isDefault || false };
        
        // Prepare Payload based on Type
        if (type === 'currency') {
            if (!newItemData.base_currency_id) throw new Error("Select a currency");
            payload.base_currency_id = newItemData.base_currency_id;
        } else if (type === 'price') {
            if (!newItemData.name) throw new Error("Enter a name");
            payload.name = newItemData.name;
            payload.is_enabled = true;
        } else if (type === 'language') {
             payload.base_language_id = newItemData.base_language_id;
        } else {
             // Default name handling
             if (!newItemData.name) throw new Error("Enter a name");
             payload.name = newItemData.name;
        }

        const { error: saveError } = await supabase
            .from(tableName)
            .insert(payload);
            
        if (saveError) throw saveError;
        
        // Reload page or force refresh (simple reload for now)
        window.location.reload();
    } catch (e: any) {
        alert("Error saving: " + e.message);
    } finally {
        setLoadingAction(false);
        setIsOpen(false);
    }
  };

  const renderNewItemForm = () => {
    if (type === 'currency') {
      const options = (masterCurrencies || []).map(c => ({ label: `${c.symbol} - ${c.name}`, value: c.id }));
      return (
        <div className="space-y-4">
          <Select 
            label="Select Currency from Master List" 
            options={[{label: 'Choose Currency...', value: ''}, ...options]} 
            onChange={(e) => setNewItemData({...newItemData, base_currency_id: e.target.value})}
          />
          <p className="text-[10px] text-slate-400">Data source: base_currencies table</p>
        </div>
      );
    }
    if (type === 'language') {
      const options = (masterLanguages || []).map(l => ({ label: `${l.name} (${l.code})`, value: l.id }));
      return (
        <div className="space-y-4">
          <Select 
            label="Select Language from Master List" 
            options={[{label: 'Choose Language...', value: ''}, ...options]} 
            onChange={(e) => setNewItemData({...newItemData, base_language_id: e.target.value})}
          />
        </div>
      );
    }
    return (
        <Input 
            label="Name" 
            placeholder={`Enter ${title.slice(0, -1)} name`} 
            onChange={(e) => setNewItemData({...newItemData, name: e.target.value})}
        />
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
        <div className="w-64 relative">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary-500" />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading data from Supabase...</div>
      ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {items.map(item => (
              <Card key={item.id} className="relative min-h-[140px] flex items-center justify-center hover:border-primary-200 cursor-pointer transition-all !p-2">
                 <div className="flex flex-col items-center justify-center gap-2">
                    {item.isDefault && <span className="bg-primary-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full absolute top-2 right-2">DEFAULT</span>}
                    <div className="text-primary-600">{getIcon(item)}</div>
                    <div className="text-center">
                      <span className="text-xs font-bold text-slate-800 block">{item.primary}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{item.secondary}</span>
                    </div>
                 </div>
              </Card>
            ))}
            <Card onClick={() => setIsOpen(true)} className="min-h-[140px] flex items-center justify-center bg-primary-50/50 border-dashed border-primary-200 hover:bg-primary-50 cursor-pointer text-primary-500">
                <Icons.Plus className="w-8 h-8" />
            </Card>
          </div>
      )}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={`Add ${title.slice(0, -1)}`}>
          <div className="space-y-6">
             {renderNewItemForm()}
             <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-sm font-medium text-slate-600">Set as Default</span>
                <Toggle checked={newItemData.isDefault || false} onChange={(val) => setNewItemData({...newItemData, isDefault: val})} />
             </div>
             <div className="flex justify-end gap-3 pt-4">
                <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button className="btn-gradient" onClick={handleSave} disabled={loadingAction}>
                    {loadingAction ? 'Saving...' : 'Add to List'}
                </Button>
             </div>
          </div>
      </Modal>
    </div>
  );
};