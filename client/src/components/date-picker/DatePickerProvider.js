import {
  addDays,
  addMonths,
  addYears,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subYears
} from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useStore } from '../../store';
import {
  AllTimeIcon,
  DefaultIcon,
  MonthIcon,
  RangeIcon,
  TodayIcon,
  WeekIcon,
  YearIcon
} from '../../ui/Icons/DatePickerIcons/DatePickerIcons';
import { dateRangeOptions, getDateRangeOptions } from '../../utils/constants';
import ArrowSelect from '../ArrowSelect';
import MenuProvider from '../MenuProvider';
import Loader from '../loader/Loader';
import Modal from '../modal/modal';
import './style.css';

const DateRange = lazy(() => import('react-date-range').then((module) => ({ default: module.DateRange })));

const DatePickerProvider = observer(({ dateRange, setDateRange }) => {
  const [datePickerModal, setDatePickerModal] = useState(false);
  const [dateRangeModal, setDateRangeModal] = useState(false);
  const [dateToPrint, setDateToPrint] = useState(format(dateRange[0].startDate, 'MMMM y'));
  const { category } = useStore();
  const now = new Date();

  const handleDateRangeChange = ({ start, end, action, print }) => {
    setDateRange([
      {
        startDate: start,
        endDate: end,
        key: 'selection',
        action
      }
    ]);
    setDateToPrint(print);
  };

  useEffect(() => {
    setDatePickerModal(false);
  }, [dateRange]);

  const handleSelectRangeClick = () => {
    setDatePickerModal(false);
    setDateRangeModal(true);
  };

  const handleAllTimeClick = () => {
    handleDateRangeChange(getDateRangeOptions(now, dateRangeOptions.ALL_TIME));
  };

  const handleDefaultClick = () => {
    category.fetchCategory();
    setDateToPrint(() => {
      return 'Default';
    });
    setDatePickerModal(false);
  };

  const handleWeekClick = () => {
    handleDateRangeChange(getDateRangeOptions(now, dateRangeOptions.WEEK));
  };

  const handleYearClick = () => {
    handleDateRangeChange(getDateRangeOptions(now, dateRangeOptions.YEAR));
  };

  const handleMonthClick = () => {
    handleDateRangeChange(getDateRangeOptions(now, dateRangeOptions.MONTH));
  };

  const handleTodayClick = () => {
    handleDateRangeChange(getDateRangeOptions(now, dateRangeOptions.TODAY));
  };

  const handleArrowLeftClick = () => {
    const { action, startDate, endDate } = dateRange[0];

    switch (action) {
      case dateRangeOptions.WEEK:
        handleDateRangeChange({
          start: subDays(startOfWeek(startDate), 7),
          end: endOfWeek(endDate),
          action: dateRangeOptions.WEEK,
          print: `${format(subDays(startOfWeek(startDate), 7), 'd.M')} - ${format(endOfWeek(endDate), 'd.M')}`
        });
        break;
      case dateRangeOptions.YEAR:
        handleDateRangeChange({
          start: startOfYear(subYears(startDate, 1)),
          end: endOfYear(subYears(endDate, 1)),
          action: dateRangeOptions.YEAR,
          print: format(subYears(endDate, 1), 'y')
        });
        break;
      case dateRangeOptions.TODAY:
        handleDateRangeChange({
          start: startOfDay(subDays(startDate, 1)),
          end: endOfDay(subDays(endDate, 1)),
          action: dateRangeOptions.TODAY,
          print: format(endOfDay(subDays(endDate, 1)), 'd.M')
        });
        break;
      case dateRangeOptions.MONTH:
        handleDateRangeChange({
          start: startOfMonth(subMonths(startDate, 1)),
          end: endOfMonth(subMonths(endDate, 1)),
          action: dateRangeOptions.MONTH,
          print: format(subMonths(endDate, 1), 'MMMM y')
        });
        break;
      default:
        break;
    }
  };

  const handleArrowRightClick = () => {
    const { action, startDate, endDate } = dateRange[0];

    switch (action) {
      case dateRangeOptions.WEEK:
        handleDateRangeChange({
          start: startOfWeek(startDate),
          end: addDays(endOfWeek(endDate), 7),
          action: dateRangeOptions.WEEK,
          print: `${format(startOfWeek(startDate), 'd.M')} - ${format(addDays(endOfWeek(endDate), 7), 'd.M')}`
        });
        break;
      case dateRangeOptions.YEAR:
        handleDateRangeChange({
          start: startOfYear(addYears(startDate, 1)),
          end: endOfYear(addYears(endDate, 1)),
          action: dateRangeOptions.YEAR,
          print: format(addYears(endDate, 1), 'y')
        });
        break;
      case dateRangeOptions.TODAY:
        handleDateRangeChange({
          start: startOfDay(addDays(startDate, 1)),
          end: endOfDay(addDays(endDate, 1)),
          action: dateRangeOptions.TODAY,
          print: format(endOfDay(addDays(endDate, 1)), 'd.M')
        });
        break;
      case dateRangeOptions.MONTH:
        handleDateRangeChange({
          start: startOfMonth(addMonths(startDate, 1)),
          end: endOfMonth(addMonths(endDate, 1)),
          action: dateRangeOptions.MONTH,
          print: format(addMonths(endDate, 1), 'MMMM y')
        });
        break;
      default:
        break;
    }
  };

  const handleDateRangePickerChange = (item) => {
    setDateRange([{ ...item.selection, action: dateRangeOptions.ALL_TIME }]);
    setDateToPrint('custom range');
  };

  const handleTextClick = () => {
    setDatePickerModal(true);
  };

  const leftArrowShow = dateRange[0].action !== dateRangeOptions.ALL_TIME;
  const rightArrowShow = dateRange[0].action !== dateRangeOptions.ALL_TIME;

  const buttonData = [
    {
      id: 'selectRange',
      onClick: handleSelectRangeClick,
      icon: <RangeIcon />,
      text: 'Select range',
      className: 'item item-wide'
    },
    { id: 'allTime', onClick: handleAllTimeClick, icon: <AllTimeIcon />, text: 'All time', className: 'item' },
    { id: 'default', onClick: handleDefaultClick, icon: <DefaultIcon />, text: 'Default', className: 'item' },
    { id: 'week', onClick: handleWeekClick, icon: <WeekIcon />, text: 'Week', className: 'item' },
    { id: 'today', onClick: handleTodayClick, icon: <TodayIcon />, text: 'Today', className: 'item' },
    { id: 'year', onClick: handleYearClick, icon: <YearIcon />, text: 'Year', className: 'item' },
    { id: 'month', onClick: handleMonthClick, icon: <MonthIcon />, text: 'Month', className: 'item' }
  ];

  return (
    <>
      <ArrowSelect
        handleArrowLeftClick={handleArrowLeftClick}
        handleArrowRightClick={handleArrowRightClick}
        handleTextClick={handleTextClick}
        leftArrowShow={leftArrowShow}
        rightArrowShow={rightArrowShow}
        textToPrint={dateToPrint}
      />

      <Modal active={datePickerModal} setActive={setDatePickerModal}>
        <MenuProvider.Container>
          <div className="date-picker ">
            {buttonData.map((button) => (
              <button key={button.id} type="button" className={button.className} onClick={button.onClick}>
                {button.icon} <h4 className={button.className.includes('item-wide') ? '' : 'mt-2'}>{button.text}</h4>
              </button>
            ))}
          </div>
        </MenuProvider.Container>
      </Modal>

      {dateRangeModal && (
        <Modal active={dateRangeModal} setActive={setDateRangeModal}>
          <MenuProvider.Container>
            <Suspense fallback={<Loader />}>
              <div className="w-100 d-flex justify-content-center">
                <DateRange
                  editableDateInputs
                  onChange={handleDateRangePickerChange}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                />
              </div>
            </Suspense>
          </MenuProvider.Container>
        </Modal>
      )}
    </>
  );
});

export default DatePickerProvider;
