
import React, { useState } from 'react';
import { SaleRecord } from '../types';
import { Plus, Download, Upload, Trash2, Edit, FilePen, Bot, Mic } from 'lucide-react';
import { analyzeReceiptImage } from '../services/geminiService';
import AudioTranscriber from '../components/gemini/AudioTranscriber';

const initialSalesData: SaleRecord[] = [
    { monthYear: "Janeiro/2025", vendor: "MICAELLY DOS SANTOS SILVA", branch: "Lui Bambini", grossValue: 177207.00, discount: 0, netValue: 177207.00, items: 1340, attendances: 0 },
    { monthYear: "Janeiro/2025", vendor: "JULIA CAROLINA SANTIAGO ALMEIDA", branch: "Lui Bambini", grossValue: 137948.66, discount: 0, netValue: 137948.66, items: 1150, attendances: 0 },
    { monthYear: "Dezembro/2024", vendor: "MARIA JULIA GOMES FREITAS SILVA", branch: "Lui Bambini", grossValue: 166375.52, discount: 0, netValue: 166375.52, items: 1348, attendances: 338 },
    { monthYear: "Abril/2024", vendor: "MARIA JULIA GOMES FLEURY BUENO", branch: "Lui Bambini", grossValue: 153341.46, discount: 0, netValue: 153341.46, items: 1203, attendances: 0 },
    { monthYear: "Março/2024", vendor: "MARIA JULIA GOMES FLEURY BUENO", branch: "Lui Bambini", grossValue: 157443.52, discount: 0, netValue: 157443.52, items: 1331, attendances: 387 },
    { monthYear: "Março/2024", vendor: "MICAELLY DOS SANTOS SILVA", branch: "Lui Bambini", grossValue: 123733.96, discount: 0, netValue: 123733.96, items: 983, attendances: 0 },
];

const RegistrarVendas: React.FC = () => {
  const [salesData, setSalesData] = useState<SaleRecord[]>(initialSalesData);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = (reader.result as string).split(',')[1];
        setImagePreview(reader.result as string);
        const result = await analyzeReceiptImage(base64String, file.type);
        try {
            const parsedResult = JSON.parse(result.replace(/```json|```/g, ''));
            alert(`Análise Concluída:\nFornecedor: ${parsedResult.vendor}\nTotal: ${parsedResult.total}\nData: ${parsedResult.date}`);
        } catch(err) {
            alert(`Análise Concluída:\n${result}`);
        }
        setIsAnalyzing(false);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Registrar Vendas Mensais</h2>
        <p className="text-sm text-gray-500">Cadastre vendas do mês por vendedora ou importe via CSV/Excel</p>
      </div>

      <div className="flex space-x-2">
        <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Cadastro Manual
        </button>
        <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
          <Upload className="mr-2 h-4 w-4" />
          Importar CSV/Excel
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Nova Venda Mensal</h3>
        <p className="text-sm text-gray-500 mb-6">Registre as vendas totais do mês para cada vendedora</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Form Fields */}
          <div><label className="text-sm font-medium text-gray-700">Mês</label><select className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"><option>Novembro</option></select></div>
          <div><label className="text-sm font-medium text-gray-700">Ano</label><select className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"><option>2025</option></select></div>
          <div><label className="text-sm font-medium text-gray-700">Vendedora</label><select className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"><option>Selecione a vendedora</option></select></div>
          <div><label className="text-sm font-medium text-gray-700">Filial</label><select className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"><option>Selecione a filial</option></select></div>
          <div><label className="text-sm font-medium text-gray-700">Valor Bruto</label><input type="text" defaultValue="0,00" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/></div>
          <div><label className="text-sm font-medium text-gray-700">Desconto</label><input type="text" defaultValue="0,00" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/></div>
          <div><label className="text-sm font-medium text-gray-700">Quantidade de Itens</label><input type="text" defaultValue="1" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/></div>
          <div><label className="text-sm font-medium text-gray-700">Total de Atendimentos</label><input type="text" defaultValue="0" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/></div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-md flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Valor Líquido do Mês:</span>
            <span className="text-lg font-bold text-blue-800">R$ 0,00</span>
        </div>

        <div className="mt-6 flex justify-start">
             <button className="flex items-center px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700">
                <Plus className="mr-2 h-5 w-5" />
                Registrar Venda
            </button>
        </div>
      </div>

       <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Análise e Transcrição com IA</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="receipt-upload" className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 cursor-pointer disabled:opacity-50">
                <Bot className="mr-2 h-4 w-4" />
                {isAnalyzing ? 'Analisando Imagem...' : 'Analisar Comprovante com IA'}
              </label>
              <input id="receipt-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={isAnalyzing} />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 rounded-md max-h-40" />}
            </div>
            <div>
                <button onClick={() => setIsTranscribing(true)} className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                    <Mic className="mr-2 h-4 w-4" />
                    Transcrever Nota de Áudio
                </button>
                {isTranscribing && <AudioTranscriber onClose={() => setIsTranscribing(false)} />}
            </div>
          </div>
        </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold text-gray-800">Vendas Mensais Registradas</h3>
                <p className="text-sm text-gray-500">Visualize e gerencie as vendas já cadastradas.</p>
            </div>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                <Download className="mr-2 h-4 w-4" />
                Exportar CSV
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Mês/Ano</th>
                        <th scope="col" className="px-6 py-3">Vendedora</th>
                        <th scope="col" className="px-6 py-3">Filial</th>
                        <th scope="col" className="px-6 py-3 text-right">Valor Bruto</th>
                        <th scope="col" className="px-6 py-3 text-right">Desconto</th>
                        <th scope="col" className="px-6 py-3 text-right">Valor Líquido</th>
                        <th scope="col" className="px-6 py-3 text-center">Itens</th>
                        <th scope="col" className="px-6 py-3 text-center">Atend.</th>
                        <th scope="col" className="px-6 py-3 text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {salesData.map((sale, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{sale.monthYear}</td>
                            <td className="px-6 py-4">{sale.vendor}</td>
                            <td className="px-6 py-4">{sale.branch}</td>
                            <td className="px-6 py-4 text-right">{sale.grossValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                            <td className="px-6 py-4 text-right">{sale.discount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                            <td className="px-6 py-4 text-right">{sale.netValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                            <td className="px-6 py-4 text-center">{sale.items}</td>
                            <td className="px-6 py-4 text-center">{sale.attendances}</td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex justify-center space-x-2">
                                    <button className="text-gray-400 hover:text-blue-600"><FilePen size={16}/></button>
                                    <button className="text-gray-400 hover:text-green-600"><Edit size={16}/></button>
                                    <button className="text-gray-400 hover:text-red-600"><Trash2 size={16}/></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default RegistrarVendas;
