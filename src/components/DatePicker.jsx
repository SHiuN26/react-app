import React, { useState, useEffect } from "react";
import {
  addDays,
  startOfMonth,
  isToday,
  getMonth,
  startOfWeek,
  eachDayOfInterval,
  format,
  isBefore,
  isSameDay,
  isAfter,
  isWithinInterval,
} from "date-fns";

import "./DatePicker.css";

const DatePicker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dates, setDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDayClick = (date) => {
    if (!startDate || isBefore(date, startDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (
      (startDate && !endDate) ||
      isAfter(date, startDate) ||
      isSameDay(date, startDate)
    ) {
      setEndDate(date);
    }
  };

  useEffect(() => {
    const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 });
    const end = addDays(start, 34); // 34天加上开始日期，共35天
    const allDates = eachDayOfInterval({ start, end });
    setDates(allDates);
  }, [currentDate]);

  useEffect(() => {
    console.log("startDate=>", startDate);
    console.log("endDate=>", endDate);
  }, [startDate, endDate]);

  return (
    <div className="date-picker">
      <div className="header">
        <button>
          <span>{`<`}</span>
        </button>
        <span>
          {currentDate.toLocaleString("default", {
            year: "numeric",
            month: "short",
          })}
        </span>
        <button>{`>`}</button>
      </div>

      {dates.map((date) => {
        const isInRange =
          startDate &&
          endDate &&
          isWithinInterval(date, { start: startDate, end: endDate });

        return (
          <button
            key={date}
            className={`day ${isToday(date) ? "today" : ""} ${
              getMonth(date) !== currentDate.getMonth()
                ? "not-current-month"
                : ""
            }${startDate && isSameDay(date, startDate) ? "start" : ""}
          ${endDate && isSameDay(date, endDate) ? "end" : ""}
          ${isInRange ? "in-range" : ""}
          `}
            onClick={() => handleDayClick(date)}
            disabled={getMonth(date) === currentDate.getMonth() ? false : true}
          >
            {format(date, "d")}
          </button>
        );
      })}
    </div>
  );
};

export default DatePicker;
