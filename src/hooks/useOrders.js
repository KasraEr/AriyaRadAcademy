import { useQuery } from "@tanstack/react-query";
import api from "../utils/config";

const fetchOrders = async () => {
  const res = await api.get("/api/Order/GetPagedFilter", {
    params: {
      PageNumber: 1,
      PageSize: 100,
      SortBy: "createdDateTime",
      SortAscending: false,
      NeedTotalCount: false,
    },
  });
  return res?.data?.queryResult ?? [];
};

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders", { page: 1 }],
    queryFn: fetchOrders,
    staleTime: 60_000,
  });
};
