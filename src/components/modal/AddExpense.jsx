"use client";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  DatePicker,
  Textarea,
} from "@nextui-org/react";
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";
import SelectCategory from "./select/SelectCategory";
import { expensesCategory, expensesPay } from "@/constants/categories";
import axios from "axios";

export default function AddExpense() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const now = today(getLocalTimeZone());

  const [value, setValue] = useState(now);
  const [selectedCategory, setSelectedCategory] = useState(new Set());
  const [selectedPay, setSelectedPay] = useState(new Set());

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      amount: formData.get("amount"),
      date: value,
      category: [...selectedCategory][0],
      pay: [...selectedPay][0],
      note: formData.get("note"),
    };

    // console.log("Form Data", data);
    try {
      const res = await axios.post("/api/transaction/expense", data);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      e.target.reset();
      onOpenChange(false);
    }
  }

  return (
    <div>
      <Button onPress={onOpen} color="danger" aria-label="Open add expense form">
        Add Expense
      </Button>
      <Modal
        aria-labelledby="Add Expense"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit}>
                <ModalHeader className="flex flex-col gap-1 text-2xl">
                  Add Expense
                </ModalHeader>
                <ModalBody>
                  <Input
                    name="name"
                    bordered
                    fullWidth
                    size="lg"
                    label="Expense Name"
                    labelPlacement="outside"
                    placeholder="What did you spend?"
                    classNames={{ label: "font-bold" }}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="amount"
                      bordered
                      fullWidth
                      label="Amount"
                      labelPlacement="outside"
                      placeholder="How much?"
                      classNames={{ label: "font-bold" }}
                    />
                    <div className="flex flex-col">
                      <label className="font-bold text-sm mb-1">Date</label>
                      <DatePicker
                        locale="en"
                        value={value}
                        onChange={setValue}
                        clearable
                        aria-label="Select date"
                      />
                    </div>
                    <SelectCategory
                      label={"Category"}
                      placeholder={"What did you spend?"}
                      category={expensesCategory}
                      selectedKeys={selectedCategory}
                      setSelectedKeys={setSelectedCategory}
                    />

                    <SelectCategory
                      label={"Paid With"}
                      placeholder={"Which wallet?"}
                      category={expensesPay}
                      selectedKeys={selectedPay}
                      setSelectedKeys={setSelectedPay}
                    />
                  </div>
                  <Textarea
                    name="note"
                    label="Note (Optional)"
                    bordered
                    labelPlacement="outside"
                    placeholder="Note Here"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" className="w-full" type="submit" aria-label="Submit expense">
                    Submit
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
