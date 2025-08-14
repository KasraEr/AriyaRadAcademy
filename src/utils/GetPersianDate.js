import { toJalaali } from "jalaali-js";

export const getPersianDate = () => {
  const now = new Date();
  const jDate = toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());

  const weekdays = [
    "یک‌شنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
    "شنبه",
  ];
  const weekday = weekdays[now.getDay()];

  return `${weekday} ${jDate.jy}/${String(jDate.jm).padStart(2, "0")}/${String(
    jDate.jd
  ).padStart(2, "0")}`;
};

// import dayjs from "dayjs";
// import jalaliday from "jalaliday";

// dayjs.extend(jalaliday);

// export const getPersianDate = () => {
//   return dayjs().calendar("jalali").locale("fa-IR").format("dddd YYYY/MM/DD");
// };
//////////////////////////////////////////////////////////////////////////
// import dayjs from "dayjs";
// import jalaliday from "jalaliday";
// import utc from "dayjs/plugin/utc";
// import timezone from "dayjs/plugin/timezone";

// dayjs.extend(jalaliday);
// dayjs.extend(utc);
// dayjs.extend(timezone);

// export const getPersianDates = () => {
//   return dayjs()
//     .tz("Asia/Tehran")
//     .calendar("jalali")
//     .locale("fa-IR")
//     .format("dddd YYYY/MM/DD");
// };
///////////////////////////////////////////////////////////////////////////
