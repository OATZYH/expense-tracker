import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Chip,
  Button,
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure,
  Input
} from "@nextui-org/react";
import { BalanceIcon } from "./icons/sidebar/balance-icon";

export default function CardSummary({ title, amount }) {
  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
        <div className="flex flex-row w-full items-center justify-between">
          <p className="text-md">{title}</p>
         <ModalExample />
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

const ModalExample = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <div>
      <Button onPress={onOpen} color="primary">Open Modal</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
