import dayjs from "dayjs";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);

export const getPersianDate = () => {
  return dayjs().calendar("jalali").locale("fa-IR").format("dddd YYYY/MM/DD");
};
