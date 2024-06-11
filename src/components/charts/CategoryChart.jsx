"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, layouts } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const example = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

export default function CategoryChart() {
  const data = {
    labels: example.map((item) => item.name),
    datasets: [
      {
        label: "Amount ",
        data: example.map((item) => item.value),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
        ],
        hoverOffset: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        
      },
      title: {
        display: false,
      },
      
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
  };

  return (
    <div className="flex flex-col w-full h-[400px] items-center">
      {/* <h1 className="text-xl font-bold mt-4">Categories</h1> */}
      <Doughnut data={data} options={options} />
    </div>
  );
}
