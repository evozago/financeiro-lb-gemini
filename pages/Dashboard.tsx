
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import BarChartComponent from '../components/charts/BarChartComponent';
import LineChartComponent from '../components/charts/LineChartComponent';
import PieChartComponent from '../components/charts/PieChartComponent';
import { ChartData, LineChartData } from '../types';
import { DollarSign, AlertTriangle, FileCheck, Users, BarChart, TrendingUp, Percent, Info, Bot } from 'lucide-react';
import { analyzeFinancialDataWithThinking } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';


const pagosFilialData: ChartData[] = [
  { name: 'Lui Bambini', value: 480 },
];
const categoriasData: ChartData[] = [
  { name: 'Produto para Revenda', value: 480 },
];
const evolucaoDiariaData: LineChartData[] = [
  { name: '01/10', paid: 0, pending: 0 },
  { name: '10/10', paid: 0, pending: 0 },
  { name: '20/10', paid: 0, pending: 0 },
  { name: '31/10', paid: 150, pending: 300 },
];

const distribuicaoSituacaoData: ChartData[] = [
    { name: 'Em aberto', value: 100 },
    { name: 'Pagas', value: 0 },
];

const Dashboard: React.FC = () => {
    const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
    const [analysisResult, setAnalysisResult] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const dashboardDataSummary = JSON.stringify({
        totalPeriodo: { valor: 0, media: 0 },
        totalAberto: { valor: 527.95, parcelas: 1 },
        contasPagas: { valor: 0, participacao: 0 },
        contasAberto: { valor: 1, participacao: '100%' },
        vendasMilhas: { faturado: 4000 },
        ticketMedioVendas: 0,
        pagamentosFilial: pagosFilialData,
        categoriasFinanceiras: categoriasData,
    }, null, 2);


    const handleAnalyze = async () => {
        setIsAnalysisModalOpen(true);
        setIsAnalyzing(true);
        setAnalysisResult('');
        const result = await analyzeFinancialDataWithThinking(dashboardDataSummary);
        setAnalysisResult(result);
        setIsAnalyzing(false);
    };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <div className="flex items-center space-x-4">
            <input type="date" defaultValue="2025-01-01" className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm" />
            <span className="text-gray-500">-</span>
            <input type="date" defaultValue="2025-01-31" className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm" />
            <select className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm">
                <option>Todas as filiais</option>
            </select>
            <button
                onClick={handleAnalyze}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-indigo-300"
                disabled={isAnalyzing}
            >
                <Bot className="mr-2 h-4 w-4" />
                {isAnalyzing ? 'Analisando...' : 'Análise com IA'}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <Card title="Total Pago no Período" value="R$ 0,00" subtitle="Ticket médio: R$ 0,00" icon={<DollarSign size={20} />} />
        <Card title="Total em Aberto" value="R$ 527,95" subtitle="Parcelas em aberto: 1" icon={<AlertTriangle size={20} />} />
        <Card title="Contas Pagas" value="0" subtitle="Participação: 0.0%" icon={<FileCheck size={20} />} />
        <Card title="Contas em Aberto" value="1" subtitle="Participação: 100.0%" icon={<Info size={20} />} />
        <Card title="Atraso Médio" value="Sem dados" subtitle="Sem pagamentos registrados no período" icon={<Users size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Vendas do Mês" value="0" subtitle="R$ 4.000 faturado" icon={<TrendingUp size={20} />} />
        <Card title="Ticket Médio de Vendas" value="R$ 0,00" subtitle="Média por vendas no mês atual" icon={<BarChart size={20} />} />
        <Card title="Percentual de Pagamentos" value="0.0%" subtitle="Parcelas pagas sobre o total do período" icon={<Percent size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChartComponent data={pagosFilialData} barColor="#f9b208" title="Pagamentos por Filial" subtitle="Valores pagos e em aberto no período selecionado"/>
        <BarChartComponent data={categoriasData} barColor="#0ea5e9" title="Categorias Financeiras" subtitle="Principais categorias de contas pagas e a pagar"/>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartComponent data={evolucaoDiariaData} title="Evolução diária de pagamentos" subtitle="Comparativo entre valores pagos e previstos por dia" />
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
             <PieChartComponent data={distribuicaoSituacaoData} title="Distribuição por Situação" subtitle="Quantidades e valores consolidados do período"/>
             <BarChartComponent data={[{name: 'Pagas', value: 0}, {name: 'Em aberto', value: 480}]} barColor="#3b82f6" title="" subtitle=""/>
        </div>
      </div>

      {isAnalysisModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Análise Financeira com IA</h3>
              <button onClick={() => setIsAnalysisModalOpen(false)} className="text-gray-500 hover:text-gray-800">&times;</button>
            </div>
            {isAnalyzing ? (
              <div className="flex items-center justify-center h-48">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <div className="prose max-w-none">
                <ReactMarkdown>{analysisResult}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
