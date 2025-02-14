'use client';

import React, { useContext, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ThemeContext } from '../components/Provider';
import { WeeklyActivityChart } from './WeeklyActivityChart';
import { ExpenseStatisticsChart } from './ExpenseStatisticsChart';

// Importa nossos componentes de gráfico baseados em ApexCharts


function DashboardPage() {
  const theme = useContext(ThemeContext);
  const [vendor, setVendor] = useState('All');
  const [category, setCategory] = useState('All');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  // Mock de dados do Dashboard
  const data = [
    { vendor: 'Vendor 1', category: 'Category 1', values: Array(7).fill(228) },
    { vendor: 'Vendor 1', category: 'Category 2', values: Array(7).fill(228) },
  ];

  const filteredData = data.filter(
    (item) =>
      (vendor === 'All' || item.vendor === vendor) &&
      (category === 'All' || item.category === category),
  );

  // ----------------- CÓDIGO DO CHAT -----------------
  const chatHistoryMock = ['Relatório de quebra Janeiro', 'Relatório saída primeiro semestre'];

  const [messages, setMessages] = useState([
    { id: 1, sender: 'iazzie', text: 'Olá, como posso ajudar?' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputValue.trim(),
    };

    setInputValue('');
    setMessages((prev) => [...prev, userMessage]);

    // Mock de resposta
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now(), sender: 'iazzie', text: 'Carregando...' }]);
    }, 400);
  };

  return (
    <>
      {/* CARD COM OS GRÁFICOS (ApexCharts) */}
      

      {/* Filtros */}
      <div className="flex gap-4 mt-5">
        <div className="flex flex-col justify-self-start">
          <span className="text-base text-left font-semibold hover:bg-[#F5F7FA] text-[#EF7925]">
            Vendor
          </span>
          <Select onValueChange={setVendor} value={vendor}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Vendor" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Vendor</SelectLabel>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Vendor 1">Vendor 1</SelectItem>
                <SelectItem value="Vendor 2">Vendor 2</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col justify-self-start">
          <span className="text-base text-left font-semibold hover:bg-[#F5F7FA] text-[#EF7925]">
            Categoria
          </span>
          <Select onValueChange={setCategory} value={category}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Category 1">Category 1</SelectItem>
                <SelectItem value="Category 2">Category 2</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Card 1 */}
      <Card className="mt-5 p-3 shadow-sm">
        <CardContent className="flex">
          {/* Tabela Fixa */}
          <div className="w-[800px] mt-5">
            <Table>
              <TableHeader>
                <TableRow className="h-5 text-xs">
                  <TableHead className="py-0 w-20 text-xs">Vendor</TableHead>
                  <TableHead className="py-0 w-32 text-xs">Category</TableHead>
                  <TableHead className="py-0 w-10 text-xs">On Hand</TableHead>
                  <TableHead className="py-0 w-10 text-xs">Giro Mês</TableHead>
                  <TableHead className="py-0 w-10 text-xs">Dio Atual</TableHead>
                  <TableHead className="py-0 w-10 text-xs">Dio Ideal</TableHead>
                  <TableHead className="py-0 w-16 text-xs">Lead Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="py-0 text-xs">{item.vendor}</TableCell>
                    <TableCell className="py-0 text-xs">{item.category}</TableCell>
                    <TableCell className="py-0 text-xs">228</TableCell>
                    <TableCell className="py-0 text-xs">228</TableCell>
                    <TableCell className="py-0 text-xs">228</TableCell>
                    <TableCell className="py-0 text-xs">228</TableCell>
                    <TableCell className="py-0 text-xs">
                      <Input type="number" className="w-16" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Tabela com Scroll */}
          <div className="flex-1 overflow-x-auto ml-4 pr-10">
            <Table>
              <TableHeader>
                <TableRow className="h-5 text-xs">
                  {months.map((month) => (
                    <TableHead key={month} className="w-32 text-left text-xs">
                      {month}
                      <TableHead className="p-0 w-16 text-xs">Back</TableHead>
                      <TableHead className="py-0 w-16 text-xs">Sugestão</TableHead>
                      <TableHead className="py-0 w-16 text-xs">Decisão</TableHead>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, i) => (
                  <TableRow key={i}>
                    {months.map((month) => (
                      <TableCell key={month} className="py-0 w-32 text-xs">
                        <TableCell className="py-0 w-10 text-xs">228</TableCell>
                        <TableCell className="py-0 w-10 text-xs">228</TableCell>
                        <TableCell className="py-0 w-10 text-xs">
                          <Input type="number" className="w-16" />
                        </TableCell>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Card 2 */}
      <Card className="mt-5 p-3 shadow-sm">
        <CardContent className="flex">
          {/* Tabela Fixa */}
          <div className="w-[800px] mt-5">
            <Table>
              <TableHeader>
                <TableRow className="h-5 text-xs">
                  <TableHead className="py-0 w-20 text-xs">Vendor</TableHead>
                  <TableHead className="py-0 w-32 text-xs">Category</TableHead>
                  <TableHead className="py-0 w-10 text-xs">On Hand</TableHead>
                  <TableHead className="py-0 w-10 text-xs">Giro Mês</TableHead>
                  <TableHead className="py-0 w-10 text-xs">Dio Atual</TableHead>
                  <TableHead className="py-0 w-10 text-xs">Dio Ideal</TableHead>
                  <TableHead className="py-0 w-16 text-xs">Lead Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="py-0 text-xs">{item.vendor}</TableCell>
                    <TableCell className="py-0 text-xs">{item.category}</TableCell>
                    <TableCell className="py-0 text-xs">228</TableCell>
                    <TableCell className="py-0 text-xs">228</TableCell>
                    <TableCell className="py-0 text-xs">228</TableCell>
                    <TableCell className="py-0 text-xs">228</TableCell>
                    <TableCell className="py-0 text-xs">
                      <Input type="number" className="w-16" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Tabela com Scroll */}
          <div className="flex-1 overflow-x-auto ml-4 pr-10">
            <Table>
              <TableHeader>
                <TableRow className="h-5 text-xs">
                  {months.map((month) => (
                    <TableHead key={month} className="w-32 text-left text-xs">
                      {month}
                      <TableHead className="p-0 w-16 text-xs">Back</TableHead>
                      <TableHead className="py-0 w-16 text-xs">Sugestão</TableHead>
                      <TableHead className="py-0 w-16 text-xs">Decisão</TableHead>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, i) => (
                  <TableRow key={i}>
                    {months.map((month) => (
                      <TableCell key={month} className="py-0 w-32 text-xs">
                        <TableCell className="py-0 w-10 text-xs">228</TableCell>
                        <TableCell className="py-0 w-10 text-xs">228</TableCell>
                        <TableCell className="py-0 w-10 text-xs">
                          <Input type="number" className="w-16" />
                        </TableCell>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* CHATBOX */}
      <Card className="mt-5 shadow-sm">
        <CardContent className="flex h-[400px]">
          {/* Lateral Esquerda: Histórico e Nova Conversa */}
          <div className="w-[260px] border-r border-gray-200 pr-4 flex flex-col">
            <button className="text-sm font-semibold text-[#2D2D2D] hover:bg-[#F5F7FA] text-left p-1">
              + Nova Conversa
            </button>

            <hr className="my-2" />

            <div className="text-xs font-semibold text-[#2D2D2D] mb-2">Histórico</div>
            <div className="flex-1 overflow-auto">
              {chatHistoryMock.map((item, index) => (
                <div
                  key={index}
                  className="text-sm text-[#2D2D2D] hover:bg-[#F5F7FA] cursor-pointer p-1 rounded"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Área Principal do Chat */}
          <div className="flex-1 flex flex-col">
            {/* Mensagens */}
            <div className="flex-1 p-2 space-y-2 overflow-auto">
              {messages.map((msg) => {
                const isIazzie = msg.sender === 'iazzie';
                return (
                  <div
                    key={msg.id}
                    className={`max-w-[70%] p-2 rounded text-sm ${
                      isIazzie
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-gray-800 text-gray-100 ml-auto'
                    }`}
                  >
                    {msg.text}
                  </div>
                );
              })}
            </div>

            {/* Input de Envio */}
            <div className="flex p-2 border-t border-gray-200">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Converse com IAzzie"
                className="flex-1 mr-2 text-sm"
              />
              <button
                onClick={handleSend}
                className="bg-gray-200 px-4 py-2 text-sm rounded hover:bg-gray-300"
              >
                Enviar
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-5 p-4 shadow-sm">
        <CardContent className="flex flex-wrap md:flex-nowrap gap-5">
          {/* Gráfico de Barras */}
          <div className="w-full md:w-1/2">
            <h2 className="text-lg font-semibold mb-2">Weekly Activity</h2>
            <WeeklyActivityChart />
          </div>

          {/* Gráfico de Pizza */}
          <div className="w-full md:w-1/2">
            <h2 className="text-lg font-semibold mb-2">Expense Statistics</h2>
            <ExpenseStatisticsChart />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default DashboardPage;
