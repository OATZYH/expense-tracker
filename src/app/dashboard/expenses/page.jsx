"use client";
import React from "react";
import CardSummary from "@/components/CardSummary";
import { data } from "../../../../db/data";
import HistoryTable from "@/components/table/HistoryTable";
import { Card, CardBody } from "@nextui-org/react";

export default function ExpensePage() {
  return (
    <main className="flex h-full flex-col space-y-4 p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <CardSummary key={item.id} title={item.title} amount={item.amount} />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <Card>
          <CardBody>
            <HistoryTable />
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
