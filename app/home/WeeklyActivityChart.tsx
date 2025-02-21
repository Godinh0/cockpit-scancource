'use client';
import React from 'react';
import Chart from 'react-apexcharts';

export function WeeklyActivityChart() {
  // Dados simulados
  const dataDeposit = [500, 300, 400, 480, 180, 330, 300]; // Sáb a Sex
  const dataWithdraw = [200, 100, 200, 120, 80, 200, 180];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false }, // remove opções de toolbar
    },
    xaxis: {
      categories: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    },
    legend: {
      position: 'top',
    },
    colors: ['#2F63E0', '#FF6781'], // cores para cada série
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: '45%',
      },
    },
    // Se quiser remover o rótulo do eixo X e Y:
    yaxis: {
      labels: {
        show: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: 'Saídas',
      data: dataDeposit,
    },
    {
      name: 'Entradas',
      data: dataWithdraw,
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
}
