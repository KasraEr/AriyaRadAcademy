import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import api from "../../utils/config";
import Table from "../components/Table";
import Modal from "../components/Modal";
import PersianDatePicker from "../../components/templates/PersianDatePicker";
import { toJalaali } from "jalaali-js";
import { showToast } from "../../utils/toast";

// تبدیل اعداد به فارسی
const toPersianDigits = (str) =>
  str?.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]) ?? "";

// نمایش تاریخ جلالی زیبا
const formatJalali = (isoString) => {
  if (!isoString) return "-";
  const d = dayjs(isoString);
  if (!d.isValid()) return "-";
  const { jy, jm, jd } = toJalaali(d.year(), d.month() + 1, d.date());
  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
  return `${toPersianDigits(jd)} ${months[jm - 1]} ${toPersianDigits(jy)}`;
};

// مقادیر پیش‌فرض فرم
const defaultValues = {
  id: undefined, // برای create ارسال نمی‌شود
  title: "",
  durationInHours: undefined,
  timeOfHolding: null, // Dayjs | null
  registrationDeadline: null, // Dayjs | null
  priceInTomans: undefined,
  description: "",
  coverImage: "",
  coverVideo: "",
  headings: "",
  teacherId: undefined,
  categoryId: undefined,
  difficulty: "",
};

// Helper ساخت payload مطابق داکیومنت
const buildPayload = (form, { includeId = false } = {}) => {
  const isValidDate = (d) => dayjs.isDayjs(d) && d.isValid();

  const base = {
    title: form.title?.trim() ?? "",
    durationInHours: Number(form.durationInHours),
    timeOfHolding: isValidDate(form.timeOfHolding)
      ? form.timeOfHolding.toISOString()
      : null,
    registrationDeadline: isValidDate(form.registrationDeadline)
      ? form.registrationDeadline.toISOString()
      : null,
    priceInTomans: Number(form.priceInTomans),
    description: form.description?.trim() ?? "",
    coverImage: form.coverImage?.trim() ?? "",
    coverVideo: form.coverVideo?.trim() ?? "",
    headings: form.headings?.trim() ?? "",
    teacherId: Number(form.teacherId),
    categoryId: Number(form.categoryId),
    difficulty: form.difficulty?.trim() ?? "",
  };

  // فقط برای Update
  if (includeId) {
    return { id: Number(form.id), ...base };
  }
  return base;
};

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onSubmit",
  });

  const fetchCourses = async () => {
    try {
      const res = await api.get("/api/Course/GetSelectList");
      setCourses(res.data);
    } catch {
      showToast("خطا در دریافت دوره‌ها", "error");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const openAddModal = () => {
    reset(defaultValues);
    setEditMode(false);
    setModalOpen(true);
  };

  const openEditModal = (course) => {
    reset({
      ...course,
      // برای DatePicker به Dayjs تبدیل می‌کنیم
      timeOfHolding: course.timeOfHolding ? dayjs(course.timeOfHolding) : null,
      registrationDeadline: course.registrationDeadline
        ? dayjs(course.registrationDeadline)
        : null,
    });
    setEditMode(true);
    setModalOpen(true);
  };

  const deleteCourse = async (id) => {
    if (confirm("آیا از حذف دوره مطمئن هستید؟")) {
      setLoading(true);
      try {
        await api.delete("/api/Course/Delete", { data: { id } });
        showToast("دوره با موفقیت حذف شد");
        fetchCourses();
      } catch (e) {
        showToast(e?.response?.data?.message || "خطا در حذف دوره", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const onSubmit = async (data) => {
    // اعتبارسنجی دستی برای تاریخ‌ها چون خارج از register هستند
    const isValidDate = (d) => dayjs.isDayjs(d) && d.isValid();
    if (!isValidDate(data.timeOfHolding)) {
      showToast("لطفاً تاریخ برگزاری را انتخاب کنید", "error");
      return;
    }
    if (!isValidDate(data.registrationDeadline)) {
      showToast("لطفاً مهلت ثبت‌نام را انتخاب کنید", "error");
      return;
    }

    setLoading(true);
    try {
      const endpoint = editMode ? "/api/Course/Update" : "/api/Course/Create";
      const payload = buildPayload(data, { includeId: editMode });

      // در حالت Create اگر سرور روی null حساس است، این دو خط جایگزین حذف فیلدها می‌شود
      // اگر نمی‌خواهی فیلد null ارسال شود:
      // Object.keys(payload).forEach((k) => payload[k] === null && delete payload[k]);

      await api.post(endpoint, payload);
      showToast(editMode ? "دوره ویرایش شد" : "دوره اضافه شد");
      setModalOpen(false);
      fetchCourses();
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        "خطا در ذخیره‌سازی دوره";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: "عنوان", accessor: "title" },
    { header: "مدت", accessor: "durationInHours" },
    { header: "قیمت", accessor: "priceInTomans" },
    {
      header: "تاریخ برگزاری",
      cell: (row) => formatJalali(row.timeOfHolding),
    },
    {
      header: "عملیات",
      cell: (row) => (
        <div className="flex gap-2 justify-end">
          <button
            className="b2 text-blue-600"
            onClick={() => openEditModal(row)}
          >
            ویرایش
          </button>
          <button
            className="b2 text-red-600"
            disabled={loading}
            onClick={() => deleteCourse(row.id)}
          >
            حذف
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="subtitle1">مدیریت دوره‌ها</h2>
          <button className="active" onClick={openAddModal}>
            افزودن دوره جدید
          </button>
        </div>

        <Table data={courses} columns={columns} />

        {modalOpen && (
          <Modal onClose={() => setModalOpen(false)} size="md">
            <form
              className="flex flex-col gap-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h3 className="text-center text-secondary-900">
                {editMode ? "ویرایش دوره" : "افزودن دوره"}
              </h3>

              <div>
                <label className="subtitle2">عنوان دوره</label>
                <input
                  {...register("title", {
                    required: "عنوان الزامی است",
                    minLength: { value: 2, message: "حداقل ۲ کاراکتر" },
                  })}
                  className="b2 w-full border p-2 rounded outline-0 mt-4"
                />
                {errors.title && (
                  <span className="b3 text-red-600 mt-1 block">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div>
                <label className="subtitle2">مدت زمان (ساعت)</label>
                <input
                  {...register("durationInHours", {
                    required: "مدت زمان الزامی است",
                    valueAsNumber: true,
                    min: { value: 1, message: "حداقل ۱ ساعت" },
                  })}
                  type="number"
                  className="b2 w-full border p-2 rounded outline-0 mt-4"
                />
                {errors.durationInHours && (
                  <span className="b3 text-red-600 mt-1 block">
                    {errors.durationInHours.message}
                  </span>
                )}
              </div>

              <div>
                <label className="subtitle2">قیمت (تومان)</label>
                <input
                  {...register("priceInTomans", {
                    required: "قیمت الزامی است",
                    valueAsNumber: true,
                    min: { value: 0, message: "کمتر از ۰ نباشد" },
                  })}
                  type="number"
                  className="b2 w-full border p-2 rounded outline-0 mt-4"
                />
                {errors.priceInTomans && (
                  <span className="b3 text-red-600 mt-1 block">
                    {errors.priceInTomans.message}
                  </span>
                )}
              </div>

              <div className="flex w-full items-center justify-between gap-2">
                <div className="w-full">
                  <PersianDatePicker
                    label="تاریخ برگزاری"
                    value={watch("timeOfHolding")}
                    onChange={(date) =>
                      setValue("timeOfHolding", date, { shouldValidate: true })
                    }
                  />
                </div>

                <div className="w-full">
                  <PersianDatePicker
                    label="مهلت ثبت‌نام"
                    value={watch("registrationDeadline")}
                    onChange={(date) =>
                      setValue("registrationDeadline", date, {
                        shouldValidate: true,
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="subtitle2">توضیحات</label>
                <textarea
                  {...register("description", {
                    required: "توضیحات الزامی است",
                    minLength: { value: 5, message: "حداقل ۵ کاراکتر" },
                  })}
                  className="b2 w-full border p-2 rounded outline-0 mt-4"
                />
                {errors.description && (
                  <span className="b3 text-red-600 mt-1 block">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div>
                <label className="subtitle2">آدرس تصویر</label>
                <input
                  {...register("coverImage")}
                  className="b2 w-full border p-2 rounded outline-0 mt-4"
                />
              </div>

              <div>
                <label className="subtitle2">آدرس ویدیو</label>
                <input
                  {...register("coverVideo")}
                  className="b2 w-full border p-2 rounded outline-0 mt-4"
                />
              </div>

              <div>
                <label className="subtitle2">سرفصل‌ها</label>
                <input
                  {...register("headings")}
                  className="b2 w-full border p-2 rounded outline-0 mt-4"
                />
              </div>

              <div>
                <label className="subtitle2">شناسه مدرس</label>
                <input
                  {...register("teacherId", {
                    required: "شناسه مدرس الزامی است",
                    valueAsNumber: true,
                    min: { value: 1, message: "باید بزرگتر از ۰ باشد" },
                  })}
                  type="number"
                  className="b2 w-full border p-2 rounded outline-0 mt-4"
                />
                {errors.teacherId && (
                  <span className="b3 text-red-600 mt-1 block">
                    {errors.teacherId.message}
                  </span>
                )}
              </div>

              <div>
                <label className="subtitle2">شناسه دسته‌بندی</label>
                <input
                  {...register("categoryId", {
                    required: "شناسه دسته‌بندی الزامی است",
                    valueAsNumber: true,
                    min: { value: 1, message: "باید بزرگتر از ۰ باشد" },
                  })}
                  type="number"
                  className="b2 w-full border p-2 rounded outline-0 mt-4"
                />
                {errors.categoryId && (
                  <span className="b3 text-red-600 mt-1 block">
                    {errors.categoryId.message}
                  </span>
                )}
              </div>

              <div>
                <label className="subtitle2">سطح سختی</label>
                <select
                  {...register("difficulty", {
                    required: "سطح سختی را انتخاب کنید",
                  })}
                  className="b2 w-full border p-2 rounded outline-0 mt-4"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="مقدماتی">مقدماتی</option>
                  <option value="پیشرفته">پیشرفته</option>
                </select>
                {errors.difficulty && (
                  <span className="b3 text-red-600 mt-1 block">
                    {errors.difficulty.message}
                  </span>
                )}
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="b2 text-gray-600"
                  onClick={() => setModalOpen(false)}
                >
                  انصراف
                </button>
                <button type="submit" className="active" disabled={loading}>
                  {loading
                    ? "در حال ذخیره..."
                    : editMode
                    ? "ذخیره تغییرات"
                    : "افزودن دوره"}
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </>
  );
}