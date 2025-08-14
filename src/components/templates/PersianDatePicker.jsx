import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { toJalaali, jalaaliToDateObject, jalaaliMonthLength } from "jalaali-js";

const months = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const weekdaysShort = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const weekdaysFull = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];

const toPersianDigits = (str) =>
  str.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

// نگاشت dayjs (Sunday=0) به ایندکس شنبه‌محور (Saturday=0)
const mapToSatStart = (d) => (d + 1) % 7;

export default function PersianDatePicker({ value, onChange, label }) {
  const [selectedDate, setSelectedDate] = useState(() => {
    const date = dayjs(value);
    return date.isValid() ? date : dayjs();
  });

  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  // sync با prop value
  useEffect(() => {
    if (value !== undefined) {
      const d = dayjs(value);
      if (d.isValid()) setSelectedDate(d);
    }
  }, [value]);

  // تاریخ انتخاب‌شده به جلالی
  const selectedJalaali = toJalaali(
    selectedDate.year(),
    selectedDate.month() + 1,
    selectedDate.date()
  );

  const currentYear = selectedJalaali.jy;
  const currentMonth = selectedJalaali.jm;

  // امروز (برای هایلایت)
  const today = dayjs();
  const todayJalaali = toJalaali(today.year(), today.month() + 1, today.date());

  // نام روز هفته با نگاشت درست
  const weekday = weekdaysFull[mapToSatStart(selectedDate.day())];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getMonthDays = () => {
    const daysInMonth = jalaaliMonthLength(currentYear, currentMonth);
    const firstDayOfMonth = dayjs(
      jalaaliToDateObject(currentYear, currentMonth, 1)
    );
    // آفست شروع ماه با شنبه‌محوری
    const startDay = mapToSatStart(firstDayOfMonth.day());

    const days = [];
    // روزهای خالی قبل از شروع ماه
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    // روزهای ماه
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const setByJalali = (jy, jm, jd) => {
    const jsDate = jalaaliToDateObject(jy, jm, jd);
    const d = dayjs(jsDate);
    setSelectedDate(d);
  };

  const clampJDay = (jy, jm, jd) => Math.min(jd, jalaaliMonthLength(jy, jm));

  // ناوبری واقعی جلالی (نه add میلادی)
  const changeMonth = (offset) => {
    let jy = currentYear;
    let jm = currentMonth + offset;
    let jd = selectedJalaali.jd;

    while (jm < 1) {
      jm += 12;
      jy -= 1;
    }
    while (jm > 12) {
      jm -= 12;
      jy += 1;
    }

    jd = clampJDay(jy, jm, jd);
    setByJalali(jy, jm, jd);
  };

  const changeYear = (offset) => {
    let jy = currentYear + offset;
    let jm = currentMonth;
    let jd = clampJDay(jy, jm, selectedJalaali.jd);
    setByJalali(jy, jm, jd);
  };

  const handleSelectDay = (day) => {
    const newDate = dayjs(jalaaliToDateObject(currentYear, currentMonth, day));
    setSelectedDate(newDate);
    onChange?.(newDate);
    setShowPicker(false);
  };

  return (
    <div className="relative w-full max-w-xs" dir="rtl">
      {label && (
        <label className="block subtitle2 mb-2 text-sm font-medium">{label}</label>
      )}

      <input
        type="text"
        readOnly
        value={`${weekday} ${toPersianDigits(selectedJalaali.jd)} ${
          months[selectedJalaali.jm - 1]
        } ${toPersianDigits(selectedJalaali.jy)}`}
        onClick={() => setShowPicker(true)}
        className="w-full p-2 b4 text-sm border rounded-lg cursor-pointer"
      />

      {showPicker && (
        <div
          ref={pickerRef}
          className="absolute z-10 mt-1 w-[355px] bg-white border rounded-lg shadow-lg p-3"
        >
          {/* هدر تقویم */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex space-x-1 rtl:space-x-reverse">
              <button
                onClick={() => changeYear(-1)}
                className="p-1 text-sm rounded hover:bg-gray-100 border"
              >
                سال قبل
              </button>
              <button
                onClick={() => changeYear(1)}
                className="p-1 text-sm rounded hover:bg-gray-100 border"
              >
                سال بعد
              </button>
            </div>

            <div className="b2">
              {months[currentMonth - 1]} {toPersianDigits(currentYear)}
            </div>

            <div className="flex space-x-1 rtl:space-x-reverse">
              <button
                onClick={() => changeMonth(-1)}
                className="p-1 text-sm rounded hover:bg-gray-100 border"
              >
                ماه قبل
              </button>
              <button
                onClick={() => changeMonth(1)}
                className="p-1 text-sm rounded hover:bg-gray-100 border"
              >
                ماه بعد
              </button>
            </div>
          </div>

          {/* روزهای هفته */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {weekdaysShort.map((day) => (
              <div key={day} className="text-center text-sm font-bold">
                {day}
              </div>
            ))}
          </div>

          {/* روزهای ماه */}
          <div className="grid grid-cols-7 gap-1">
            {getMonthDays().map((day, idx) => {
              const isToday =
                day &&
                todayJalaali.jy === currentYear &&
                todayJalaali.jm === currentMonth &&
                todayJalaali.jd === day;

              const isSelected =
                day &&
                selectedJalaali.jd === day &&
                selectedJalaali.jm === currentMonth &&
                selectedJalaali.jy === currentYear;

              return (
                <button
                  key={idx}
                  disabled={!day}
                  onClick={() => day && handleSelectDay(day)}
                  className={`
                    h-8 w-full text-sm rounded
                    ${!day ? "opacity-0 cursor-default" : ""}
                    ${isToday ? "bg-blue-100 font-bold" : ""}
                    ${isSelected ? "bg-blue-500 text-white" : ""}
                    ${day && !isToday && !isSelected ? "hover:bg-gray-100" : ""}
                  `}
                >
                  {day ? toPersianDigits(day) : ""}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
