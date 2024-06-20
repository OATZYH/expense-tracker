"use client";
import React from "react";
import LineCharts from "./lineCharts";
import PieCharts from "./pieCharts";
import DashboardSummary from "./summary";

export default function DashboardPage() {
  return (
    <main className="flex h-full flex-col space-y-4 p-5">
      <DashboardSummary />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <LineCharts />
        <PieCharts />
      </div>
    </main>
  );
}
