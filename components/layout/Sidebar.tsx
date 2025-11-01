
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, CreditCard, ShoppingCart, TrendingUp, Box, BarChart2, X } from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Cadastros', href: '/cadastros', icon: FileText },
  { 
    name: 'Financeiro', 
    href: '/financeiro', 
    icon: CreditCard,
    count: 8,
    subLinks: [
        { name: 'Contas a Pagar', href: '/financeiro/contas-a-pagar' },
        { name: 'Contas Bancárias', href: '/financeiro/contas-bancarias' },
        { name: 'Recorrências', href: '/financeiro/recorrencias' },
        { name: 'Fechamento de Caixa', href: '/financeiro/fechamento-caixa' },
        { name: 'Categorias', href: '/financeiro/categorias' },
    ]
  },
  { name: 'Compras', href: '/compras', icon: ShoppingCart },
  { 
    name: 'Vendas', 
    href: '/vendas', 
    icon: TrendingUp,
    subLinks: [
        { name: 'Registrar Vendas', href: '/vendas/registrar' },
        { name: 'Metas', href: '/vendas/metas' },
        { name: 'Relatórios', href: '/vendas/relatorios' },
    ]
  },
  { name: 'Produtos', href: '/produtos', icon: Box },
  { name: 'Relatórios', href: '/relatorios', icon: BarChart2 },
];

const SidebarContent: React.FC = () => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 border-b">
                <div className="flex items-center">
                    <span className="text-blue-600 text-2xl font-bold">FinControl</span>
                </div>
            </div>
            <nav className="flex-1 px-4 py-4 overflow-y-auto">
                {navigation.map((item) => (
                <div key={item.name}>
                    <NavLink
                        to={item.href}
                        end={item.href === '/'}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 mt-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                            isActive
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-200'
                            }`
                        }
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="mx-4">{item.name}</span>
                        {item.count && (
                            <span className="ml-auto text-xs font-semibold text-red-600 bg-red-100 rounded-full px-2 py-0.5">
                                {item.count}
                            </span>
                        )}
                    </NavLink>
                    {item.subLinks && (
                        <div className="ml-8 mt-1 space-y-1">
                            {item.subLinks.map(subLink => (
                                <NavLink
                                    key={subLink.name}
                                    to={subLink.href}
                                    className={({ isActive }) =>
                                        `block px-4 py-1.5 text-sm rounded-md ${
                                        isActive
                                            ? 'text-blue-700 font-semibold'
                                            : 'text-gray-500 hover:text-gray-800'
                                        }`
                                    }
                                >
                                    {subLink.name}
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            </nav>
            <div className="px-4 py-4 border-t">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center font-bold">
                        U
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">Usuário</p>
                        <p className="text-xs text-gray-500">Administrador</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
            <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
                <SidebarContent />
            </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
          <div className="lg:hidden">
              <div className="fixed inset-0 flex z-40">
                  <div className="fixed inset-0">
                      <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={() => setSidebarOpen(false)}></div>
                  </div>
                  <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                      <div className="absolute top-0 right-0 -mr-12 pt-2">
                          <button
                              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                              onClick={() => setSidebarOpen(false)}
                          >
                              <span className="sr-only">Close sidebar</span>
                              <X className="h-6 w-6 text-white" />
                          </button>
                      </div>
                      <SidebarContent />
                  </div>
                  <div className="flex-shrink-0 w-14"></div>
              </div>
          </div>
      )}
    </>
  );
};

export default Sidebar;
