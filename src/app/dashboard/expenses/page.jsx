"use client";
import React from "react";
import HistoryTable from "@/components/table/HistoryTable";
import { Card, CardBody } from "@nextui-org/react";
import ExpenseSummary from "./summary";

export default function ExpensePage() {

  return (
    <main className="flex h-full flex-col space-y-4 p-5">
      <ExpenseSummary />
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
