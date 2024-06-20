"use client";
import React, { useState, useEffect } from "react";
import CardSummary from "@/components/CardSummary";
import useTransaction from "@/stores/transactionStore";
import { Card, Skeleton } from "@nextui-org/react";

export default function ExpenseSummary() {
  const { fetchData, data, balance, totalIncome, totalExpense } =
  useTransaction();
const [loading, setLoading] = useState(true);
// console.log(balance);
// console.log(totalIncome, totalExpense);
// console.log(data);

useEffect(() => {
  setLoading(true);
  fetchData();
  setLoading(false);
}, []);
  

return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {loading ? (
      <Card className="w-full p-4">
          <Skeleton className="rounded-lg flex gap-4">
            <div className="h-[60px] rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3 mt-4">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-6 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </div>
      </Card>
    ) : (
      <>
        {data.map((item) => (
          <CardSummary
            key={item.key}
            title={item.title}
            amount={item.amount}
          />
        ))}
      </>
    )}
  </div>
);
}