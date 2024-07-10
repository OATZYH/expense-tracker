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
import AddIncome from "./modal/AddIncome";
import AddSubscription from "./modal/AddSubscription";

function renderModal(title) {
  if(title === "Total Expense") {
    return <AddExpense />
  } else if(title === "Total Income") {
    return <AddIncome />
  } else if(title === "Add Subscription") {
    return <AddSubscription />
  }
}
export default function CardSummary({ title, amount, }) {
  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3 h-[60px]">
        <div className="flex flex-row w-full items-center justify-between">
          <p className="text-lg">{title}</p>
          {renderModal(title)}
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-row items-center">
        <p className="text-2xl font-bold">฿ {amount}</p>
        {/* <Chip startContent={<BalanceIcon size={18} />} size="sm">
          Chip
        </Chip> */}
      </CardBody>
      <Divider />
    </Card>
    
  );
}

