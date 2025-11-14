import dayjs from "dayjs";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);

export const isToday = (isoString) => {
  return dayjs(isoString)
    .calendar("jalali")
    .isSame(dayjs().calendar("jalali"), "day");
};
