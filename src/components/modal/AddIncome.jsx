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
import { incomeCategory } from "@/constants/categories";

export default function AddIncome() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const now = today(getLocalTimeZone());
  const [value, setValue] = useState(now);

  return (
    <div>
      <Button onPress={onOpen} color="primary">
        Add Income
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-success-900 to-success-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl">
                Add Income
              </ModalHeader>
              <ModalBody>
                <Input
                  bordered
                  fullWidth
                  size="lg"
                  label="Income Name"
                  labelPlacement="outside"
                  placeholder="What did you earn?"
                  classNames={{ label: "font-bold" }}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
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
                    />
                  </div>
                 
                </div>
                  <SelectCategory label={"Category"} placeholder={"Category"} category={incomeCategory} />
                <Textarea
                  label="Note (Optional)"
                  bordered
                  labelPlacement="outside"
                  placeholder="Note Here"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" className="w-full" onPress={onClose}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
