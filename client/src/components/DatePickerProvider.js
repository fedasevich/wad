import { addDays, addMonths, endOfDay, endOfMonth, endOfWeek, endOfYear, format, fromUnixTime, lastDayOfWeek, startOfDay, startOfMonth, startOfWeek, startOfYear, subDays, subMonths, subYears } from 'date-fns'
import { addYears } from 'date-fns/esm'
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { DateRange } from 'react-date-range'
import { Context } from '..'
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


  useEffect(() => {
    setDatePickerModal(false)
  }, [dateRange])


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
    const action = dateRange[0].action;
    const startDate = dateRange[0].startDate;
    const endDate = dateRange[0].endDate;

    switch (action) {
      case "week":
        handleDateRangeChange(
          subDays(startOfWeek(startDate), 7),
          endOfWeek(endDate),
          "week",
          format(subDays(startOfWeek(startDate), 7), 'd.M') + " - " + format(endOfWeek(endDate), 'd.M')
        );
        break;
      case "year":
        handleDateRangeChange(startOfYear(subYears(startDate, 1)), endOfYear(subYears(endDate, 1)), "year", format(subYears(endDate, 1), 'y'));
        break;
      case "today":
        handleDateRangeChange(startOfDay(subDays(startDate, 1)), endOfDay(subDays(endDate, 1)), "today", format(endOfDay(subDays(endDate, 1)), 'd.M'));
        break;
      case "month":
        handleDateRangeChange(startOfMonth(subMonths(startDate, 1)), endOfMonth(subMonths(endDate, 1)), "month", format(subMonths(endDate, 1), 'MMMM y'));
        break;
      default:
        break;
    }
  };

  const handleArrowRightClick = () => {
    const action = dateRange[0].action;
    const startDate = dateRange[0].startDate;
    const endDate = dateRange[0].endDate;

    switch (action) {
      case "week":
        handleDateRangeChange(
          startOfWeek(startDate),
          addDays(endOfWeek(endDate), 7),
          "week",
          format(startOfWeek(startDate), 'd.M') + " - " + format(addDays(endOfWeek(endDate), 7), 'd.M')
        );
        break;
      case "year":
        handleDateRangeChange(startOfYear(addYears(startDate, 1)), endOfYear(addYears(endDate, 1)), "year", format(addYears(endDate, 1), 'y'));
        break;
      case "today":
        handleDateRangeChange(startOfDay(addDays(startDate, 1)), endOfDay(addDays(endDate, 1)), "today", format(endOfDay(addDays(endDate, 1)), 'd.M'));
        break;
      case "month":
        handleDateRangeChange(startOfMonth(addMonths(startDate, 1)), endOfMonth(addMonths(endDate, 1)), "month", format(addMonths(endDate, 1), 'MMMM y'));
        break;
      default:
        break;
    }
  };

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
              <WalletIcon /> <h4>Select range</h4>
            </div>
            <div className="item" onClick={handleAllTimeClick}>
              <WalletIcon /> <h4 className='mt-2'>All time</h4>
            </div>
            <div className="item" onClick={handleDefaultClick}>
              <WalletIcon /> <h4 className='mt-2'>Default</h4>
            </div>
            <div className="item" onClick={handleWeekClick}>
              <WalletIcon /> <h4 className='mt-2'>Week</h4>
            </div>
            <div className="item" onClick={handleTodayClick}>
              <WalletIcon /> <h4 className='mt-2'>Today</h4>
            </div>
            <div className="item" onClick={handleYearClick}>
              <WalletIcon /> <h4 className='mt-2'>Year</h4>
            </div>
            <div className="item" onClick={handleMonthClick}>
              <WalletIcon /> <h4 className='mt-2'>Month</h4>
            </div>

          </div>
        </MenuProvider.Container>



      </Modal>


      <Modal active={dateRangeModal} setActive={setDateRangeModal}>
        <MenuProvider.Container>
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