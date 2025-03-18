"use client";

import React, { useContext, useMemo, useState } from "react";
import dynamic from "next/dynamic";
// ANT Design
import { Input, Slider, Select } from "antd";
const { Option } = Select;
// ShadCN/UI
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
 * Função que retorna o status para cada mês, com base em onHand, back, giro, dio, leadTime etc.
 * Ajuste as regras conforme sua necessidade.
 */
function getNewStatus({
  onHand,
  back,
  giro,
  dio,
  leadTime,
}: {
  onHand: number;
  back: number;
  giro: number;
  dio: number;
  leadTime: number;
}): string {
  const total = onHand + back;
  const ratio = giro > 0 ? total / giro : 0;
  const leadRatio = leadTime / 30; 

  if (total < giro && ratio < leadRatio) {
    return "COMPRA IMEDIATA";
  } else if (total >= giro && ratio < 3) {
    return "ESTOQUE OK";
  } else if (ratio > 3) {
    return "ALERTA AGING";
  } else if (total < giro && ratio > leadRatio) {
    return "RUPTURA DE ESTOQUE";
  }

  return "";
}


function DashboardPage() {
  const theme = useContext(ThemeContext);

  // -------------------------------------------------------
  // Meses
  // -------------------------------------------------------
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  // -------------------------------------------------------
  // Funções auxiliares iniciais
  // -------------------------------------------------------
  const calculateInitialSugestao = (
    onHand: number,
    giroMes: number,
    leadTime: number,
    back: number
  ): number => {
    const result = Math.round(((onHand + back - giroMes) / giroMes) * 30)
    if (result < 0){
      return 0
    } else {
     return result;
    }
  };

  const calculateInitialDio = (
    onHand: number,
    giroMes: number,
    sugestao: number,
    back: number,
    dioIdeal: number
  ): number => {
    return Math.round(((onHand + back + sugestao - giroMes) / dioIdeal) * 30);
  };

  const calculateInitialDioDec = (dio: number): number => {
    return Math.round(dio);
  };

  // -------------------------------------------------------
  // Dados iniciais (tableData)
  // -------------------------------------------------------
  const [tableData, setTableData] = useState([
    {
      id: "row-1",
      vendor: "ZEBRA",
      partnOrig: "MC220J-2A3S2RW BR",
      partnSS: "MC220J-2A3S2RW BR_SC",
      category: "COLETOR COM TECLADO",
      onHand: 228,
      giroMes: 117,
      dioAtual: 58,
      dioIdeal: 90,
      leadTime: 60,
      months: months.map(() => {
        const sugestao = calculateInitialSugestao(228, 117, 60, 0);
        const dio = calculateInitialDio(228, 117, sugestao, 0, 90);
        return {
          back: 0,
          onHandMonth: 228 - 117,
          sugestao,
          decisao: 0,
          giro: 117,
          dio,
          dioDec: calculateInitialDioDec(dio),
          // Calcula status inicial
          status: getNewStatus({
            onHand: 228 - 117,
            back: 0,
            giro: 117,
            dio,
            leadTime: 60,
          }),
        };
      }),
    },
    {
      id: "row-2",
      vendor: "ZEBRA",
      partnOrig: "MC330L-GE4EG4RW BR",
      partnSS: "MC330L-GE4EG4RW BR_SC",
      category: "COLETOR COM TECLADO",
      onHand: 534,
      giroMes: 93,
      dioAtual: 171,
      dioIdeal: 90,
      leadTime: 60,
      months: months.map(() => {
        const sugestao = calculateInitialSugestao(534, 93, 60, 0);
        const dio = calculateInitialDio(534, 93, sugestao, 0, 90);
        return {
          back: 0,
          onHandMonth: 534 - 93,
          sugestao,
          decisao: 0,
          giro: 93,
          dio,
          dioDec: calculateInitialDioDec(dio),
          status: getNewStatus({
            onHand: 534 - 93,
            back: 0,
            giro: 93,
            dio,
            leadTime: 60,
          }),
        };
      }),
    },
    {
      id: "row-3",
      vendor: "ZEBRA",
      partnOrig: "MC330L-GJ4EG4RW BR",
      partnSS: "MC330L-GJ4EG4RW BR_SC",
      category: "COLETOR COM TECLADO",
      onHand: 95,
      giroMes: 88,
      dioAtual: 33,
      dioIdeal: 90,
      leadTime: 60,
      months: months.map(() => {
        const sugestao = calculateInitialSugestao(95, 88, 60, 0);
        const dio = calculateInitialDio(95, 88, sugestao, 0, 90);
        return {
          back: 0,
          onHandMonth: 95 - 88,
          sugestao,
          decisao: 0,
          giro: 88,
          dio,
          dioDec: calculateInitialDioDec(dio),
          status: getNewStatus({
            onHand: 95 - 88,
            back: 0,
            giro: 88,
            dio,
            leadTime: 60,
          }),
        };
      }),
    },
    {
      id: "row-4",
      vendor: "ZEBRA",
      partnOrig: "MC330X-GE4EG4RW BR",
      partnSS: "MC330X-GE4EG4RW BR_SC",
      category: "COLETOR COM TECLADO",
      onHand: 187,
      giroMes: 14,
      dioAtual: 390,
      dioIdeal: 90,
      leadTime: 60,
      months: months.map(() => {
        const sugestao = calculateInitialSugestao(187, 14, 60, 0);
        const dio = calculateInitialDio(187, 14, sugestao, 0, 90);
        return {
          back: 0,
          onHandMonth: 187 - 14,
          sugestao,
          decisao: 0,
          giro: 14,
          dio,
          dioDec: calculateInitialDioDec(dio),
          status: getNewStatus({
            onHand: 187 - 14,
            back: 0,
            giro: 14,
            dio,
            leadTime: 60,
          }),
        };
      }),
    },
    {
      id: "row-5",
      vendor: "ZEBRA",
      partnOrig: "MC930B-GSEDG4RW",
      partnSS: "MC930B-GSEDG4RW_SC",
      category: "COLETOR COM TECLADO",
      onHand: 212,
      giroMes: 88,
      dioAtual: 73,
      dioIdeal: 75,
      leadTime: 45,
      months: months.map(() => {
        const sugestao = calculateInitialSugestao(212, 88, 45, 0);
        const dio = calculateInitialDio(212, 88, sugestao, 0, 75);
        return {
          back: 0,
          onHandMonth: 212 - 88,
          sugestao,
          decisao: 0,
          giro: 88,
          dio,
          dioDec: calculateInitialDioDec(dio),
          status: getNewStatus({
            onHand: 212 - 88,
            back: 0,
            giro: 88,
            dio,
            leadTime: 45,
          }),
        };
      }),
    },
  ]);

  // -------------------------------------------------------
  // ESTADOS PARA FILTROS
  // -------------------------------------------------------
  const [vendor, setVendor] = useState("All");
  const [category, setCategory] = useState("All");
  const [partnOrig, setPartnOrig] = useState("All");
  const [partnSS, setPartnSS] = useState("All");

  // Agora o statusFilter terá as opções: "COMPRA IMEDIATA", "ESTOQUE OK", "ALERTA AGING", "RUPTURA DE ESTOQUE", etc. + "All"
  const [statusFilter, setStatusFilter] = useState("All");

  const [searchText, setSearchText] = useState("");

  // Slider para escolher quantos meses exibir
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
  // LÓGICA DE FILTRO (usando m.status)
  // -------------------------------------------------------
  const filteredData = tableData.filter((item) => {
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

    // Filtro de status (agora com base em monthData.status)
    // Verifica se ao menos um mês tem status = statusFilter
    const rowHasStatus = item.months.some((m: any) => {
      // Se o statusFilter for "All", não filtramos. Caso contrário, comparamos
      return statusFilter === "All" || m.status === statusFilter;
    });

    return matchesVendor && matchesCat && matchesOrig && matchesSS && matchesSearch && rowHasStatus;
  });

  // -------------------------------------------------------
  // recalculateSugestao
  // -------------------------------------------------------
  // Agora, além de recalcular 'sugestao', 'dio', etc., recalculamos 'status'
  function recalculateSugestao(data: any) {
    return data.map((row: any) => {
      let updatedMonths = [...row.months];
      let decisaoAcumulada = 0;
  
      for (let i = 0; i < updatedMonths.length; i++) {
        const m = updatedMonths[i];
  
        // 1) Calcular 'dio'
        let dio = Math.round(
          (row.onHand + m.back + m.sugestao - row.giroMes) / row.dioIdeal * 30
        );
  
        // 2) Calcular 'dioDec'
        let dioDec = dio;
        if (m.decisao > 0) {
          dioDec = Math.round(
            (row.onHand + m.back + m.decisao - m.giro) / row.giroMes * 30
          );
        }
  
        // 3) Calcular 'newSugestao' com base no 'row.onHand', mas ainda sem aplicar a decisão passada
        let newSugestao = Math.round(
          (row.onHand + m.back - m.giro) / row.giroMes * 30
        );
  
        // 4) Subtrai a 'decisaoAcumulada' do(s) meses anteriores
        //    Isso faz a sugestão do mês atual refletir a soma das decisões passadas
        newSugestao = newSugestao - decisaoAcumulada;
  
        // 5) Se a sugestão ficar abaixo de zero, zere-a e configure status = "ANTECIPAR BACKLOG"
        //    Senão, calculamos o status normalmente via getNewStatus
        let newStatus = "";
        if (newSugestao < 0) {
          newSugestao = 0;
          newStatus = "ANTECIPAR BACKLOG";
        } else {
          newStatus = getNewStatus({
            onHand: m.onHandMonth, // ou (m.onHandMonth - m.giro) se preferir
            back: m.back,
            giro: m.giro,
            dio,
            leadTime: row.leadTime,
          });
        }
  
        // 6) Atualizar no array
        updatedMonths[i] = {
          ...m,
          sugestao: newSugestao,
          dio,
          dioDec,
          status: newStatus,
        };
  
        // 7) Por fim, some a decisão do MÊS atual ao 'decisaoAcumulada',
        //    para que ela afete o mês seguinte
        decisaoAcumulada += m.decisao;
      }
  
      return { ...row, months: updatedMonths };
    });
  }
  // -------------------------------------------------------
  // Handlers de leadTime, decisao, giro
  // -------------------------------------------------------
  const handleLeadTimeChange = (realIndex: number, newLeadTime: number) => {
    setTableData((prev) => {
      let updatedData = [...prev];
      updatedData[realIndex].leadTime = newLeadTime;
      return recalculateSugestao(updatedData);
    });
  };

  const handleDecisaoChange = (realIndex: number, monthIndex: number, newDecisao: number) => {
    setTableData((prev) => {
      let updatedData = [...prev];
      updatedData[realIndex].months[monthIndex].decisao = newDecisao;
      return recalculateSugestao(updatedData);
    });
  };

  const handleDioIdealChange = (realIndex: number, newDioIdeal: number) => {
    setTableData((prev) => {
      let updatedData = [...prev];
      updatedData[realIndex].dioIdeal = newDioIdeal;
      return recalculateSugestao(updatedData);
    });
  };

  const handleGiroChange = (realIndex: number, monthIndex: number, newGiro: number) => {
    setTableData((prev) => {
      let updatedData = [...prev];
      updatedData[realIndex].months[monthIndex].giro = newGiro;
      return recalculateSugestao(updatedData);
    });
  };

  // -------------------------------------------------------
  // MOCK do CHAT
  // -------------------------------------------------------
  const chatHistoryMock = ["POSIÇÃO ATUAL", "RELATÓRIO DE COMPRAS", "RELATÓRIO DE AGING", "RELATÓRIO DE STOCK OUT " ];
  const [messages, setMessages] = useState([
    { id: 1, sender: "iazzie", text: "Olá, como posso ajudar?" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMessage = { id: Date.now(), sender: "user", text: inputValue.trim() };
    setInputValue("");
    setMessages((prev) => [...prev, userMessage]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now(), sender: "iazzie", text: "Carregando..." }]);
    }, 400);
  };

  // -------------------------------------------------------
  // Render
  // -------------------------------------------------------
  return (
    <>
      {/* FILTROS */}
      <div className="flex flex-col w-80">
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
          <Select
            showSearch
            value={vendor}
            onChange={(value) => setVendor(value)}
            style={{ width: 180 }}
            size="small"
          >
            <Option value="All">All</Option>
            {uniqueVendors.map((v) => (
              <Option key={v} value={v}>
                {v}
              </Option>
            ))}
          </Select>
        </div>

        {/* Categoria */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-[#EF7925]">Categoria</span>
          <Select
            showSearch
            value={category}
            onChange={(value) => setCategory(value)}
            style={{ width: 180 }}
            size="small"
          >
            <Option value="All">All</Option>
            {uniqueCategories.map((cat) => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </Select>
        </div>

        {/* PARTN ORIG */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-[#EF7925]">PARTN ORIG</span>
          <Select
            showSearch
            value={partnOrig}
            onChange={(value) => setPartnOrig(value)}
            style={{ width: 180 }}
            size="small"
          >
            <Option value="All">All</Option>
            {uniquePartnOrigs.map((o) => (
              <Option key={o} value={o}>
                {o}
              </Option>
            ))}
          </Select>
        </div>

        {/* PARTN SS */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-[#EF7925]">PARTN SS</span>
          <Select
            showSearch
            value={partnSS}
            onChange={(value) => setPartnSS(value)}
            style={{ width: 180 }}
            size="small"
          >
            <Option value="All">All</Option>
            {uniquePartnSSs.map((s) => (
              <Option key={s} value={s}>
                {s}
              </Option>
            ))}
          </Select>
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-[#EF7925]">Status</span>
          <Select
            showSearch
            value={statusFilter}
            onChange={(val) => setStatusFilter(val)}
            style={{ width: 180 }}
            size="small"
          >
            <Option value="All">All</Option>
            <Option value="COMPRA IMEDIATA">COMPRA IMEDIATA</Option>
            <Option value="ESTOQUE OK">ESTOQUE OK</Option>
            <Option value="ALERTA AGING">ALERTA AGING</Option>
            <Option value="RUPTURA DE ESTOQUE">RUPTURA DE ESTOQUE</Option>
            <Option value="POSTERGAR BACKLO">POSTERGAR BACKLOG</Option>
            <Option value="ANTECIPAR BACKLOG">ANTECIPAR BACKLOG</Option>
            <Option value="BAIXO GIRO">BAIXO GIRO</Option>
          </Select>
        </div>

        {/* Slider p/ quantidade de meses */}
        <div className="flex flex-col w-40">
          <span className="text-sm font-semibold text-[#EF7925]">Meses</span>
          <Slider min={1} max={12} defaultValue={6} onChange={(value) => setNumMonthsToShow(value)} />
        </div>
      </div>

      {/* TABELA */}
      <Card className="mt-5 p-3 shadow-sm">
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="h-5 text-xs">
              <TableHead
                className="sticky left-0 z-20 bg-white py-0 w-24 min-w-[96px]"
              >
                Vendor
              </TableHead>

              {/* PARTN ORIG */}
              <TableHead
                className="sticky left-[96px] z-20 bg-white py-0 w-52 min-w-[208px]"
              >
                PARTN ORIG
              </TableHead>

              {/* PARTN SS */}
              <TableHead
                className="sticky left-[304px] z-20 bg-white py-0 w-52 min-w-[208px]"
              >
                PARTN SS
              </TableHead>

              {/* Categoria */}
              <TableHead
                className="sticky left-[512px] z-20 bg-white py-0 w-32 min-w-[128px]"
              >
                Categoria
              </TableHead>
                <TableHead className="w-32 pl-10 pb-5 text-left">
                  <span className="text-sm font-semibold text-[#EF7925]">Atual</span>
                  <TableHead className="p-0 w-10">OnHand</TableHead>
                  <TableHead className="py-0 pl-6 w-16">Giro Mês</TableHead>
                  <TableHead className="py-0 w-16">DIO Atual</TableHead>
                  <TableHead className="py-0 w-16">DIO Ideal</TableHead>
                  <TableHead className="py-0 w-16">Lead Time</TableHead>
                </TableHead>
                <TableHead className=" p-0 pl-5  text-left">
                  <span className="text-sm font-semibold text-[#EF7925]">Entradas</span>
                  {months.slice(0, numMonthsToShow).map((month) => (
                    <TableHead key={month} className="px-0 pl-0 w-32 pr-10 text-left">
                      <span className="text-base font-semibold">{month}</span>
                      <div className="flex">
                        <TableHead className="p-0 w-16">OnHand</TableHead>
                        <TableHead className="p-0 w-14 text-xs">Back</TableHead>
                        <TableHead className="p-0 w-24">Giro Mês</TableHead>
                        <TableHead className="py-0 w-24 text-xs">Status</TableHead>
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
              {filteredData.map((row: any) => {
                // Encontrar o índice real no array tableData
                const realIndex = tableData.findIndex((r: any) => r.id === row.id);
                if (realIndex < 0) return null;

                return (
                  <TableRow key={row.id}>
                     <TableCell
                        className="sticky left-0 z-10 bg-white py-1 text-xs w-24 min-w-[96px]"
                      >
                        {row.vendor}
                      </TableCell>

                      {/* PARTN ORIG */}
                      <TableCell
                        className="sticky left-[96px] z-10 bg-white py-1 text-[10px] w-52 min-w-[208px]"
                      >
                        {row.partnOrig}
                      </TableCell>

                      {/* PARTN SS */}
                      <TableCell
                        className="sticky left-[304px] z-10 bg-white py-1 text-[10px] w-52 min-w-[208px]"
                      >
                        {row.partnSS}
                      </TableCell>

                      {/* Categoria */}
                      <TableCell
                        className="sticky left-[512px] z-10 bg-white py-1 text-[10px] w-32 min-w-[128px]"
                      >
                        {row.category}
                      </TableCell>
                    <TableCell className="">
                      <div className="flex gap-7 pl-8  flex-row">
                        <span className="py-1 text-xs">{row.onHand}</span>
                        <span className="py-1 pl-4 text-xs">{row.giroMes}</span>
                        <span className="py-1 pl-2 text-xs">{row.dioAtual}</span>
                        <div className="pl-3">
                          <Input
                            type="number"
                            className="w-16 text-center text-xs"
                            value={row.dioIdeal}
                            onChange={(e) =>
                              handleDioIdealChange(realIndex, Number(e.target.value))
                            }
                          />
                        </div>
                        <div className="pl-3">
                          <Input
                            type="number"
                            className="w-16 text-center text-xs"
                            value={row.leadTime}
                            onChange={(e) =>
                              handleLeadTimeChange(realIndex, Number(e.target.value))
                            }
                          />
                        </div>
                      </div>
                    </TableCell>

                    <div className="flex pl-3 flex-row ">
                      {row.months.slice(0, numMonthsToShow).map((monthData: any, monthIndex: number) => (
                        <TableCell key={monthIndex} className="p-0 w-full py-2 text-xs  pl-2">
                          <div className="flex gap-3 w-full flex-row">
                            <span className="py-0 p-0 w-12 text-xs">{monthData.onHandMonth}</span>
                            <span className="py-0 w-8 text-xs">{monthData.back}</span>
                            <Input
                              type="number"
                              className="w-20 text-center text-xs"
                              value={monthData.giro}
                              onChange={(e) =>
                                handleGiroChange(realIndex, monthIndex, Number(e.target.value))
                              }
                            />
                            {/* Agora o status vem diretamente de monthData.status */}
                            <span className="py-0 pl-5 w-32 text-[10px]">
                              {monthData.status}
                            </span>
                            <span className="py-0 w-14 text-xs">{monthData.sugestao}</span>
                            <span className="py-0 w-8 text-xs">{monthData.dio}</span>
                            <Input
                              type="number"
                              className="w-16 text-center text-xs"
                              value={monthData.decisao}
                              onChange={(e) =>
                                handleDecisaoChange(realIndex, monthIndex, Number(e.target.value))
                              }
                            />
                            <span className="py-0 pl-3 w-20 text-xs">{monthData.dioDec}</span>
                          </div>
                        </TableCell>
                      ))}
                    </div>
                  </TableRow>
                );
              })}
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
          <div className="w-[260px] border-r border-gray-200 pr-4 flex flex-col">
            <button className="text-sm font-semibold text-[#2D2D2D] hover:bg-[#F5F7FA] text-left p-1">
              + Nova Conversa
            </button>
            <hr className="my-2" />
            <div className="text-xs font-semibold text-[#2D2D2D] mb-2">Relatórios</div>
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
