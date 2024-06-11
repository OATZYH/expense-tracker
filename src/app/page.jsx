"use client";
import CardSummary from "@/components/CardSummary";
import LineCharts from "./dashboard/lineCharts";
import PieCharts from "./dashboard/pieCharts";
import { data } from "../../db/data";

export default function Home() {
  return (
    <main className="flex h-full flex-col space-y-4 p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <CardSummary key={item.id} title={item.title} amount={item.amount} />
        ))}
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      <LineCharts/>
      <PieCharts />
        </div>
    </main>
  );
}
