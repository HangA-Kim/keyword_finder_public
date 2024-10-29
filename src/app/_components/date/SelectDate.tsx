import React, { Component } from 'react'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { type Dayjs } from "dayjs";

interface SelectDateProps {
  startDate: Dayjs;
  setStartDate: (date: Dayjs) => void;
}

export class SelectDate extends Component<SelectDateProps> {

  render() {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              name="date"
              label="검색 시작 날짜"
              defaultValue={this.props.startDate}
              onChange={(newValue: Dayjs | null) => {
                if (newValue) this.props.setStartDate(newValue);
              }}
              format="YYYY-MM-DD"
            />
          </DemoContainer>
        </LocalizationProvider>
    )
  }
}

export default SelectDate
