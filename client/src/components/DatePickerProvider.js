import { addDays, endOfDay, endOfMonth, endOfYear, format, fromUnixTime, lastDayOfWeek, startOfDay, startOfMonth, startOfWeek, startOfYear } from 'date-fns'
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

const handleDateRangeChange=(start,end,action,print)=>{
  setDateRange([
    {
      startDate: start,
      endDate: end,
      key: 'selection',
      action:action
    }
  ])
  setDateToPrint(() => {
    return print
  })
}

  const fetchCategoryPeriod = useCallback(() => {
        category.fetchCategoryPeriod(dateRange)
    },
    [dateRange,category],
  )



  useEffect(() => {
    fetchCategoryPeriod()
    setDatePickerModal(false)
  
  }, [dateRange,fetchCategoryPeriod])
  

  const handleSelectRangeClick = () => {
setDatePickerModal(false);
setDateRangeModal(true)
  }

  const handleAllTimeClick = () => {
    handleDateRangeChange( fromUnixTime(0),new Date(),"all time","All time")
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
    format(new Date(), 'd.M') + " - " + format(lastDayOfWeek(new Date()), 'd.M')
    )
  }

  const handleYearClick = () => {
    handleDateRangeChange( startOfYear(new Date()),endOfYear(new Date()),"year",format(new Date(), 'y'))

  }

  const handleMonthClick = () => {
    handleDateRangeChange( startOfMonth(new Date()),endOfMonth(new Date()),"month", format(new Date(), 'MMMM y'))
  }

  const handleTodayClick = () => {
    handleDateRangeChange( startOfDay(new Date()),endOfDay(new Date()),"today", format(new Date(), 'd.M'))

  }

  const handleArrowLeftClick=()=> {

  }

  const handleArrowRightClick=()=> {

    if(dateRange[0].action === "week") {
      handleDateRangeChange( startOfWeek(new Date()),
      addDays(dateRange[0].endDate,7),
      "week",
      format(new Date(), 'd.M') + " - " + format(addDays(dateRange[0].endDate,7), 'd.M'))
    }
  }

  return (
    <>

      <div className="d-flex mt-5 fw-medium justify-content-evenly cursor-pointer" >
        <ArrowLeftIcon onClick={handleArrowLeftClick}/>
        <h3 onClick={() => {
        setDatePickerModal(true)
      }}>{dateToPrint}</h3>
      <span onClick={handleArrowRightClick}>
      <ArrowRightIcon  />
      </span>
        
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
  onChange={item =>   setDateRange([item.selection])}
  moveRangeOnFirstSelection={false}
  ranges={dateRange}
/>

        </MenuProvider.Container>
      </Modal>
    </>

  )
})

export default DatePickerProvider