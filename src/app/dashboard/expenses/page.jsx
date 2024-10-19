"use client";
import React, { useState, useEffect } from "react";
import HistoryTable from "@/components/table/HistoryTable";
import { Card, CardBody, Button } from "@nextui-org/react";
import ExpenseSummary from "./summary";
import { expenseColumns } from "@/constants/data";
import { expensesCategory } from "@/constants/categories";
import axios from "axios";
import { CircularProgress } from "@nextui-org/progress";
import TransactionModal from "@/components/modal/TransactionModal"; // Unified Modal
import { toast } from "react-hot-toast";

export default function ExpensePage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null); // Expense to edit

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("/api/transaction/expense");
      setExpenses(response.data);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
      toast.error("Failed to fetch expenses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleEdit = (expense) => {
    setCurrentExpense(expense);
    setModalOpen(true);
  };

  const handleDelete = async (expense) => {
    try {
      await axios.delete(`/api/transaction/expense/${expense.id}`);
      setData((prev) => prev.filter((e) => e.id !== expense.id));
      toast.success("Expense deleted successfully!");
    } catch (error) {
      console.error("Failed to delete expense:", error);
      toast.error("Failed to delete expense. Please try again.");
    }
  };

  const handleSaveExpense = (savedExpense) => {
    if (currentExpense) {
      // Edit mode
      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === savedExpense.id ? savedExpense : expense
        )
      );
    } else {
      // Add mode
      setExpenses((prev) => [savedExpense, ...prev]);
    }
    fetchExpenses();
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentExpense(null);
  };

  return (
    <main className="flex h-full flex-col space-y-4 p-5">
      <ExpenseSummary />
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
                historyData={expenses}
                columns={expenseColumns}
                categoryOptions={expensesCategory}
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
        onSave={handleSaveExpense}
        transaction={currentExpense}
        type="expense"
      />
    </main>
  );
}
