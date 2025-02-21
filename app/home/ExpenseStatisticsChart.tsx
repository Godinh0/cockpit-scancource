'use client';
import React from 'react';
import Chart from 'react-apexcharts';

export function ExpenseStatisticsChart() {
  // Dados simulados
  const dataPie = [30, 15, 20, 35];
  const labels = ['Coletor com teclado', 'Pulseira', 'Acessorio coletor', 'Carregador'];

  const options: ApexCharts.ApexOptions = {
    labels,
    legend: {
      show: true,
      position: 'bottom',
    },
    colors: ['#2F63E0', '#EF7925', '#FD3C97', '#00C1FF'],
    dataLabels: {
      enabled: true,
      dropShadow: { enabled: false },
      formatter: (val: number) => `${val.toFixed(0)}%`,
    },
  };

  const series = dataPie; // Apex pie chart aceita series como number[]

  return (
    <div style={{ width: '100%' }}>
      <Chart options={options} series={series} type="pie" height={300} />
    </div>
  );
}
