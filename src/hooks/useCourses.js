import { useQuery } from "@tanstack/react-query";
import api from "../utils/config";

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await api.get("/api/Course/GetSelectList");
      return data;
    },
    staleTime: 1000 * 60 * 15,
    cacheTime: 1000 * 60 * 15,
  });
}
