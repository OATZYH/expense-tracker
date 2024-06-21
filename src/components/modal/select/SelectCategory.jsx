import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectCategory({ category, label, placeholder, selectedKeys, setSelectedKeys }) {
  return (
    <Select
      bordered
      label={label}
      labelPlacement="outside"
      placeholder={placeholder}
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      classNames={{ label: "font-bold" }}
      items={category}
      renderValue={(items) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => {
              const selectedItem = category.find((selectedItem) => selectedItem.key === item.key);
              return (
                <div key={selectedItem.key}>
                  {selectedItem.emoji} {selectedItem.name}
                </div>
              );
            })}
          </div>
        );
      }}
    >
      {category.map((list) => (
        <SelectItem key={list.key} textValue={list.name}>
          <div className="flex gap-2 items-center">
            <div>{list.emoji}</div>
            <div className="flex flex-col">
              <span className="text-small">{list.name}</span>
            </div>
          </div>
        </SelectItem>
      ))}
    </Select>
  );
}
