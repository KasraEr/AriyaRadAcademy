import { useState } from "react";
import { useOrders } from "../../hooks/useOrders";
import { useQueries } from "@tanstack/react-query";
import Table from "../components/Table";
import api from "../../utils/config";
import { filterOrdersByDate } from "../../utils/filterOrdersByDate";
import PersianDatePicker from "../../components/templates/PersianDatePicker";
import { toPersianDigits } from "../../utils/toPersianDigits";

export default function TodayRegistrations() {
  const [page, setPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [userIdInput, setUserIdInput] = useState("");
  const [isOrderPaid, setIsOrderPaid] = useState(true);
  const pageSize = 20;

  const { data, isLoading: ordersLoading } = useOrders({
    page,
    pageSize,
    userId: userIdInput ? Number(userIdInput) : undefined,
    isOrderPaid,
  });

  const orders = data?.queryResult ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const filteredOrders = filterOrdersByDate(orders, selectedDate);

  const uniqueUserIds = [...new Set(filteredOrders.map((o) => o.userId))];
  const uniqueCourseIds = [
    ...new Set(
      filteredOrders
        .filter((o) => Array.isArray(o.courseIds) && o.courseIds.length > 0)
        .flatMap((o) => o.courseIds)
    ),
  ];

  const userQueries = useQueries({
    queries: uniqueUserIds.map((id) => ({
      queryKey: ["user", id],
      queryFn: async () => {
        const { data } = await api.get(`/api/User/GetById?Id=${id}`);
        return data;
      },
    })),
  });

  const courseQueries = useQueries({
    queries: uniqueCourseIds.map((id) => ({
      queryKey: ["course", id],
      queryFn: async () => {
        const { data } = await api.get(`/api/Course/GetById?Id=${id}`);
        return data;
      },
    })),
  });

  const users = userQueries
    .filter((q) => q.isSuccess && q.data)
    .map((q) => q.data);

  const courses = courseQueries
    .filter((q) => q.isSuccess && q.data)
    .map((q) => q.data);

  const coursesLoading = courseQueries.some((q) => q.isLoading);

  const columns = [
    {
      header: "شناسه کاربر",
      accessor: "userId",
      cell: (row) => toPersianDigits(row.userId),
    },
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
        return user?.phoneNumber ? toPersianDigits(user.phoneNumber) : "-";
      },
    },
    {
      header: "نام دوره",
      accessor: "courseIds",
      cell: (row) => {
        if (!Array.isArray(row.courseIds) || row.courseIds.length === 0) {
          return "نامشخص";
        }

        const titles = row.courseIds
          .map((id) => {
            const course = courses.find((c) => c.id == id);
            return course?.title;
          })
          .filter(Boolean);

        if (titles.length === 0) return "نامشخص";
        if (titles.length === 1) return titles[0];

        return (
          <details className="cursor-pointer">
            <summary className="text-blue-600 underline">
              مشاهده دوره‌ها ({titles.length})
            </summary>
            <ul className="mt-1 list-disc list-inside text-sm text-gray-700">
              {titles.map((title, idx) => (
                <li key={idx}>{title}</li>
              ))}
            </ul>
          </details>
        );
      },
    },
    {
      header: "تاریخ ثبت‌نام",
      accessor: "createdDateTime",
      cell: (row) =>
        toPersianDigits(
          new Date(row.createdDateTime).toLocaleDateString("fa-IR")
        ),
    },
  ];

  if (ordersLoading || coursesLoading) {
    return <p>در حال بارگذاری...</p>;
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="mb-4 subtitle2">ثبت‌نام‌ها</h3>

      <div className="flex gap-4 mb-4 items-end">
        <PersianDatePicker
          value={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setPage(1);
          }}
          onClear={() => {
            setSelectedDate(null);
            setPage(1);
          }}
          label="انتخاب تاریخ"
        />

        <div className="flex flex-col max-w-xs w-full">
          <label className="subtitle2 mb-2 text-sm font-medium">
            شناسه کاربر
          </label>
          <input
            type="number"
            placeholder="مثلاً 123"
            value={userIdInput}
            onChange={(e) => setUserIdInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(1);
              }
            }}
            className="b4 border rounded-lg p-2 text-sm w-full"
          />
        </div>

        <div className="flex flex-col max-w-xs w-full">
          <label className="subtitle2 mb-2 text-sm font-medium">
            وضعیت پرداخت
          </label>
          <select
            value={isOrderPaid === true ? "paid" : "all"}
            onChange={(e) => {
              setIsOrderPaid(e.target.value === "paid" ? true : undefined);
              setPage(1);
            }}
            className="b4 border rounded-lg p-1.5 text-sm w-full"
          >
            <option value="all">همه سفارش‌ها</option>
            <option value="paid">فقط پرداخت‌شده</option>
          </select>
        </div>
      </div>

      <Table data={filteredOrders} columns={columns} />

      <div className="flex flex-col items-center mt-4 gap-2">
        <div className="text-sm text-gray-600 subtitle1">
          مجموع سفارش‌ها: {toPersianDigits(totalCount)} | صفحه{" "}
          {toPersianDigits(page)} از {toPersianDigits(totalPages)}
        </div>
        <div className="flex justify-center">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border subtitle2 rounded mx-1"
          >
            قبلی
          </button>
          <span className="px-3 py-1 b1">{toPersianDigits(page)}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border subtitle2 rounded mx-1"
          >
            بعدی
          </button>
        </div>
      </div>
    </div>
  );
}
