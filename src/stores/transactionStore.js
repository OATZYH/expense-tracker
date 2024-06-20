import {create} from "zustand";
import axios from "axios";
import { summary as initialData } from "@/constants/summary";

const useTransaction = create((set, get) => ({
  data: initialData,
  incomeTransactions: [],
  expenseTransactions: [],
  totalIncome: 0,
  totalIncomeTransactions: 0,
  totalExpense: 0,
  totalExpenseTransactions: 0,
  totalSubscriptions: 0,
  totalActiveSubscriptions: 0,

  fetchData: async () => {
    try {
      const incomeResponse = await axios.get('/api/transaction/income');
      const expenseResponse = await axios.get('/api/transaction/expense');

      const incomeTransactions = incomeResponse.data;
      const expenseTransactions = expenseResponse.data;

      // Calculate totals
      const totalIncome = incomeTransactions.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
      const totalExpense = expenseTransactions.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
      const balance = totalIncome - totalExpense;

      // Update the data array
      const updatedData = get().data.map(item => {
        switch (item.title) {
          case "Total Balance":
            return { ...item, amount: balance };
          case "Total Income":
            return { ...item, amount: totalIncome };
          case "Total Expense":
            return { ...item, amount: totalExpense };
          default:
            return item;
        }
      });

      set({
        data: updatedData,
        balance,
        incomeTransactions,
        expenseTransactions,
        totalIncome,
        totalIncomeTransactions: incomeTransactions.length,
        totalExpense,
        totalExpenseTransactions: expenseTransactions.length,
        // totalSubscriptions: incomeTransactions.length + expenseTransactions.length,
        // totalActiveSubscriptions: incomeTransactions.length,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));


export default useTransaction;
