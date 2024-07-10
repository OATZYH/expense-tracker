const expenseColumns = [
  // {name: "ID", key: "id", sortable: true},
  {name: "NAME", key: "name", sortable: true},
  {name: "AMOUNT", key: "amount", sortable: true},
  {name: "CATEGORY", key: "category", sortable: true},
  {name: "PAID VIA", key: "paidVia"},
  {name: "DATE", key: "date", sortable: true},
  {name: "NOTE", key: "note"},
  {name: "ACTIONS", key: "actions"},
]

const incomeColumns = [
  // {name: "ID", key: "id", sortable: true},
  {name: "NAME", key: "name", sortable: true},
  {name: "AMOUNT", key: "amount", sortable: true},
  {name: "CATEGORY", key: "category"},
  {name: "DATE", key: "date"},
  {name: "NOTE", key: "note"},
  {name: "ACTIONS", key: "actions"},
]

export { expenseColumns, incomeColumns};