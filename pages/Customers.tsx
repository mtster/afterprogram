import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Input, Select } from '../components/Shared';
import { Icons } from '../components/Icons';
import { Customer } from '../types';
import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // New Customer State
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({});

  useEffect(() => {
    // Simulate Fetch or actual fetch
    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "customers"));
            const fetched: Customer[] = [];
            querySnapshot.forEach((doc) => {
                fetched.push({ id: doc.id, ...doc.data() } as Customer);
            });
            
            // If empty, use mock data for demo visual
            if (fetched.length === 0) {
               const mocks: Customer[] = Array(8).fill(null).map((_, i) => ({
                   id: `0111111111${i}`,
                   name: 'Name',
                   group: 'Group',
                   phone: '+995555555555',
                   address: 'Address str, N1 Tbilisi'
               }));
               setCustomers(mocks);
            } else {
                setCustomers(fetched);
            }
        } catch (e) {
            console.error(e);
            // Fallback mock
             const mocks: Customer[] = Array(8).fill(null).map((_, i) => ({
                   id: `0111111111${i}`,
                   name: 'Name',
                   group: 'Group',
                   phone: '+995555555555',
                   address: 'Address str, N1 Tbilisi'
               }));
               setCustomers(mocks);
        }
        setLoading(false);
    };
    fetchCustomers();
  }, []);

  const handleSave = async () => {
      // Basic save logic
      console.log('Saving', newCustomer);
      setIsModalOpen(false);
      // Ideally add to Firestore here
      // await addDoc(collection(db, "customers"), newCustomer);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-800 mr-4">Customers</h2>
            <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                {['All', 'One', 'Two'].map((tab, i) => (
                    <button key={tab} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${i === 0 ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
                        {tab}
                    </button>
                ))}
            </div>
            <Button variant="primary" className="ml-2 !bg-primary-600 !px-4" icon={<Icons.Plus className="w-4 h-4"/>}>New Group</Button>
        </div>
        
        <div className="flex gap-3">
             <div className="relative">
                <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search" className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-100 w-64" />
             </div>
             <Button variant="secondary" className="!px-6">Actions <Icons.ChevronRight className="w-4 h-4 rotate-90 ml-2"/></Button>
             <Button onClick={() => setIsModalOpen(true)} icon={<Icons.Plus className="w-4 h-4"/>}>Add New</Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                    <tr>
                        <th className="px-6 py-4 font-semibold w-12">
                            <input type="checkbox" className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                        </th>
                        <th className="px-6 py-4 font-semibold">Name</th>
                        <th className="px-6 py-4 font-semibold">Group</th>
                        <th className="px-6 py-4 font-semibold">ID</th>
                        <th className="px-6 py-4 font-semibold">Phone Number</th>
                        <th className="px-6 py-4 font-semibold">Address <span className="inline-block ml-1 bg-primary-100 text-primary-600 rounded px-1 text-[10px]">+</span></th>
                        <th className="px-6 py-4 font-semibold w-10"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {customers.map((customer, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-6 py-4">
                                <input type="checkbox" className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                            </td>
                            <td className="px-6 py-4 text-slate-700 font-medium">{customer.name}</td>
                            <td className="px-6 py-4 text-slate-500">{customer.group}</td>
                            <td className="px-6 py-4 text-slate-500 font-mono">{customer.id}</td>
                            <td className="px-6 py-4 text-slate-500">{customer.phone}</td>
                            <td className="px-6 py-4 text-slate-500">{customer.address}</td>
                            <td className="px-6 py-4 text-slate-400">
                                <button className="p-1 hover:bg-slate-200 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Icons.More className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-center">
            <span className="text-xs text-slate-400">Showing {customers.length} entries</span>
        </div>
      </div>

      {/* New Customer Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="New Customer"
        footer={
             <>
               <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Actions</Button>
               <div className="flex-1"></div>
               <Button onClick={handleSave}>Save</Button>
             </>
        }
      >
          <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Name" placeholder="Name" onChange={e => setNewCustomer({...newCustomer, name: e.target.value})} />
                  <Input label="Tax Code" placeholder="12354" onChange={e => setNewCustomer({...newCustomer, taxCode: e.target.value})} />
                  
                  <Select label="Customer Type" options={[{label: 'Company', value: 'company'}, {label: 'Individual', value: 'individual'}]} />
                  <Select label="Group" options={[{label: 'Group', value: 'group'}]} />
                  
                  <Input label="Email" placeholder="email@gmail.com" type="email" />
                  <Input label="Phone" placeholder="995555555555" />
                  
                  <Select label="VAT Payer" options={[{label: 'VAT Payer', value: 'yes'}]} />
                  <Input label="Birthday" type="date" />
              </div>
              <div className="w-full">
                  <Input label="Address" placeholder="Address" />
              </div>
              <div className="pt-4">
                <Button variant="danger" className="!px-4 !bg-red-50 !text-red-500 !border-red-100" icon={<Icons.Delete className="w-4 h-4"/>}>Delete Item</Button>
              </div>
          </div>
      </Modal>
    </div>
  );
};
