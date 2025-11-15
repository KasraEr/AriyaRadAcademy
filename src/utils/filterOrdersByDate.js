import dayjs from "dayjs";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);

export const filterOrdersByDate = (orders, targetDate) => {
  if (!Array.isArray(orders)) return [];
  if (!targetDate) return orders;
  return orders.filter((o) =>
    dayjs(o?.createdDateTime)
      .calendar("jalali")
      .isSame(dayjs(targetDate).calendar("jalali"), "day")
  );
};
