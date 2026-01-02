import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Settings } from './pages/Settings';
import { UnitsPage } from './pages/Units';
import { GenericGridPage } from './pages/GenericGrid';
import { CustomersPage } from './pages/Customers';

export default function App() {
  const [currentPath, setCurrentPath] = useState('');

  // Simple Hash Router Implementation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentPath(hash || '#/settings'); // Default to settings if empty
    };

    // Initial load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  const renderContent = () => {
    // Normalize path
    const path = currentPath.replace('#', '');
    
    if (path === '/' || path === '' || path === '/settings') {
      return <Settings onNavigate={navigate} />;
    }
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
    if (path === '/customers') return <CustomersPage />;
    
    // Fallback
    return <div className="flex items-center justify-center h-64 text-slate-400">Page under construction: {path}</div>;
  };

  const getPageTitle = () => {
     const path = currentPath.replace('#', '');
     if (path.includes('units')) return 'Units';
     if (path.includes('customers')) return 'Customers';
     if (path.includes('taxes')) return 'Taxes';
     return 'Settings'; // Default context
  };

  const getBreadcrumbs = () => {
     const path = currentPath.replace('#', '');
     if (path === '/' || path === '/settings' || path === '') return [];
     
     const crumbs = [{ label: 'Settings', path: '#/' }];
     if (path.includes('units')) crumbs.push({ label: 'Units', path: undefined });
     else if (path.includes('customers')) return [{ label: 'Dashboard', path: '#/dashboard' }, { label: 'Customers', path: undefined }];
     else if (path.includes('taxes')) crumbs.push({ label: 'Taxes', path: undefined });
     else if (path.includes('currencies')) crumbs.push({ label: 'Currencies', path: undefined });
     else if (path.includes('languages')) crumbs.push({ label: 'Languages', path: undefined });
     else if (path.includes('kitchen')) crumbs.push({ label: 'Kitchen Stations', path: undefined });
     else if (path.includes('prices')) crumbs.push({ label: 'Price Types', path: undefined });
     else if (path.includes('discounts')) crumbs.push({ label: 'Discounts', path: undefined });
     else if (path.includes('delivery')) crumbs.push({ label: 'Delivery Types', path: undefined });
     else if (path.includes('reasons')) crumbs.push({ label: 'Action Reasons', path: undefined });
     else if (path.includes('expenses')) crumbs.push({ label: 'Expense Types', path: undefined });
     else crumbs.push({ label: path.split('/').pop() || 'Page', path: undefined });
     
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