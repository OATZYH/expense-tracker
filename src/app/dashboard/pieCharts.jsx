'use client';
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Tabs,
  Tab,
} from "@nextui-org/react";
import CategoryChart from "@/components/charts/CategoryChart";

export default function PieCharts() {
  return (
    <Card className="py-4 col-span-1">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Tabs aria-label="Options">
          <Tab key="summary" title="Summary" >
              <CategoryChart />
          </Tab>
          <Tab key="subscriptions" title="Subscriptions">
            <Card>
              <CardBody>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </CardHeader>
    </Card>
  );
}
