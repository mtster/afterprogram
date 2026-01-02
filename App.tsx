import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Settings } from './pages/Settings';
import { Dictionaries } from './pages/Settings/Dictionaries';
import { CompanySetup } from './pages/Settings/CompanySetup';
import { Stores } from './pages/Settings/Stores';
import { StoreDetail } from './pages/Settings/StoreDetail';
import { DiningArea } from './pages/Settings/DiningArea';
import { PaymentMethods } from './pages/Settings/PaymentMethods';
import { UserManagement } from './pages/Settings/UserManagement';
import { AdvancedSettings } from './pages/Settings/AdvancedSettings';
import { Subscription } from './pages/Settings/Subscription';
import { UnitsPage } from './pages/Units';
import { GenericGridPage } from './pages/GenericGrid';
import { CustomersPage } from './pages/Customers';

export default function App() {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/settings';
      if (window.location.hash === '') {
        window.location.hash = '#/settings';
      }
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
    const cleanPath = path.replace(/\/$/, ''); // Remove trailing slash
    
    // Settings Root (Handle / and /settings)
    if (cleanPath === '' || cleanPath === '/' || cleanPath === '/settings') return <Settings onNavigate={navigate} />;
    
    // Settings Sub-pages
    if (path === '/settings/dictionaries') return <Dictionaries onNavigate={navigate} />;
    if (path === '/settings/company') return <CompanySetup />;
    if (path === '/settings/stores') return <Stores onNavigate={navigate} />;
    if (path === '/settings/payments') return <PaymentMethods />;
    if (path === '/settings/users') return <UserManagement />;
    if (path === '/settings/advanced') return <AdvancedSettings />;
    if (path === '/settings/subscription') return <Subscription />;

    // Store Hierarchy
    if (path.startsWith('/settings/stores/')) return <StoreDetail onNavigate={navigate} />;
    if (path.startsWith('/settings/dining/')) return <DiningArea />;

    // Dictionaries Hierarchy
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

    // Other Main Tabs
    if (path === '/customers') return <CustomersPage />;
    if (path === '/dashboard') return <div className="p-8 text-center text-slate-500">Dashboard - Under Construction</div>;
    
    return <div className="flex items-center justify-center h-64 text-slate-400">Page under construction: {path}</div>;
  };

  const getPageTitle = () => {
     const path = currentPath.replace('#', '');
     if (path === '/' || path === '' || path.startsWith('/settings')) return 'Settings';
     if (path.startsWith('/customers')) return 'Customers';
     if (path.startsWith('/dashboard')) return 'Dashboard';
     return 'Settings';
  };

  const getBreadcrumbs = () => {
    const path = currentPath.replace('#', '');
    if (path === '/' || path === '' || path === '/settings') return [];

    const segments = path.split('/').filter(Boolean);
    const crumbs = [];
    
    let currentLink = '#';
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      currentLink += `/${seg}`;
      
      let label = seg.charAt(0).toUpperCase() + seg.slice(1);
      
      // Custom Label Mapping
      if (seg === 'company') label = 'Company & Setup';
      if (seg === 'stores') label = 'Stores & Locations';
      if (seg === 'payments') label = 'Payment Methods';
      if (seg === 'dictionaries') label = 'Dictionaries';
      if (seg === 'advanced') label = 'Advanced Settings';
      if (seg === 'subscription') label = 'Subscription & Billing';
      if (seg === 'users') label = 'User Management';
      
      // ID handling
      if (segments[i+1] && !isNaN(Number(segments[i+1]))) {
        if (seg === 'stores') {
          crumbs.push({ label: 'Stores & Locations', path: '#/settings/stores' });
          crumbs.push({ label: 'Store 1', path: undefined });
          i++; continue;
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