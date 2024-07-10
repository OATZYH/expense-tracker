import React from 'react';
import {
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Select, SelectItem
} from "@nextui-org/react";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default function TopContent  ({
  filterValue,
  categoryFilter,
  visibleColumns,
  onRowsPerPageChange,
  dataLength,
  onSearchChange,
  onClear,
  setVisibleColumns,
  setCategoryFilter,
  categoryOptions,
  columns
}) {
  return (
    <div className="flex flex-col gap-4 mx-4 mt-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3 ">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                variant="flat"
              >
                Category
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={categoryFilter}
              selectionMode="multiple"
              onSelectionChange={setCategoryFilter}
            >
              {categoryOptions.map((category) => (
                <DropdownItem key={category.key} className="capitalize">
                  {capitalize(category.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                variant="flat"
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.key} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
            <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

