import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Chip,
} from "@nextui-org/react";
import { BalanceIcon } from "./icons/sidebar/balance-icon";
import AddExpense from "./modal/AddExpense";

export default function CardSummary({ title, amount }) {
  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
        <div className="flex flex-row w-full items-center justify-between">
          <p className="text-md">{title}</p>
         <AddExpense />
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-row ">
        <p className="text-xl">฿{amount}</p>
        <Chip startContent={<BalanceIcon size={18} />} size="sm">
          Chip
        </Chip>
      </CardBody>
      <Divider />
    </Card>
    
  );
}

