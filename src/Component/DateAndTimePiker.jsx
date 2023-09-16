import { Stack, TextField } from "@mui/material";
import { DatePicker, TimePicker, DateTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";

const DateAndTimePiker = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  console.log({ selectedData });
  console.log({
    selectedTime,
  });
  return (
    <Stack spacing={2} sx={{ width: "250px" }}>
      <DatePicker
        label="Date picker"
        renderInput={(params) => <TextField {...params} />}
        value={selectedData}
        onChange={(newValue) => {
          setSelectedData(newValue);
        }}
      ></DatePicker>
      {/* <TimePicker
        label="Date picker"
        renderInput={(params) => <TextField {...params} />}
        value={selectedData}
        onChange={(newValue) => {
          setSelectedTime(newValue);
        }}
      ></TimePicker> */}
      <DateTimePicker
        label="Date Time picker"
        renderInput={(params) => <TextField {...params} color="primary.main" />}
        value={selectedData}
        onChange={(newValue) => {
          setSelectedTime(newValue);
        }}
      />
    </Stack>
  );
};

export default DateAndTimePiker;
