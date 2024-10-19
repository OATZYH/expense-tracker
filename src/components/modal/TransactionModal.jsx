"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Textarea,
  DatePicker,
} from "@nextui-org/react";
import {
  expensesCategory,
  expensesPay,
  incomeCategory,
} from "@/constants/categories";
import SelectCategory from "./select/SelectCategory";
import { toast } from "react-hot-toast";
import axios from "axios";
import { convertDatetoDB } from "@/lib/formatDate";
import { parseDate, today } from "@internationalized/date";

export default function TransactionModal({
  isOpen,
  onClose,
  onSave,
  transaction = null,
  type , 
}) {
  const isEditMode = Boolean(transaction);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    date: null,
    note: "",
  });

  const [selectedCategory, setSelectedCategory] = useState(new Set());
  const [selectedPay, setSelectedPay] = useState(new Set());

  // Load transaction data when in Edit mode
  useEffect(() => {
    if (isEditMode && transaction) {
      setFormData({
        name: transaction.name,
        amount: transaction.amount.toString(),
        date: parseDate(transaction.date.split("T")[0]),
        note: transaction.note || "",
      });
      setSelectedCategory(new Set([transaction.category]));
      if (type === "expense") {
        setSelectedPay(new Set([transaction.paidVia]));
      }
    } else {
      setFormData({
        name: "",
        amount: "",
        date: today(),
        note: "",
      });
      setSelectedCategory(new Set());
      setSelectedPay(new Set());
    }
  }, [isEditMode, transaction, type]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (
        !formData.name ||
        !formData.amount ||
        selectedCategory.size === 0 ||
        !formData.date ||
        (type === "expense" && selectedPay.size === 0)
      ) {
        toast.error("Please fill in all required fields.");
        return;
      }
  
      const payload = {
        name: formData.name,
        amount: parseFloat(formData.amount),
        category: Array.from(selectedCategory)[0],
        date: convertDatetoDB(formData.date),
        note: formData.note,
      };
      console.log(payload);
      if (type === "expense") {
        payload.pay = Array.from(selectedPay)[0];
      }
  
      if (isEditMode) {
        const response = await axios.put(
          `/api/transaction/${type}/${transaction.id}`,
          payload
        );
        onSave(response.data);
        toast.success(`${capitalize(type)} updated successfully!`);
      } else {
        const response = await axios.post(`/api/transaction/${type}`, payload);
        onSave(response.data);
        toast.success(`${capitalize(type)} added successfully!`);
      }

      onClose();
    } catch (error) {
      console.error(`Failed to ${isEditMode ? "update" : "add"} ${type}:`, error);
      toast.error(`Failed to ${isEditMode ? "update" : "add"} ${type}. Please try again.`);
    }
  };
  
  // Helper function to capitalize first letter
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              {isEditMode
                ? `Edit ${capitalize(type)}`
                : `Add ${capitalize(type)}`}
            </ModalHeader>
            <ModalBody>
              {/* Form inputs here */}
              <Input
                name="name"
                bordered
                fullWidth
                size="lg"
                label={type === "expense" ? "Expense Name" : "Income Name"}
                labelPlacement="outside"
                placeholder={
                  type === "expense"
                    ? "What did you spend?"
                    : "What did you earn?"
                }
                classNames={{ label: "font-bold" }}
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Input
                  name="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  bordered
                  fullWidth
                  label="Amount"
                  labelPlacement="outside"
                  placeholder="How much?"
                  classNames={{ label: "font-bold" }}
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                />
                <div className="flex flex-col">
                  <label className="font-bold text-sm mb-1">Date</label>
                  <DatePicker
                    locale="en"
                    value={formData.date}
                    onChange={(date) => setFormData({ ...formData, date })}
                    placeholderValue={today()}
                    aria-label="Select date"
                    granularity="day"
                    required
                  />
                </div>
                <SelectCategory
                  label="Category"
                  placeholder="Select category"
                  category={
                    type === "expense" ? expensesCategory : incomeCategory
                  }
                  selectedKeys={selectedCategory}
                  setSelectedKeys={setSelectedCategory}
                />
                {type === "expense" && (
                  <SelectCategory
                    label="Paid With"
                    placeholder="Select payment method"
                    category={expensesPay}
                    selectedKeys={selectedPay}
                    setSelectedKeys={setSelectedPay}
                  />
                )}
              </div>
              <Textarea
                name="note"
                label="Note (Optional)"
                bordered
                labelPlacement="outside"
                placeholder="Note Here"
                value={formData.note}
                onChange={handleInputChange}
                className="mt-4"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                {isEditMode ? "Update" : "Add"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
