"use client";
import React from "react";
import CardSummary from "@/components/CardSummary";
import { summary } from '@/constants/summary';
import HistoryTable from "@/components/table/HistoryTable";
import { Card, CardBody } from "@nextui-org/react";

export default function ExpensePage() {
  const expenseItem = summary.find(item => item.key === "totalExpense");

  return (
    <main className="flex h-full flex-col space-y-4 p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {expenseItem && (
  <React.Fragment key={expenseItem.key}>
    <CardSummary title={expenseItem.title} amount={expenseItem.amount} />
    {expenseItem.sub && expenseItem.sub.map((subItem) => (
      <CardSummary key={subItem.key} title={subItem.title} amount={subItem.amount} />
    ))}
  </React.Fragment>
)}
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
