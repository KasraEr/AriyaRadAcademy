import { isToday } from "./isToday";

export const filterTodaysPaidOrders = (orders) => {
  if (!Array.isArray(orders)) return [];
  return orders.filter(
    (o) => o?.isOrderPaid === true && isToday(o?.createdDateTime)
  );
};
