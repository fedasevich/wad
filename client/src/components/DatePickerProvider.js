import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import {ArrowLeftIcon, ArrowRightIcon} from "../ui/Icons/ControlIcons/ControlIcons"

const DatePickerProvider = observer(() => {
    const [selectedDate, setSelectedDate] = useState("January 2023")
  return (
    <div className="d-flex mt-5 fw-medium justify-content-evenly cursor-pointer">
        <ArrowLeftIcon/>
        <h3>{selectedDate}</h3>
        <ArrowRightIcon/>
    </div>
  )
})

export default DatePickerProvider