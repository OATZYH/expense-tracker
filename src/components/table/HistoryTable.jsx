import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { EditIcon } from "@/components/icons/EditIcon";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import TopContent from "@/components/table/TopContent";
import BottomContent from "@/components/table/BottomContent";
import { expensesCategory, expensesPay } from "@/constants/categories";
import { formatDateForDisplay } from "@/lib/formatDate";

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "amount",
  "category",
  "paidVia",
  "date",
  "note",
  "actions",
];

const renderEmoji = (key, data) => {
  const item = data.find((item) => item.key === key.toLowerCase());
  return item ? item.emoji : "";
};

export default function HistoryTable({
  historyData,
  columns,
  categoryOptions,
  handleEdit,
  handleDelete,
}) {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "date",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.key)
    );
  }, [visibleColumns, columns]);

  const filteredItems = React.useMemo(() => {
    let filteredTransactions = [...historyData];

    if (hasSearchFilter) {
      filteredTransactions = filteredTransactions.filter((transaction) =>
        transaction.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (categoryFilter !== "all") {
      filteredTransactions = filteredTransactions.filter((transaction) =>
        Array.from(categoryFilter).includes(transaction.category.toLowerCase())
      );
    }

    return filteredTransactions;
  }, [historyData, filterValue, categoryFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  //TODO: Sorting all items
  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  //NOTE: Row renderer
  const renderCell = React.useCallback((data, columnKey) => {
    const cellValue = data[columnKey];

    switch (columnKey) {
      case "name":
        return <div className="flex items-center">{cellValue}</div>;
      case "amount":
        return (
          <div className="flex items-center">
            <span>{cellValue}</span>
          </div>
        );
      case "category":
        const emoji = renderEmoji(cellValue, expensesCategory);
        return (
          <div className="flex items-center">
            {emoji && <span>{emoji}</span>}
            <span className="ml-2">{cellValue}</span>
          </div>
        );
      case "paidVia":
        const emoji2 = renderEmoji(cellValue, expensesPay);
        return (
          <div className="flex items-center">
            {emoji2 && <span>{emoji2}</span>}
            <span className="ml-2">{cellValue}</span>
          </div>
        );
      case "date":
        const formattedDate = formatDateForDisplay(cellValue);
  return (
    <div className="flex items-center">
      <span>{formattedDate}</span>
    </div>
        );
      //TODO: Limit the length of the note in MODAL
      case "note":
        return (
          <div className="flex items-center">
            <span>{cellValue}</span>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit data">
              <Button
                isIconOnly
                aria-label="Edit"
                size="sm"
                onClick={() => handleEdit(data)}
              >
                <EditIcon />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <Button
                isIconOnly
                aria-label="Delete"
                color="danger"
                size="sm"
                onClick={() => handleDelete(data)}
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      shadow="none"
      isHeaderSticky
      bottomContent={
        <BottomContent
          items={items}
          page={page}
          pages={pages}
          hasSearchFilter={hasSearchFilter}
          setPage={setPage}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
        />
      }
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[1500px]",
      }}
      sortDescriptor={sortDescriptor}
      topContent={
        <TopContent
          filterValue={filterValue}
          categoryFilter={categoryFilter}
          visibleColumns={visibleColumns}
          onRowsPerPageChange={onRowsPerPageChange}
          dataLength={historyData.length}
          onSearchChange={onSearchChange}
          onClear={onClear}
          setVisibleColumns={setVisibleColumns}
          setCategoryFilter={setCategoryFilter}
          categoryOptions={categoryOptions}
          columns={columns}
        />
      }
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.key === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No transactions found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
