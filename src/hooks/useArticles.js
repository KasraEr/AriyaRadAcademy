import { useQuery } from "@tanstack/react-query";
import api from "../utils/config";

export function useArticles() {
  return useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data } = await api.get("/api/Article/GetSelectList");
      return data;
    },
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 30,
  });
}
