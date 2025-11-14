import { useQueries } from "@tanstack/react-query";
import Table from "../components/Table";
import api from "../../utils/config";
import { useOrders } from "../../hooks/useOrders";
import { filterTodaysPaidOrders } from "../../utils/filterTodaysPaidOrders";

export default function TodayRegistrations() {
  const { data: orders, isLoading: ordersLoading } = useOrders();
  const todaysOrders = filterTodaysPaidOrders(orders);

  const userIds = todaysOrders?.map((o) => o.userId) || [];
  const courseIds = todaysOrders?.map((o) => o.courseId) || [];

  const userQueries = useQueries({
    queries: userIds.map((id) => ({
      queryKey: ["user", id],
      queryFn: async () => {
        const {data} = await api.get(`/api/User/GetById?Id=${id}`);
        return data;
      },
    })),
  });

  const courseQueries = useQueries({
    queries: courseIds.map((id) => ({
      queryKey: ["course", id],
      queryFn: async () => {
        const {data} = await api.get(`/api/Course/GetById?Id=${id}`);
        return data;
      },
    })),
  });

  const usersLoading = userQueries.some((q) => q.isLoading);
  const coursesLoading = courseQueries.some((q) => q.isLoading);

  const users = userQueries.map((q) => q.data).filter(Boolean);
  const courses = courseQueries.map((q) => q.data).filter(Boolean);

  const columns = [
    {
      header: "نام کاربر",
      accessor: "userId",
      cell: (row) => {
        const user = users.find((u) => u.id === row.userId);
        return user ? `${user.firstName} ${user.lastName}` : "-";
      },
    },
    {
      header: "شماره تماس",
      accessor: "userId",
      cell: (row) => {
        const user = users.find((u) => u.id === row.userId);
        return user?.phoneNumber ?? "-";
      },
    },
    {
      header: "نام دوره",
      accessor: "courseId",
      cell: (row) => {
        const course = courses.find((c) => c.id === row.courseId);
        return course?.title ?? "نامشخص";
      },
    },
    {
      header: "تاریخ ثبت‌نام",
      accessor: "createdDateTime",
      cell: (row) => new Date(row.createdDateTime).toLocaleDateString("fa-IR"),
    },
  ];

  if (ordersLoading || usersLoading || coursesLoading) {
    return <p>در حال بارگذاری...</p>;
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="mb-4">ثبت‌نام‌های امروز</h3>
      <Table data={todaysOrders ?? []} columns={columns} />
    </div>
  );
}
