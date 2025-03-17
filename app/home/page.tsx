"use client";

import React, { useContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Input, Slider } from 'antd';
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

/**
 * Função utilitária para converter o valor de sugestão (sugestao)
 * em um status textual de acordo com a lógica especificada.
 */
function getStatusBySugestao(sugestao: number): string {
  if (sugestao > 1000) {
    return "Grande compra necessária";
  } else if (sugestao >= 100 && sugestao <= 1000) {
    return "Compra de médio porte";
  } else if (sugestao >= 1 && sugestao < 100) {
    return "Pequena compra necessária";
  } else if (sugestao === 0) {
    return "Sem necessidade de compra";
  } else {
    return "Reduzir estoque atual";
  }
}

function DashboardPage() {
  const theme = useContext(ThemeContext);

  // -------------------------------------------------------
  // Mock de dados (iniciais)
  // -------------------------------------------------------
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  // Funções auxiliares para cálculo inicial
  const calculateInitialSugestao = (
    onHand: number,
    giroMes: number,
    leadTime: number,
    back: number
  ): number => {
    return Math.round((onHand + back - giroMes) / giroMes * 30);
  };

  const calculateInitialDio = (
    onHand: number,
    giroMes: number,
    sugestao: number,
    back: number,
    dioIdeal: number
  ): number => {
    return Math.round((onHand + back + sugestao - giroMes) / dioIdeal * 30);
  };

  const calculateInitialDioDec = (dio: number, giroMes: number): number => {
    return Math.round(dio);
  };

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
        onHandMonth: 228 - 117,
        sugestao: calculateInitialSugestao(228, 117, 60, 0),
        decisao: 0,
        giro: 117,
        dio: calculateInitialDio(228, 117, calculateInitialSugestao(228, 117, 60, 0), 0, 90),
        dioDec: calculateInitialDioDec(
          calculateInitialDio(228, 117, calculateInitialSugestao(228, 117, 60, 0), 0, 90),
          117
        ),
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
        onHandMonth: 534 - 93,
        sugestao: calculateInitialSugestao(534, 93, 60, 0),
        decisao: 0,
        giro: 93,
        dio: calculateInitialDio(534, 93, calculateInitialSugestao(228, 117, 60, 0), 0, 90),
        dioDec: calculateInitialDioDec(
          calculateInitialDio(534, 93, calculateInitialSugestao(228, 117, 60, 0), 0, 90),
          93
        ),
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
        onHandMonth: 95 - 88,
        sugestao: calculateInitialSugestao(95, 88, 60, 0),
        decisao: 0,
        giro: 88,
        dio: calculateInitialDio(95, 88, calculateInitialSugestao(95, 88, 60, 0), 0, 90),
        dioDec: calculateInitialDioDec(
          calculateInitialDio(95, 88, calculateInitialSugestao(95, 88, 60, 0), 0, 90),
          88
        ),
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
        onHandMonth: 187 - 14,
        sugestao: calculateInitialSugestao(187, 14, 60, 0),
        decisao: 0,
        giro: 14,
        dio: calculateInitialDio(187, 14, calculateInitialSugestao(187, 14, 60, 0), 0, 90),
        dioDec: calculateInitialDioDec(
          calculateInitialDio(187, 14, calculateInitialSugestao(187, 14, 60, 0), 0, 90),
          14
        ),
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
        onHandMonth: 212 - 88,
        sugestao: calculateInitialSugestao(212, 88, 45, 0),
        decisao: 0,
        giro: 88,
        dio: calculateInitialDio(212, 88, calculateInitialSugestao(212, 88, 45, 0), 0, 75),
        dioDec: calculateInitialDioDec(
          calculateInitialDio(212, 88, calculateInitialSugestao(212, 88, 45, 0), 0, 75),
          88
        ),
      })),
    },
  ]);

  // -------------------------------------------------------
  // ESTADOS PARA FILTROS
  // -------------------------------------------------------
  const [vendor, setVendor] = useState("All");
  const [category, setCategory] = useState("All");
  const [partnOrig, setPartnOrig] = useState("All");
  const [partnSS, setPartnSS] = useState("All");

  // Filtro de texto
  const [searchText, setSearchText] = useState("");

  // Filtro de status
  const [statusFilter, setStatusFilter] = useState("All");

  // Quantidade de meses a serem mostrados
  const [numMonthsToShow, setNumMonthsToShow] = useState(6);

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
    // Filtros simples (Vendor, Categoria, PARTN ORIG, PARTN SS)
    const matchesVendor = vendor === "All" || item.vendor === vendor;
    const matchesCat = category === "All" || item.category === category;
    const matchesOrig = partnOrig === "All" || item.partnOrig === partnOrig;
    const matchesSS = partnSS === "All" || item.partnSS === partnSS;

    // Filtro de busca textual
    const lowerSearch = searchText.toLowerCase();
    const rowConcatenated = [
      item.vendor,
      item.category,
      item.partnOrig,
      item.partnSS,
    ].join(" ").toLowerCase();
    const matchesSearch = !searchText || rowConcatenated.includes(lowerSearch);

    // Filtro de status
    // Se statusFilter === "All", não filtra por status. Se não, verifica se
    // pelo menos um dos meses corresponde ao status selecionado.
    const rowHasStatus = item.months.some((m: any) => {
      const statusDoMes = getStatusBySugestao(m.sugestao);
      return statusDoMes === statusFilter;
    });
    const matchesStatus = statusFilter === "All" || rowHasStatus;

    return (
      matchesVendor &&
      matchesCat &&
      matchesOrig &&
      matchesSS &&
      matchesSearch &&
      matchesStatus
    );
  });

  // -------------------------------------------------------
  // MANIPULADORES DE ESTADO/CÁLCULO
  // -------------------------------------------------------
  const recalculateSugestao = (data: any) => {
    return data.map((row: any) => {
      let updatedMonths = row.months.map((m: any) => {
        let dio = Math.round((row.onHand + m.back + m.sugestao - row.giroMes) / row.dioIdeal * 30);
        let dioDec = dio;
        if (m.decisao > 0) {
          dioDec = Math.round((row.onHand + m.back + m.decisao - m.giro) / row.giroMes * 30);
        }
        return {
          ...m,
          sugestao: Math.round((row.onHand + m.back - m.giro) / row.giroMes * 30),
          dio,
          dioDec,
        };
      });

      // Propagação da decisão de forma acumulativa em todos os meses subsequentes
      let decisaoAcumulada = 0;
      for (let i = 0; i < updatedMonths.length; i++) {
        updatedMonths[i].sugestao -= decisaoAcumulada;
        decisaoAcumulada += updatedMonths[i].decisao;
      }

      return { ...row, months: updatedMonths };
    });
  };

  const handleLeadTimeChange = (rowIndex: number, newLeadTime: number) => {
    setTableData((prev) => {
      let updatedData = [...prev];
      updatedData[rowIndex].leadTime = newLeadTime;
      return recalculateSugestao(updatedData);
    });
  };

  const handleDecisaoChange = (rowIndex: number, monthIndex: number, newDecisao: number) => {
    setTableData((prev) => {
      let updatedData = [...prev];
      updatedData[rowIndex].months[monthIndex].decisao = newDecisao;
      return recalculateSugestao(updatedData);
    });
  };

  const handleGiroChange = (rowIndex: number, monthIndex: number, newGiro: number) => {
    setTableData((prev) => {
      let updatedData = [...prev];
      updatedData[rowIndex].months[monthIndex].giro = newGiro;
      return recalculateSugestao(updatedData);
    });
  };

  // -------------------------------------------------------
  // CHAT (MOCK)
  // -------------------------------------------------------
  const chatHistoryMock = ["Relatório de quebra Janeiro", "Relatório saída primeiro semestre"];
  const [messages, setMessages] = useState([
    { id: 1, sender: "iazzie", text: "Olá, como posso ajudar?" },
  ]);
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
       {/* Campo de Busca */}
       <div className="flex flex-col w-96 ">
          <span className="text-sm font-semibold text-[#EF7925]">Busca</span>
          <Input
            placeholder="Filtrar..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="h-8 text-xs"
          />
        </div>
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

        {/* Status */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-[#EF7925]">Status</span>
          <Select onValueChange={setStatusFilter} value={statusFilter}>
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue placeholder="Filtrar Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Grande compra necessária">Grande compra necessária</SelectItem>
                <SelectItem value="Compra de médio porte">Compra de médio porte</SelectItem>
                <SelectItem value="Pequena compra necessária">Pequena compra necessária</SelectItem>
                <SelectItem value="Sem necessidade de compra">Sem necessidade de compra</SelectItem>
                <SelectItem value="Reduzir estoque atual">Reduzir estoque atual</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Slider para controlar quantos meses são exibidos */}
        <div className="flex flex-col w-40">
          <span className="text-sm font-semibold text-[#EF7925]">Meses</span>
          <Slider
            min={1}
            max={12}
            defaultValue={6}
            onChange={(value) => setNumMonthsToShow(value)}
            // Se quiser mostrar o valor dinamicamente, poderia usar:
            // value={numMonthsToShow}
            // marks={{ 1: '1', 6: '6', 12: '12' }}
          />
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
                  {/* Aqui limitamos a exibição dos cabeçalhos dos meses pelo slice */}
                  {months.slice(0, numMonthsToShow).map((month) => (
                    <TableHead key={month} className="px-0 w-32 pr-10 text-left">
                      {month}
                      <div className="flex">
                        <TableHead className="p-0 w-16">OnHand</TableHead>
                        <TableHead className="p-0 w-14 text-xs">Back</TableHead>
                        <TableHead className="p-0 w-24">Giro Mês</TableHead>
                        <TableHead className="py-0 w-32 text-xs">Status</TableHead>
                        <TableHead className="py-0 w-20 text-xs">Sugestão</TableHead>
                        <TableHead className="py-0 w-12 text-xs">DIO SUG</TableHead>
                        <TableHead className="py-0 w-16 text-xs">Decisão</TableHead>
                        <TableHead className="py-0 pl-7 w-24 text-xs">DIO DEC</TableHead>
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
                      <span className="py-1 pl-4 text-xs">{row.giroMes}</span>
                      <span className="py-1 pl-2 text-xs">{row.dioAtual}</span>
                      <span className="py-1 pl-5 text-xs">{row.dioIdeal}</span>
                      <div className="pl-3">
                        <Input
                          type="number"
                          className="w-16 text-center text-xs"
                          value={row.leadTime}
                          onChange={(e) => handleLeadTimeChange(rowIndex, Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </TableCell>

                  {/* Meses (limitados pelo slice de numMonthsToShow) */}
                  <div className="flex pl-7 flex-row">
                    {row.months.slice(0, numMonthsToShow).map((monthData: any, monthIndex: number) => (
                      <TableCell key={monthIndex} className="p-0 w-full py-2 text-xs">
                        <div className="flex gap-3 w-full flex-row ">
                          <span className="py-0 p-0 w-12 text-xs">{monthData.onHandMonth}</span>
                          <span className="py-0 w-8 text-xs">{monthData.back}</span>
                          <Input
                            type="number"
                            className="w-20 text-center text-xs"
                            value={monthData.giro}
                            onChange={(e) => handleGiroChange(rowIndex, monthIndex, Number(e.target.value))}
                          />
                          {/* Status */}
                          <span className="py-0 pl-5 w-40 text-[10px]">
                            {getStatusBySugestao(monthData.sugestao)}
                          </span>
                          <span className="py-0 w-14 text-xs">{monthData.sugestao}</span>
                          <span className="py-0 w-8 text-xs">{monthData.dio}</span>
                          <Input
                            type="number"
                            className="w-16 text-center text-xs"
                            value={monthData.decisao}
                            onChange={(e) => handleDecisaoChange(rowIndex, monthIndex, Number(e.target.value))}
                          />
                          <span className="py-0 pl-3 w-20 text-xs">{monthData.dioDec}</span>
                        </div>
                      </TableCell>
                    ))}
                  </div>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
      <img src="/iazzie.png" alt="IAzzie Logo" className="ml-2 mt-7 h-8 w-auto" />

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
