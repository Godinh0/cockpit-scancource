"use client";

import React, { useContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";

// ShadCN/UI
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ThemeContext } from "../components/Provider";

// Charts (ApexCharts) sem SSR
const ExpenseStatisticsChartNoSSR = dynamic(
  () => import("./ExpenseStatisticsChart").then((mod) => mod.ExpenseStatisticsChart),
  { ssr: false }
);

const WeeklyActivityChartNoSSR = dynamic(
  () => import("./WeeklyActivityChart").then((mod) => mod.WeeklyActivityChart),
  { ssr: false }
);

function DashboardPage() {
  const theme = useContext(ThemeContext);

  // -------------------------------------------------------
  // MOCK DE DADOS
  // -------------------------------------------------------
  const [tableData, setTableData] = useState([
    {
      vendor: "ZEBRA",
      partnOrig: "MC220J-2A3S2RW BR",
      partnSS: "MC220J-2A3S2RW BR_SC",
      category: "COLETOR COM TECLADO",
      onHand: 228,
      giroMes: 117,
      dioAtual: 58,
      dioIdeal: 90,
      leadTime: 60,
      months: [
        {
          month: "Jan",
          back: 10,
          baseSugestao: 20,
          sugestao: 20,
          decisao: 0,
          baseDio: 100,
          dio: 100,
          dioDec: 100,
        },
        {
          month: "Fev",
          back: 0,
          baseSugestao: 30,
          sugestao: 30,
          decisao: 0,
          baseDio: 120,
          dio: 120,
          dioDec: 120,
        },
        {
          month: "Mar",
          back: 0,
          baseSugestao: 5,
          sugestao: 5,
          decisao: 5,
          baseDio: 80,
          dio: 80,
          dioDec: 85,
        },
        {
          month: "Abr",
          back: 12,
          baseSugestao: 0,
          sugestao: 0,
          decisao: 0,
          baseDio: 140,
          dio: 140,
          dioDec: 140,
        },
        {
          month: "Mai",
          back: 0,
          baseSugestao: 50,
          sugestao: 50,
          decisao: 0,
          baseDio: 150,
          dio: 150,
          dioDec: 150,
        },
        {
          month: "Jun",
          back: 0,
          baseSugestao: 10,
          sugestao: 10,
          decisao: 5,
          baseDio: 60,
          dio: 60,
          dioDec: 65,
        },
        {
          month: "Jul",
          back: 0,
          baseSugestao: 0,
          sugestao: 0,
          decisao: 0,
          baseDio: 0,
          dio: 0,
          dioDec: 0,
        },
        {
          month: "Ago",
          back: 0,
          baseSugestao: 10,
          sugestao: 10,
          decisao: 0,
          baseDio: 200,
          dio: 200,
          dioDec: 200,
        },
        {
          month: "Set",
          back: 0,
          baseSugestao: 0,
          sugestao: 0,
          decisao: 0,
          baseDio: 90,
          dio: 90,
          dioDec: 90,
        },
        {
          month: "Out",
          back: 0,
          baseSugestao: 25,
          sugestao: 25,
          decisao: 0,
          baseDio: 200,
          dio: 200,
          dioDec: 200,
        },
        {
          month: "Nov",
          back: 0,
          baseSugestao: 0,
          sugestao: 0,
          decisao: 20,
          baseDio: 0,
          dio: 0,
          dioDec: 20,
        },
        {
          month: "Dez",
          back: 0,
          baseSugestao: 150,
          sugestao: 150,
          decisao: 0,
          baseDio: 1000,
          dio: 1000,
          dioDec: 1000,
        },
      ],
    },
    {
      vendor: "ZEBRA",
      partnOrig: "MC330X-GE4E64RW BR",
      partnSS: "MC330X-GE4E64RW_BR_SC",
      category: "COLETOR COM TECLADO",
      onHand: 534,
      giroMes: 93,
      dioAtual: 171,
      dioIdeal: 90,
      leadTime: 45,
      months: [
        {
          month: "Jan",
          back: 5,
          baseSugestao: 20,
          sugestao: 20,
          decisao: 0,
          baseDio: 10,
          dio: 10,
          dioDec: 10,
        },
        {
          month: "Fev",
          back: 0,
          baseSugestao: 3,
          sugestao: 3,
          decisao: 0,
          baseDio: 30,
          dio: 30,
          dioDec: 30,
        },
        {
          month: "Mar",
          back: 10,
          baseSugestao: 10,
          sugestao: 10,
          decisao: 5,
          baseDio: 40,
          dio: 40,
          dioDec: 45,
        },
        {
          month: "Abr",
          back: 0,
          baseSugestao: 50,
          sugestao: 50,
          decisao: 0,
          baseDio: 100,
          dio: 100,
          dioDec: 100,
        },
        {
          month: "Mai",
          back: 0,
          baseSugestao: 70,
          sugestao: 70,
          decisao: 10,
          baseDio: 200,
          dio: 200,
          dioDec: 210,
        },
        {
          month: "Jun",
          back: 0,
          baseSugestao: 0,
          sugestao: 0,
          decisao: 0,
          baseDio: 50,
          dio: 50,
          dioDec: 50,
        },
        {
          month: "Jul",
          back: 0,
          baseSugestao: 10,
          sugestao: 10,
          decisao: 5,
          baseDio: 80,
          dio: 80,
          dioDec: 85,
        },
        {
          month: "Ago",
          back: 0,
          baseSugestao: 5,
          sugestao: 5,
          decisao: 0,
          baseDio: 100,
          dio: 100,
          dioDec: 100,
        },
        {
          month: "Set",
          back: 0,
          baseSugestao: 35,
          sugestao: 35,
          decisao: 0,
          baseDio: 200,
          dio: 200,
          dioDec: 200,
        },
        {
          month: "Out",
          back: 0,
          baseSugestao: 0,
          sugestao: 0,
          decisao: 0,
          baseDio: 90,
          dio: 90,
          dioDec: 90,
        },
        {
          month: "Nov",
          back: 0,
          baseSugestao: 120,
          sugestao: 120,
          decisao: 0,
          baseDio: 400,
          dio: 400,
          dioDec: 400,
        },
        {
          month: "Dez",
          back: 0,
          baseSugestao: 200,
          sugestao: 200,
          decisao: 0,
          baseDio: 600,
          dio: 600,
          dioDec: 600,
        },
      ],
    },
  ]);

  // -------------------------------------------------------
  // ESTADOS PARA FILTROS
  // -------------------------------------------------------
  const [vendor, setVendor] = useState("All");
  const [category, setCategory] = useState("All");
  const [partnOrig, setPartnOrig] = useState("All");
  const [partnSS, setPartnSS] = useState("All");

  // -------------------------------------------------------
  // LISTAS DE OPÇÕES ÚNICAS
  // -------------------------------------------------------
  const uniqueVendors = useMemo(() => {
    const setV = new Set(tableData.map((d) => d.vendor));
    return Array.from(setV);
  }, [tableData]);

  const uniqueCategories = useMemo(() => {
    const setC = new Set(tableData.map((d) => d.category));
    return Array.from(setC);
  }, [tableData]);

  const uniquePartnOrigs = useMemo(() => {
    const setO = new Set(tableData.map((d) => d.partnOrig));
    return Array.from(setO);
  }, [tableData]);

  const uniquePartnSSs = useMemo(() => {
    const setS = new Set(tableData.map((d) => d.partnSS));
    return Array.from(setS);
  }, [tableData]);

  // Meses
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  // -------------------------------------------------------
  // APLICAÇÃO DE FILTROS
  // -------------------------------------------------------
  const filteredData = tableData.filter((item) => {
    const matchesVendor = vendor === "All" || item.vendor === vendor;
    const matchesCat = category === "All" || item.category === category;
    const matchesOrig = partnOrig === "All" || item.partnOrig === partnOrig;
    const matchesSS = partnSS === "All" || item.partnSS === partnSS;
    return matchesVendor && matchesCat && matchesOrig && matchesSS;
  });

  // -------------------------------------------------------
  // MANIPULADORES
  // -------------------------------------------------------
  // Ao editar LeadTime: recalcula "sugestao = baseSugestao + leadTime"
  const handleLeadTimeChange = (rowIndex: number, newLeadTime: number) => {
    setTableData((prev) =>
      prev.map((row, i) => {
        if (i !== rowIndex) return row;
        const updatedMonths = row.months.map((m) => ({
          ...m,
          sugestao: m.baseSugestao + newLeadTime,
        }));
        return {
          ...row,
          leadTime: newLeadTime,
          months: updatedMonths,
        };
      })
    );
  };

  // Ao editar Decisão: recalcula "dioDec = baseDio + decisao"
  const handleDecisaoChange = (rowIndex: number, monthIndex: number, newDecisao: number) => {
    setTableData((prev) =>
      prev.map((row, i) => {
        if (i !== rowIndex) return row;
        const updatedMonths = row.months.map((m, mi) => {
          if (mi !== monthIndex) return m;
          return {
            ...m,
            decisao: newDecisao,
            dioDec: m.baseDio + newDecisao,
          };
        });
        return {
          ...row,
          months: updatedMonths,
        };
      })
    );
  };

  // -------------------------------------------------------
  // CHAT (MOCK)
  // -------------------------------------------------------
  const chatHistoryMock = ["Relatório de quebra Janeiro", "Relatório saída primeiro semestre"];
  const [messages, setMessages] = useState([{ id: 1, sender: "iazzie", text: "Olá, como posso ajudar?" }]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: inputValue.trim(),
    };
    setInputValue("");
    setMessages((prev) => [...prev, userMessage]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now(), sender: "iazzie", text: "Carregando..." }]);
    }, 400);
  };

  return (
    <>
      {/* FILTROS */}
      <div className="flex flex-wrap gap-4 mt-5">
        {/* Vendor */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-[#EF7925]">Vendor</span>
          <Select onValueChange={setVendor} value={vendor}>
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue placeholder="Select Vendor" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Vendor</SelectLabel>
                <SelectItem value="All">All</SelectItem>
                {uniqueVendors.map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Categoria */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-[#EF7925]">Categoria</span>
          <Select onValueChange={setCategory} value={category}>
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categoria</SelectLabel>
                <SelectItem value="All">All</SelectItem>
                {uniqueCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* PARTN ORIG */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-[#EF7925]">PARTN ORIG</span>
          <Select onValueChange={setPartnOrig} value={partnOrig}>
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue placeholder="Select PARTN ORIG" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>PARTN ORIG</SelectLabel>
                <SelectItem value="All">All</SelectItem>
                {uniquePartnOrigs.map((o) => (
                  <SelectItem key={o} value={o}>
                    {o}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* PARTN SS */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-[#EF7925]">PARTN SS</span>
          <Select onValueChange={setPartnSS} value={partnSS}>
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue placeholder="Select PARTN SS" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>PARTN SS</SelectLabel>
                <SelectItem value="All">All</SelectItem>
                {uniquePartnSSs.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* PRIMEIRA TABELA */}
      <Card className="mt-5 p-3 shadow-sm">
        <CardContent className="flex">
          {/* Colunas iniciais */}
          <div className="w-[900px] mt-5">
            <Table>
              <TableHeader>
                <TableRow className="h-5 text-xs">
                  <TableHead className="py-0 w-24">Vendor</TableHead>
                  <TableHead className="py-0 w-32">PARTN ORIG</TableHead>
                  <TableHead className="py-0 w-40">PARTN SS</TableHead>
                  <TableHead className="py-0 w-32">Categoria</TableHead>
                  <TableHead className="py-0 w-10">OnHand</TableHead>
                  <TableHead className="py-0 w-10">Giro Mês</TableHead>
                  <TableHead className="py-0 w-10">DIO Atual</TableHead>
                  <TableHead className="py-0 w-10">DIO Ideal</TableHead>
                  <TableHead className="py-0 w-16">Lead Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell className="py-1 text-xs">{row.vendor}</TableCell>
                    <TableCell className="py-1 text-[10px]">{row.partnOrig}</TableCell>
                    <TableCell className="py-1 text-[10px]">{row.partnSS}</TableCell>
                    <TableCell className="py-1 text-[10px]">{row.category}</TableCell>
                    <TableCell className="py-1 text-xs">{row.onHand}</TableCell>
                    <TableCell className="py-1 text-xs">{row.giroMes}</TableCell>
                    <TableCell className="py-1 text-xs">{row.dioAtual}</TableCell>
                    <TableCell className="py-1 text-xs">{row.dioIdeal}</TableCell>
                    <TableCell className="py-1 text-xs">
                      <Input
                        type="number"
                        className="w-16 text-xs"
                        value={row.leadTime}
                        onChange={(e) => handleLeadTimeChange(rowIndex, Number(e.target.value))}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Colunas de meses (scroll) */}
          <div className="flex-1 overflow-x-auto ml-4 pr-10">
            <Table>
              <TableHeader>
                <TableRow className="h-5 text-xs">
                  {months.map((month) => (
                    <TableHead key={month} className="w-32 text-left">
                      {month}
                      <div className="flex">
                        <TableHead className="p-0 w-16 text-xs">Back</TableHead>
                        <TableHead className="py-0 w-16 text-xs">Sugestão</TableHead>
                        <TableHead className="py-0 w-16 text-xs">Decisão</TableHead>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className="py-2">
                    {months.map((_, monthIndex) => {
                      const monthData = row.months[monthIndex];
                      if (!monthData) return <TableCell key={monthIndex} />;

                      return (
                        <TableCell key={monthIndex} className="flex-row py-2 w-32 text-xs">
                          <div className="flex gap-5 flex-row">
                            <span className="py-0 w-10 text-xs">{monthData.back}</span>
                            <span className="py-0 w-10 text-xs">{monthData.sugestao}</span>
                            <Input
                              type="number"
                              className="w-16 text-xs"
                              value={monthData.decisao}
                              onChange={(e) =>
                                handleDecisaoChange(rowIndex, monthIndex, Number(e.target.value))
                              }
                            />
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <div className="mt-10">    
        <span className="text-base font-semibold text-[#EF7925]">On Hand Preditivo</span>
      </div> 

      {/* SEGUNDA TABELA */}
      <Card className="mt-5 p-3 shadow-sm">
        <CardContent className="flex">
          <div className="flex-1 overflow-x-auto pr-10">
            <Table>
              <TableHeader>
                <TableRow className="h-5 text-xs">
                  {months.map((month) => (
                    <TableHead key={month} className="w-32 text-left text-xs">
                      {month}
                      <div className="flex">
                        <TableHead className="p-0 w-7 text-xs"></TableHead>
                        <TableHead className="p-0 w-7 text-xs">DIO</TableHead>
                        <TableHead className="py-0 w-7 text-xs">DIO DEC</TableHead>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {months.map((_, monthIndex) => {
                      const monthData = row.months[monthIndex];
                      if (!monthData) return <TableCell key={monthIndex} />;

                      return (
                        <TableCell key={monthIndex} className="py-3 w-32 text-xs">
                          <div className="flex gap-5 flex-row">
                            <span className="py-0 w-5 text-xs"></span>
                            <span className="py-0 w-5 text-xs">{monthData.dio}</span>
                            <span className="py-0 w-5 text-xs">{monthData.dioDec}</span>
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Avatar */}
      <img 
        src="/iazzie.png" 
        alt="IAzzie Logo" 
        className="ml-2 mt-7 h-8 w-auto" 
      />

      {/* CHAT */}
      <Card className="mt-5 shadow-sm">
        <CardContent className="p-4 flex h-[400px]">
          {/* Lateral Esquerda */}
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
            <div className="flex-1 p-2 space-y-2 overflow-auto">
              {messages.map((msg) => {
                const isIazzie = msg.sender === "iazzie";
                return (
                  <div
                    key={msg.id}
                    className={`max-w-[70%] p-2 rounded text-sm ${
                      isIazzie ? "bg-gray-100 text-gray-800" : "bg-gray-800 text-gray-100 ml-auto"
                    }`}
                  >
                    {msg.text}
                  </div>
                );
              })}
            </div>
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

      {/* GRÁFICOS */}
      <Card className="mt-5 p-4 shadow-sm">
        <CardContent className="flex flex-wrap md:flex-nowrap gap-5">
          <div className="w-full md:w-1/2">
            <h2 className="text-lg font-semibold mb-2">Weekly Activity</h2>
            <WeeklyActivityChartNoSSR />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-lg font-semibold mb-2">Expense Statistics</h2>
            <ExpenseStatisticsChartNoSSR />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default DashboardPage;
