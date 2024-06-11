import React from "react";
import { Card, Text, CardBody, CardHeader, Tabs, Tab } from "@nextui-org/react";
import ExpenseChart from "@/components/charts/ExpenseChart";

export default function LineCharts() {
  return (
    <Card className="py-4 col-span-2">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h1 className="text-xl font-bold">Spending Report</h1>
        <Tabs variant="underlined" aria-label="Options">
          <Tab key="24hr" title="24 Hours"></Tab>
          <Tab key="week" title="Week"></Tab>
          <Tab key="month" title="Month"></Tab>
          <Tab key="year" title="Year"></Tab>
        </Tabs>
      </CardHeader>
      <CardBody className="px-4 py-2">
        <ExpenseChart />
      </CardBody>
    </Card>
  );
}
