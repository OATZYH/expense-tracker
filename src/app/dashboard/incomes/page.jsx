"use client";
import React, { useState, useEffect } from "react";
import HistoryTable from "@/components/table/HistoryTable";
import { Card, CardBody } from "@nextui-org/react";
import IncomeSummary from "./summary";
import { incomeTransactions, incomeColumns } from "@/constants/data";
import { incomeCategory } from "@/constants/categories";
import axios from "axios";
import { CircularProgress } from "@nextui-org/progress";

export default function IncomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/transaction/income");
      setData(response.data);
      setLoading(false);
      // console.log(response.data);
    };
    fetchData();
  }, []);
  const handleEdit = (rowData) => {
    console.log("Edit", rowData);
    // Implement your edit logic here
  };

  const handleDelete = (rowData) => {
    console.log("Delete", rowData);
    // Implement your delete logic here
  };
  return (
    <main className="flex h-full flex-col space-y-4 p-5">
      <IncomeSummary />
      <div className="flex flex-col gap-4">
        <Card>
          <CardBody>
            {loading ? (
              <div className="flex justify-center items-center">
                <CircularProgress
                  size="lg"
                  aria-label="Loading Spinner"
                  color="primary"
                />
              </div>
            ) : (
              <HistoryTable
                historyData={data}
                columns={incomeColumns}
                categoryOptions={incomeCategory}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
