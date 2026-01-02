import React, { useState } from 'react';
import { Icons } from './Icons';
import { NavigationItem } from '../types';

const NAV_ITEMS: NavigationItem[] = [
  { name: 'Dashboard', icon: Icons.Dashboard, path: '#/dashboard' },
  { name: 'Sales', icon: Icons.Sales, path: '#/sales' },
  { name: 'Purchases', icon: Icons.Purchases, path: '#/purchases' },
  { name: 'Finances', icon: Icons.Finances, path: '#/finances' },
  { name: 'Items', icon: Icons.Items, path: '#/items' },
  { name: 'Loyalty', icon: Icons.Loyalty, path: '#/loyalty' },
  { name: 'Reports', icon: Icons.Reports, path: '#/reports' },
  { name: 'Settings', icon: Icons.Settings, path: '#/' }, // Root defaults to settings based on screenshots
];

interface LayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
  title: string;
  breadcrumbs?: { label: string; path?: string }[];
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPath, onNavigate, title, breadcrumbs }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">
      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#1a1c2e] text-slate-300 transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center h-16 px-6 border-b border-slate-700/50">
          <div className="flex items-center gap-2 text-white font-bold text-xl">
             <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#1a1c2e]">
               <Icons.Settings className="w-5 h-5" />
             </div>
             <span>Modus</span>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPath === item.path || (item.path === '#/' && currentPath === '') || (item.path === '#/' && currentPath.startsWith('#/settings'));
            // Special case: if we are in a sub-route of settings (e.g. #/settings/units), Settings should be active.
            const isSettingsActive = item.name === 'Settings' && currentPath.includes('settings');

            const activeClass = (isActive || isSettingsActive) 
              ? 'bg-primary-600/10 text-primary-400 border-r-2 border-primary-500' 
              : 'hover:bg-slate-800 hover:text-white border-r-2 border-transparent';

            return (
              <a
                key={item.name}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeClass}`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </a>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-[#1a1c2e] md:bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-white md:text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icons.Menu className="w-6 h-6" />
            </button>
            
            <div className="hidden md:flex items-center text-sm font-medium text-slate-500">
               {breadcrumbs && breadcrumbs.length > 0 ? (
                 <div className="flex items-center gap-2">
                    {breadcrumbs.map((crumb, idx) => (
                      <React.Fragment key={idx}>
                         {idx > 0 && <Icons.ChevronRight className="w-4 h-4 text-slate-400" />}
                         <span 
                           className={idx === breadcrumbs.length - 1 ? 'text-slate-800 font-semibold' : 'cursor-pointer hover:text-primary-600'}
                           onClick={() => crumb.path && onNavigate(crumb.path)}
                         >
                           {crumb.label}
                         </span>
                      </React.Fragment>
                    ))}
                 </div>
               ) : (
                 <span className="text-lg font-bold text-slate-800">{title}</span>
               )}
            </div>
            
            {/* Mobile Title override */}
            <span className="md:hidden text-white font-semibold">{title}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:block relative w-64">
              <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all text-sm"
              />
            </div>
            <div className="flex items-center gap-4 text-slate-300 md:text-slate-600">
              <button className="relative hover:text-primary-600 transition-colors">
                <Icons.Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xs">
                  UN
                </div>
                <span className="hidden md:block text-sm font-medium text-slate-700">Username</span>
                <Icons.ChevronRight className="w-4 h-4 rotate-90 hidden md:block" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
           {children}
        </main>
      </div>
      
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};
