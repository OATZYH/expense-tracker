"use client";
import React, { useState, useEffect } from "react";
import HistoryTable from "@/components/table/HistoryTable";
import { Card, CardBody } from "@nextui-org/react";
import IncomeSummary from "./summary";
import { incomeTransactions, incomeColumns } from "@/constants/data";
import { incomeCategory } from "@/constants/categories";
import axios from "axios";
import { CircularProgress } from "@nextui-org/progress";
import TransactionModal from "@/components/modal/TransactionModal"; // Unified Modal
import { toast } from "react-hot-toast";

export default function IncomePage() {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIncome, setCurrentIncome] = useState(null); 

  const fetchIncomes = async () => {
    try {
      const response = await axios.get("/api/transaction/income");
      setIncomes(response.data);
    } catch (error) {
      console.error("Failed to fetch incomes:", error);
      toast.error("Failed to fetch incomes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);
  const handleEdit = (income) => {
    setCurrentIncome(income);
    setModalOpen(true);
  };

  const handleDelete = async (income) => {
    try {
      await axios.delete(`/api/transaction/income/${income.id}`);
      setIncomes((prev) => prev.filter((e) => e.id !== income.id));
      toast.success("Income deleted successfully!");
    } catch (error) {
      console.error("Failed to delete income:", error);
      toast.error("Failed to delete income. Please try again.");
    }
  };

  const handleSaveIncome = (savedIncome) => {
    if (currentIncome) {
      // Edit mode
      setIncomes((prev) =>
        prev.map((income) => (income.id === savedIncome.id ? savedIncome : income))
      );
    } else {
      // Add mode
      setIncomes((prev) => [savedIncome, ...prev]);
    }
    fetchIncomes();
  }

  const closeModal = () => {
    setModalOpen(false);
    setCurrentIncome(null);
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
                historyData={incomes}
                columns={incomeColumns}
                categoryOptions={incomeCategory}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </CardBody>
        </Card>
      </div>
      <TransactionModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={handleSaveIncome}
        transaction={currentIncome}
        type="income"
      />
    </main>
  );
}
