import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Tabs,
  Tab,
  Button,
} from "@nextui-org/react";
import ExpenseChart from "@/components/charts/ExpenseChart";
import { useRouter } from 'next/navigation'

export default function LineCharts() {
  const router = useRouter()
  return (
    <Card className="py-4 col-span-2">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-2xl font-bold ml-2 ">Spending Report</h1>
          <Button color="primary" className="flex" onClick={() => router.push('/dashboard/expenses')}>View Report</Button>
        </div>
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
