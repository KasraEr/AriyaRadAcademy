import { useQuery } from "@tanstack/react-query";
import api from "../utils/config";

const fetchOrders = async ({ page, pageSize, userId, isOrderPaid }) => {
  const res = await api.get("/api/Order/GetPagedFilter", {
    params: {
      PageNumber: page,
      PageSize: pageSize,
      UserId: userId || undefined,
      IsOrderPaid: isOrderPaid ?? undefined,
      SortBy: "createdDateTime",
      SortAscending: false,
      NeedTotalCount: true,
    },
  });
  return res?.data ?? { queryResult: [], totalCount: 0 };
};

export const useOrders = (filters) => {
  return useQuery({
    queryKey: ["orders", filters],
    queryFn: () => fetchOrders(filters),
    keepPreviousData: true,
  });
};
