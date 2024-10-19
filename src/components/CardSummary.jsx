"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardBody, Divider, Button } from "@nextui-org/react";
import TransactionModal from "./modal/TransactionModal";

export default function CardSummary({ title, amount, type }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleAdd = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSaveTransaction = (newTransaction) => {
    // Update your state or refetch data
    // This depends on how you manage data in your app
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3 h-[60px]">
        <div className="flex flex-row w-full items-center justify-between">
          <p className="text-lg">{title}</p>
          {type === "expense" && (
            <Button
              auto
              size="small"
              onClick={handleAdd}
              color="danger"
            >
              Add Expense
            </Button>
          )}
          {type === "income" && (
            <Button
              auto
              size="small"
              onClick={handleAdd}
              color="success"
            >
              Add Income
            </Button>
          )}
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-row items-center">
        <p className="text-2xl font-bold">฿ {amount}</p>
      </CardBody>
      <Divider />
      <TransactionModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={handleSaveTransaction}
        type={type}
      />
    </Card>
  );
}
