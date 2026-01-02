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
      const hash = window.location.hash || '#/settings';
      if (window.location.hash === '') window.location.hash = '#/settings';
      setCurrentPath(hash);
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
    
    // Exact Matches
    if (path === '/settings') return <Settings onNavigate={navigate} />;
    if (path === '/settings/dictionaries') return <Dictionaries onNavigate={navigate} />;
    if (path === '/settings/company') return <CompanySetup />;
    if (path === '/settings/stores') return <Stores onNavigate={navigate} />;
    if (path === '/settings/payments') return <PaymentMethods />;
    if (path === '/settings/users') return <div className="p-8 text-slate-500">User Management - Under Construction</div>;
    if (path === '/settings/advanced') return <div className="p-8 text-slate-500">Advanced Settings - Under Construction</div>;
    if (path === '/settings/subscription') return <div className="p-8 text-slate-500">Subscription & Billing - Under Construction</div>;

    // Dynamic Matches
    if (path.startsWith('/settings/stores/')) return <StoreDetail onNavigate={navigate} />;
    if (path.startsWith('/settings/dining/')) return <DiningArea />;

    // Dictionary Sub-pages
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

    // Main Sections
    if (path === '/customers') return <CustomersPage />;
    
    return <div className="flex items-center justify-center h-64 text-slate-400">Page under construction: {path}</div>;
  };

  const getPageTitle = () => {
     const path = currentPath.replace('#', '');
     if (path === '/settings') return 'Settings';
     if (path.includes('customers')) return 'Customers';
     return 'Management';
  };

  const getBreadcrumbs = () => {
    const path = currentPath.replace('#', '');
    if (path === '/settings') return [];

    const segments = path.split('/').filter(Boolean);
    const crumbs = [];
    
    let currentLink = '#';
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      currentLink += `/${seg}`;
      
      let label = seg.charAt(0).toUpperCase() + seg.slice(1);
      if (seg === 'company') label = 'Company & Setup';
      if (seg === 'stores' && i === segments.length - 1) label = 'Stores & Locations';
      if (seg === 'payments') label = 'Payment Methods';
      if (seg === 'dictionaries') label = 'Dictionaries';
      
      // If the next segment is a number (ID), we skip adding a crumb for it or rename the current one
      if (segments[i+1] && !isNaN(Number(segments[i+1]))) {
        // Special case for store detail
        if (seg === 'stores') {
          crumbs.push({ label: 'Stores & Locations', path: '#/settings/stores' });
          crumbs.push({ label: 'Store 1', path: undefined });
          i++; // Skip the ID segment
          continue;
        }
      }

      crumbs.push({ 
        label, 
        path: i === segments.length - 1 ? undefined : currentLink 
      });
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