"use client";

import React, { useContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {  Input } from 'antd';
// ShadCN/UI
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
import { FileSpreadsheet } from "lucide-react";

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
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  // Mock de dados inicial
  const calculateInitialSugestao = (onHand: number, giroMes: number, leadTime: number, back: number): number => {
    return (giroMes / 30) * leadTime - onHand - back;
  };
  
  const calculateInitialDio = (onHand: number, giroMes: number, decisao: number, back: number): number => {
    return onHand - giroMes + decisao + back;
  };
  
  const calculateInitialDioDec = (dio: number, giroMes: number): number => {
    return dio / 30 / giroMes;
  };

  // Mock de dados inicial com sugestão já calculada
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
      months: months.map((month, index) => ({
        month,
        back: 0,
        sugestao: calculateInitialSugestao(228, 117, 60, 0), 
        decisao: 0,
        dio: calculateInitialDio(228, 117, 0, 0),
        dioDec: calculateInitialDioDec(calculateInitialDio(228, 117, 0, 0), 117)
      })),
    },
    {
      vendor: "ZEBRA",
      partnOrig: "MC330L-GE4EG4RW BR",
      partnSS: "MC330L-GE4EG4RW BR_SC",
      category: "COLETOR COM TECLADO",
      onHand: 534,
      giroMes: 93,
      dioAtual: 171,
      dioIdeal: 90,
      leadTime: 60,
      months: months.map((month, index) => ({
        month,
        back: 0,
        sugestao: calculateInitialSugestao(534, 93, 60, 0),
        decisao: 0,
        dio: calculateInitialDio(534, 93, 0, 0),
        dioDec: calculateInitialDioDec(calculateInitialDio(534, 93, 0, 0), 93)
      })),
    },
    {
      vendor: "ZEBRA",
      partnOrig: "MC330L-GJ4EG4RW BR",
      partnSS: "MC330L-GJ4EG4RW BR_SC",
      category: "COLETOR COM TECLADO",
      onHand: 95,
      giroMes: 88,
      dioAtual: 33,
      dioIdeal: 90,
      leadTime: 60,
      months: months.map((month, index) => ({
        month,
        back: 0,
        sugestao: calculateInitialSugestao(95, 88, 60, 0),
        decisao: 0,
        dio: calculateInitialDio(95, 88, 0, 0),
        dioDec: calculateInitialDioDec(calculateInitialDio(95, 88, 0, 0), 88)
      })),
    },
    {
      vendor: "ZEBRA",
      partnOrig: "MC330X-GE4EG4RW BR",
      partnSS: "MC330X-GE4EG4RW BR_SC",
      category: "COLETOR COM TECLADO",
      onHand: 187,
      giroMes: 14,
      dioAtual: 390,
      dioIdeal: 90,
      leadTime: 60,
      months: months.map((month, index) => ({
        month,
        back: 0,
        sugestao: calculateInitialSugestao(187, 14, 60, 0),
        decisao: 0,
        dio: calculateInitialDio(187, 14, 0, 0),
        dioDec: calculateInitialDioDec(calculateInitialDio(187, 14, 0, 0), 14)
      })),
    },
    {
      vendor: "ZEBRA",
      partnOrig: "MC930B-GSEDG4RW",
      partnSS: "MC930B-GSEDG4RW_SC",
      category: "COLETOR COM TECLADO",
      onHand: 212,
      giroMes: 88,
      dioAtual: 73,
      dioIdeal: 75,
      leadTime: 45,
      months: months.map((month, index) => ({
        month,
        back: 0,
        sugestao: calculateInitialSugestao(212, 88, 45, 0),
        decisao: 0,
        dio: calculateInitialDio(212, 88, 0, 0),
        dioDec: calculateInitialDioDec(calculateInitialDio(212, 88, 0, 0), 88)
      })),
    } 
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

  const recalculateSugestao = (data:any) => {
    return data.map((row:any) => {
        let updatedMonths = row.months.map((m:any, index:any) => {
            let dio = row.onHand - row.giroMes + m.back + m.decisao;
            let dioDec = dio / (row.giroMes / 30);
            
            return {
                ...m,
                sugestao: (row.giroMes / 30) * row.leadTime - row.onHand - m.back,
                dio,
                dioDec
            };
        });

        // Propagação das decisões de forma acumulativa
        for (let i = 1; i < updatedMonths.length; i++) {
            updatedMonths[i].sugestao -= updatedMonths[i - 1].decisao;
        }

        return { ...row, months: updatedMonths };
    });
};

const handleLeadTimeChange = (rowIndex:any, newLeadTime:any) => {
    setTableData((prev) => {
        let updatedData = [...prev];
        updatedData[rowIndex].leadTime = newLeadTime;
        return recalculateSugestao(updatedData);
    });
};

const handleDecisaoChange = (rowIndex:any, monthIndex:any, newDecisao:any) => {
    setTableData((prev) => {
        let updatedData = [...prev];
        updatedData[rowIndex].months[monthIndex].decisao = newDecisao;
        return recalculateSugestao(updatedData);
    });
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
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="h-5 text-xs">
                  <TableHead className="py-0 w-24">Vendor</TableHead>
                  <TableHead className="py-0 w-52">PARTN ORIG</TableHead>
                  <TableHead className="py-0 w-52">PARTN SS</TableHead>
                  <TableHead className="py-0 w-32">Categoria</TableHead>
                <TableHead className="w-32 pl-10 pb-5 text-left">
                <span className="text-sm font-semibold text-[#EF7925]">Atual</span>
                  <TableHead className="p-0 w-10">OnHand</TableHead>
                  <TableHead className="py-0 pl-6 w-16">Giro Mês</TableHead>
                  <TableHead className="py-0 w-16">DIO Atual</TableHead>
                  <TableHead className="py-0 w-16">DIO Ideal</TableHead>
                  <TableHead className="py-0 w-16">Lead Time</TableHead>
                </TableHead>
                <TableHead className="w-32 text-left">
                <span className="text-sm font-semibold text-[#EF7925]">Entradas</span>
                {months.map((month) => (
                  <TableHead key={month} className="px-0 w-32 pr-10 text-left">
                    {month}
                    <div className="flex">
                      <TableHead className="p-0 w-10 text-xs">Back</TableHead>
                      <TableHead className="py-0 w-20 text-xs">Sugestão</TableHead>
                      <TableHead className="py-0 w-32 text-xs">Justificativa</TableHead>
                      <TableHead className="py-0 w-16 text-xs">Decisão</TableHead>
                    </div>
                  </TableHead>
                ))}
                 </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell className="py-1 text-xs">{row.vendor}</TableCell>
                  <TableCell className="py-1 text-[10px]">{row.partnOrig}</TableCell>
                  <TableCell className="py-1 text-[10px]">{row.partnSS}</TableCell>
                  <TableCell className="py-1 text-[10px]">{row.category}</TableCell>
                  <TableCell className="pr-10">
                    <div className="flex gap-7 pl-8 flex-row">
                      <span className="py-1 text-xs">{row.onHand}</span>
                      <span className="py-1 pl-2 text-xs">{row.giroMes}</span>
                      <span className="py-1 pl-2 text-xs">{row.dioAtual}</span>
                      <span className="py-1 pl-5  text-xs">{row.dioIdeal}</span>
                      <div className="pl-3 " >
                        <Input
                          type="number"
                          className="w-16 text-center text-xs"
                          value={row.leadTime}
                          onChange={(e) => handleLeadTimeChange(rowIndex, Number(e.target.value))}
                        />
                      </div>
                    </div>  
                  </TableCell>
                  <div className="flex pl-7 flex-row">
                  {months.map((_, monthIndex) => {
                    const monthData = row.months[monthIndex];
                    if (!monthData) return <TableCell key={monthIndex} />;
                    return (
                      <TableCell key={monthIndex} className="p-0  py-2 text-xs">
                        <div className="flex gap-3 w-[352px] flex-row ">
                          <span className="py-0 p-0 w-10 text-xs">{monthData.back}</span>
                          <span className="py-0 w-14 text-xs">{monthData.sugestao}</span>
                          <span className="py-0 w-28 text-[10px]">
                            {(() => {
                              if (monthData.sugestao > 1000) {
                                return 'Grande compra necessária';
                              } else if (monthData.sugestao >= 100 && monthData.sugestao <= 1000) {
                                return 'Compra de médio porte';
                              } else if (monthData.sugestao >= 1 && monthData.sugestao < 100) {
                                return 'Pequena compra necessária';
                              } else if (monthData.sugestao === 0) {
                                return 'Sem necessidade de compra';
                              } else {
                                return 'Reduzir estoque atual';
                              }
                            })()}
                          </span>
                          <Input
                            type="number"
                            className="w-16 text-center text-xs"
                            value={monthData.decisao}
                            onChange={(e) => handleDecisaoChange(rowIndex, monthIndex, Number(e.target.value))}
                          />
                          </div>
                      </TableCell>
                    );
                  })}
                  </div>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="mt-10">    
        <span className="text-base font-semibold text-[#EF7925]">On Hand Preditivo</span>
      </div> 

      {/* SEGUNDA TABELA */}
      <Card className="mt-5 p-3 shadow-sm">
        <CardContent className="flex">
          <div className="flex-1 overflow-x-auto">
            <Table className="border-b">
              <TableHeader className="bg-gray-50">
                <TableRow className="text-xs">
                  {months.map((month) => (
                    <TableHead key={month} className="">
                      <TableRow className="flex justify-center font-semibold">{month}</TableRow>
                      <TableHead className="w-32">DIO</TableHead>
                      <TableHead className="w-32">DIO DEC</TableHead>
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
                        <TableCell key={monthIndex} className="text-xs py-0">
                          <TableCell className="w-32">{monthData.dio}</TableCell>
                          <TableCell className="w-32">{monthData.dioDec.toFixed(0)}</TableCell>
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

      <div className="mt-10 flex justify-end">
        <button
          onClick={() => window.open("/relatorio.xlsx", "_blank")}
          className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Gerar Relatório
        </button>
      </div>

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
            <h2 className="text-lg font-semibold mb-2">Atividade Semanal</h2>
            <WeeklyActivityChartNoSSR />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-lg font-semibold mb-2">Percentual de Saídas por Categoria</h2>
            <ExpenseStatisticsChartNoSSR />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default DashboardPage;
