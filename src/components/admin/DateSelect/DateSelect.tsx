/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, forwardRef } from 'react'
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../pages/admin/Dashboard/dashboard.css"


export default function DateSelect() {
    // const [dateRange, setDateRange] = useState([new Date(), null]);
    // const [startDate, endDate] = dateRange;
    
  return (
    //   <DatePicker
    //       selectsRange={true}
    //       startDate={startDate}
    //       endDate={endDate}
    //       onChange={(update) => {
    //           setDateRange(update);
    //       }}
    //       customInput={<CustomInput />}
    //   />
    <h1>Date Picker</h1>
  )
}

// const CustomInput = forwardRef(({ value, onClick }: {value:any, onClick: any}, ref) => (
//   <button className="custom-input" onClick={onClick} ref={ref}>
//     {value}
//   </button>
// ));