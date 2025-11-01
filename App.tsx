
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import RegistrarVendas from './pages/RegistrarVendas';
import Chatbot from './components/gemini/Chatbot';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vendas/registrar" element={<RegistrarVendas />} />
          {/* Add other routes here as needed */}
        </Routes>
        <Chatbot />
      </Layout>
    </HashRouter>
  );
}

export default App;
