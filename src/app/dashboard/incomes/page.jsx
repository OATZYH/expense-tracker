'use client';
import React from "react";
import CardSummary from "@/components/CardSummary";
import { summary } from "@/constants/summary";
import HistoryTable from "@/components/table/HistoryTable";
import { Card, CardBody } from "@nextui-org/react";

export default function IncomePage() {
  const incomeItem = summary.find((item) => item.key === "totalIncome");

  return (
    <main className="flex h-full flex-col space-y-4 p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {incomeItem && (
          <React.Fragment key={incomeItem.key}>
            <CardSummary title={incomeItem.title} amount={incomeItem.amount} />
            {incomeItem.sub &&
              incomeItem.sub.map((subItem) => (
                <CardSummary
                  key={subItem.key}
                  title={subItem.title}
                  amount={subItem.amount}
                />
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
