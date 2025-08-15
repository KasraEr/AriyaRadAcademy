import dayjs from "dayjs";
import { toJalaali } from "jalaali-js";
import { toPersianDigits } from "./toPersianDigits";

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

/**
 * تاریخ ISO یا Date رو به فرمت جلالی با اعداد فارسی تبدیل می‌کنه
 * @param {string|Date} isoString
 * @returns {string}
 */
export const formatJalali = (isoString) => {
  if (!isoString) return "-";
  const d = dayjs(isoString);
  if (!d.isValid()) return "-";
  const { jy, jm, jd } = toJalaali(d.year(), d.month() + 1, d.date());
  return `${toPersianDigits(jd)} ${months[jm - 1]} ${toPersianDigits(jy)}`;
};
