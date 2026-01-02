import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Settings } from './pages/Settings';
import { Dictionaries } from './pages/Settings/Dictionaries';
import { CompanySetup } from './pages/Settings/CompanySetup';
import { Stores } from './pages/Settings/Stores';
import { StoreDetail } from './pages/Settings/StoreDetail';
import { DiningArea } from './pages/Settings/DiningArea';
import { PaymentMethods } from './pages/Settings/PaymentMethods';
import { UnitsPage } from './pages/Units';
import { GenericGridPage } from './pages/GenericGrid';
import { CustomersPage } from './pages/Customers';

export default function App() {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentPath(hash || '#/settings');
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  const renderContent = () => {
    const path = currentPath.replace('#', '');
    
    // Settings Main
    if (path === '/' || path === '' || path === '/settings') {
      return <Settings onNavigate={navigate} />;
    }
    
    // Settings Sub-pages
    if (path === '/settings/dictionaries') return <Dictionaries onNavigate={navigate} />;
    if (path === '/settings/company') return <CompanySetup />;
    if (path === '/settings/stores') return <Stores onNavigate={navigate} />;
    if (path.startsWith('/settings/stores/')) return <StoreDetail onNavigate={navigate} />;
    if (path.startsWith('/settings/dining/')) return <DiningArea />;
    if (path === '/settings/payments') return <PaymentMethods />;

    // Dictionaries (nested under dictionaries in logic but routes remain top-level for simplicity)
    if (path === '/settings/units') return <UnitsPage />;
    if (path === '/settings/taxes') return <GenericGridPage title="Taxes" type="tax" />;
    if (path === '/settings/currencies') return <GenericGridPage title="Currencies" type="currency" />;
    if (path === '/settings/languages') return <GenericGridPage title="Languages" type="language" />;
    if (path === '/settings/kitchen') return <GenericGridPage title="Kitchen Stations" type="kitchen" />;
    if (path === '/settings/prices') return <GenericGridPage title="Price Types" type="price" />;
    if (path === '/settings/discounts') return <GenericGridPage title="Discounts" type="discount" />;
    if (path === '/settings/delivery') return <GenericGridPage title="Delivery Types" type="delivery" />;
    if (path === '/settings/reasons') return <GenericGridPage title="Action Reasons" type="reason" />;
    if (path === '/settings/expenses') return <GenericGridPage title="Expense Types" type="expense" />;

    // Other Tabs
    if (path === '/customers') return <CustomersPage />;
    
    return <div className="flex items-center justify-center h-64 text-slate-400">Page under construction: {path}</div>;
  };

  const getPageTitle = () => {
     const path = currentPath.replace('#', '');
     if (path === '/settings' || path === '/') return 'Settings';
     if (path === '/settings/dictionaries') return 'Dictionaries';
     if (path === '/settings/company') return 'Company & Setup';
     if (path === '/settings/stores') return 'Stores & Locations';
     if (path === '/settings/payments') return 'Payment Methods';
     if (path.includes('units')) return 'Units';
     if (path.includes('customers')) return 'Customers';
     return 'Settings';
  };

  const getBreadcrumbs = () => {
     const path = currentPath.replace('#', '');
     if (path === '/' || path === '/settings' || path === '') return [];
     
     const crumbs = [{ label: 'Settings', path: '#/' }];
     
     if (path.includes('dictionaries')) {
       crumbs.push({ label: 'Dictionaries', path: undefined });
     } else if (path.includes('company')) {
       crumbs.push({ label: 'Company & Setup', path: undefined });
     } else if (path.includes('stores')) {
       crumbs.push({ label: 'Stores & Locations', path: undefined });
     } else if (path.includes('dining')) {
       crumbs.push({ label: 'Stores & Locations', path: '#/settings/stores' });
       crumbs.push({ label: 'Store 1', path: '#/settings/stores/1' });
       crumbs.push({ label: 'Dining Area', path: undefined });
     } else if (path.includes('payments')) {
       crumbs.push({ label: 'Payment Methods', path: undefined });
     } else if (path === '/customers') {
       return [{ label: 'Dashboard', path: '#/dashboard' }, { label: 'Customers', path: undefined }];
     } else {
       // Deep nested dictionaries
       crumbs.push({ label: 'Dictionaries', path: '#/settings/dictionaries' });
       crumbs.push({ label: path.split('/').pop()?.replace(/^\w/, c => c.toUpperCase()) || 'Page', path: undefined });
     }
     
     return crumbs;
  };

  return (
    <Layout 
      currentPath={currentPath} 
      onNavigate={navigate}
      title={getPageTitle()}
      breadcrumbs={getBreadcrumbs()}
    >
      {renderContent()}
    </Layout>
  );
}
