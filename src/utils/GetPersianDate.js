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
