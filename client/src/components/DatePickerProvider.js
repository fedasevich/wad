import { addDays, addMonths, endOfDay, endOfMonth, endOfWeek, endOfYear, format, fromUnixTime, lastDayOfWeek, startOfDay, startOfMonth, startOfWeek, startOfYear, subDays, subMonths, subYears } from 'date-fns'
import { addYears } from 'date-fns/esm'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { DateRange, DateRangePicker } from 'react-date-range'
import { Context } from '..'
import { fetchCategory } from '../http/categoryApi'
import { ArrowLeftIcon, ArrowRightIcon, WalletIcon } from "../ui/Icons/ControlIcons/ControlIcons"
import MenuProvider from './MenuProvider'
import Modal from './modal/modal'

const DatePickerProvider = observer(({ dateRange, setDateRange }) => {
  const [datePickerModal, setDatePickerModal] = useState(false)
  const [dateRangeModal, setDateRangeModal] = useState(false)
  const [dateToPrint, setDateToPrint] = useState(format(dateRange[0].startDate, 'MMMM y'))
  const { category } = useContext(Context)

  const handleDateRangeChange = (start, end, action, print) => {
    setDateRange([
      {
        startDate: start,
        endDate: end,
        key: 'selection',
        action: action
      }
    ])
    setDateToPrint(() => {
      return print
    })
  }

  const fetchCategoryPeriod = useCallback(() => {
    category.fetchCategoryPeriod(dateRange)
  },
    [dateRange, category],
  )



  useEffect(() => {
    fetchCategoryPeriod()
    setDatePickerModal(false)

  }, [dateRange, fetchCategoryPeriod])


  const handleSelectRangeClick = () => {
    setDatePickerModal(false);
    setDateRangeModal(true)
  }

  const handleAllTimeClick = () => {
    handleDateRangeChange(fromUnixTime(0), new Date(), "all-time", "All time")
  }

  const handleDefaultClick = () => {
    category.fetchCategory()
    setDateToPrint(() => {
      return "Default"
    })
    setDatePickerModal(false)
  }

  const handleWeekClick = () => {
    handleDateRangeChange(
      startOfWeek(new Date()),
      lastDayOfWeek(new Date()),
      "week",
      format(startOfWeek(new Date()), 'd.M') + " - " + format(lastDayOfWeek(new Date()), 'd.M')
    )
  }

  const handleYearClick = () => {
    handleDateRangeChange(startOfYear(new Date()), endOfYear(new Date()), "year", format(new Date(), 'y'))

  }

  const handleMonthClick = () => {
    handleDateRangeChange(startOfMonth(new Date()), endOfMonth(new Date()), "month", format(new Date(), 'MMMM y'))
  }

  const handleTodayClick = () => {
    handleDateRangeChange(startOfDay(new Date()), endOfDay(new Date()), "today", format(new Date(), 'd.M'))

  }

  const handleArrowLeftClick = () => {

    if (dateRange[0].action === "week") {

      handleDateRangeChange(
        subDays(startOfWeek(dateRange[0].startDate), 7),
        endOfWeek(dateRange[0].endDate),
        "week",
        format(subDays(startOfWeek(dateRange[0].startDate), 7), 'd.M') + " - " + format(endOfWeek(dateRange[0].endDate), 'd.M'))
    }
    if (dateRange[0].action === "year") {
      handleDateRangeChange(startOfYear(subYears(dateRange[0].startDate, 1)), endOfYear(subYears(dateRange[0].endDate, 1)), "year", format(subYears(dateRange[0].endDate, 1), 'y'))
    }
    if (dateRange[0].action === "today") {
      handleDateRangeChange(startOfDay(subDays(dateRange[0].startDate, 1)), endOfDay(subDays(dateRange[0].endDate, 1)), "today", format(endOfDay(subDays(dateRange[0].endDate, 1)), 'd.M'))
    }
    if (dateRange[0].action === "month") {
      handleDateRangeChange(startOfMonth(subMonths(dateRange[0].startDate, 1)), endOfMonth(subMonths(dateRange[0].endDate, 1)), "month", format(subMonths(dateRange[0].endDate, 1), 'MMMM y'))
    }
  }

  const handleArrowRightClick = () => {

    if (dateRange[0].action === "week") {
      handleDateRangeChange(
        startOfWeek(dateRange[0].startDate),
        addDays(endOfWeek(dateRange[0].endDate), 7),
        "week",
        format(startOfWeek(dateRange[0].startDate), 'd.M') + " - " + format(addDays(endOfWeek(dateRange[0].endDate), 7), 'd.M'))
    }
    if (dateRange[0].action === "year") {
      handleDateRangeChange(startOfYear(addYears(dateRange[0].startDate, 1)), endOfYear(addYears(dateRange[0].endDate, 1)), "year", format(addYears(dateRange[0].endDate, 1), 'y'))
    }
    if (dateRange[0].action === "today") {
      handleDateRangeChange(startOfDay(addDays(dateRange[0].startDate, 1)), endOfDay(addDays(dateRange[0].endDate, 1)), "today", format(endOfDay(addDays(dateRange[0].endDate, 1)), 'd.M'))
    }
    if (dateRange[0].action === "month") {
      handleDateRangeChange(startOfMonth(addMonths(dateRange[0].startDate, 1)), endOfMonth(addMonths(dateRange[0].endDate, 1)), "month", format(addMonths(dateRange[0].endDate, 1), 'MMMM y'))
    }
  }

  return (
    <>

      <div className="d-flex mt-5 fw-medium justify-content-evenly cursor-pointer" >
       {dateRange[0].action !== 'all-time' && 
       <span onClick={handleArrowLeftClick}>
          <ArrowLeftIcon />
        </span>}
        

        <h3 onClick={() => {
          setDatePickerModal(true)
        }}>{dateToPrint}</h3>
         {dateRange[0].action !== 'all-time' && 
        <span onClick={handleArrowRightClick}>
          <ArrowRightIcon />
        </span>}

      </div>

      <Modal active={datePickerModal} setActive={setDatePickerModal}>

        <MenuProvider.Container >


          <div className="date-picker ">

            <div className="item item-wide" onClick={handleSelectRangeClick}>
              <WalletIcon /> <h2>Select range</h2>
            </div>
            <div className="item" onClick={handleAllTimeClick}>
              <WalletIcon /> <h2>All time</h2>
            </div>
            <div className="item" onClick={handleDefaultClick}>
              <WalletIcon /> <h2>Default</h2>
            </div>
            <div className="item" onClick={handleWeekClick}>
              <WalletIcon /> <h2>Week</h2>
            </div>
            <div className="item" onClick={handleTodayClick}>
              <WalletIcon /> <h2>Today</h2>
            </div>
            <div className="item" onClick={handleYearClick}>
              <WalletIcon /> <h2>Year</h2>
            </div>
            <div className="item" onClick={handleMonthClick}>
              <WalletIcon /> <h2>Month</h2>
            </div>

          </div>
        </MenuProvider.Container>



      </Modal>


      <Modal active={dateRangeModal} setActive={setDateRangeModal}>
        <MenuProvider.Container>
          {/* <DateRangePicker
          onChange={item => {
           
            setDateRange([item.selection])
          }}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={dateRange}
          direction="horizontal"
          preventSnapRefocus={true}
          calendarFocus="backwards"
        /> */}

          <DateRange
            editableDateInputs={true}
            onChange={item => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
          />

        </MenuProvider.Container>
      </Modal>
    </>

  )
})

export default DatePickerProvider