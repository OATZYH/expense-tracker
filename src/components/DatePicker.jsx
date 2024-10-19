import React from "react";
import { DateRangePicker, Select, SelectItem } from "@nextui-org/react";
import { today, startOfWeek, startOfMonth, endOfWeek, endOfMonth, getLocalTimeZone} from "@internationalized/date";
import {useLocale, useDateFormatter } from "@react-aria/i18n";

// TODO: Add support for multiple date ranges
const now = today(getLocalTimeZone());

export default function DatePicker() {
  const [value, setValue] = React.useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ days: 7 }),
  });

  // console.log("start", value.start);
  // console.log("end", value.end);

  let formatter = useDateFormatter({ dateStyle: "long" });
  return <DatePickerSingle></DatePickerSingle>;
}

function DatePickerRange({ value, onChange }) {
  return (
    <DateRangePicker className="" size="sm" value={value} onChange={onChange} />
  );
}

function DatePickerSingle({ value, onChange }) {
  const handleSelectionChange = (selected) => {
    switch (selected) {
      case "tdy": {
        onChange({
          selected,
          from: today(getLocalTimeZone()),
          to: now,
        });
        break;
      }
      case "7days": {
        onChange({
          selected,
          from: today(getLocalTimeZone()).subtract({ days: 6 }),
          to: now,
        });
        break;
      }
      case "30days": {
        onChange({
          selected,
          from: today(getLocalTimeZone()).subtract({ days: 29 }),
          to: now,
        });
        break;
      }
      case "m": {
        onChange({
          selected,
          from: startOfMonth(new Date()),
          to: addDays(new Date(), 0),
        });
        break;
      }
      case "y": {
        onChange({
          selected,
          from: startOfYear(new Date()),
          to: addDays(new Date(), 0),
        });
        break;
      }
    }
  };
  return (
    <Select
      label="Period"
      variant="bordered"
      placeholder="Select period"
      selectedKeys={[value]}
      className="max-w-xs"
      onChange={handleSelectionChange}
      isDisabled
    >
      <SelectItem value="none">Select</SelectItem>
      <SelectItem value="tdy">Today</SelectItem>
      <SelectItem value="7days">Last 7 days</SelectItem>
      <SelectItem value="30days">Last 30 days</SelectItem>
      <SelectItem value="m">Month to Date</SelectItem>
      <SelectItem value="y">Year to Date</SelectItem>
    </Select>
  );
}
