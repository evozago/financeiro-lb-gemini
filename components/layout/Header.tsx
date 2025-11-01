
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, Menu, Share2, Upload, Plus } from 'lucide-react';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
    const location = useLocation();

    const getPageTitle = () => {
        const path = location.pathname;
        if (path === '/') return 'Dashboard';
        if (path.includes('/vendas/registrar')) return 'Vendas / Registrar';
        return 'Dashboard';
    }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b-2 border-gray-100">
      <div className="flex items-center">
        <button onClick={() => setSidebarOpen(true)} className="text-gray-500 focus:outline-none lg:hidden">
          <Menu className="h-6 w-6" />
        </button>
        <div className="relative mx-4 lg:mx-0">
          <h1 className="text-xl font-semibold text-gray-700">{getPageTitle()}</h1>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
            </span>
            <input
                className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 bg-gray-100 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Buscar..."
            />
        </div>

        <div className="hidden sm:flex items-center space-x-2">
             <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                <Upload className="mr-2 h-4 w-4" />
                Importar XML
            </button>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Nova Conta
            </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200">
            <Share2 className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-1.5 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700">
            Publish
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
