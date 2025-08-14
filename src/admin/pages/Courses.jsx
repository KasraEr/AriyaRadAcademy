import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../utils/config";
import Table from "../components/Table";
import Modal from "../components/Modal";
import PersianDatePicker from "../../components/templates/PersianDatePicker";
import { toast } from "react-toastify";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit, reset, setValue, watch } = useForm();

  const fetchCourses = async () => {
    try {
      const res = await api.get("/api/Course/GetSelectList");
      setCourses(res.data);
    } catch (err) {
      toast.error("خطا در دریافت دوره‌ها");
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
    reset(course);
    setEditMode(true);
    setModalOpen(true);
  };

  const deleteCourse = async (id) => {
    if (confirm("آیا از حذف دوره مطمئن هستید؟")) {
      try {
        await api.delete("/api/Course/Delete", { data: { id } });
        toast.success("دوره با موفقیت حذف شد");
        fetchCourses();
      } catch {
        toast.error("خطا در حذف دوره");
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      const endpoint = editMode ? "/api/Course/Update" : "/api/Course/Create";
      await api.post(endpoint, data);
      toast.success(editMode ? "دوره ویرایش شد" : "دوره اضافه شد");
      setModalOpen(false);
      fetchCourses();
    } catch {
      toast.error("خطا در ذخیره‌سازی دوره");
    }
  };

  const columns = [
    { header: "عنوان", accessor: "title" },
    { header: "مدت", accessor: "durationInHours" },
    { header: "قیمت", accessor: "priceInTomans" },
    {
      header: "تاریخ برگزاری",
      cell: (row) => row.timeOfHolding?.slice(0, 10),
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
            onClick={() => deleteCourse(row.id)}
          >
            حذف
          </button>
        </div>
      ),
    },
  ];

  return (
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
                {...register("title")}
                className="b2 w-full border p-2 rounded outline-0 mt-4"
              />
            </div>

            <div>
              <label className="subtitle2">مدت زمان (ساعت)</label>
              <input
                {...register("durationInHours")}
                type="number"
                className="b2 w-full border p-2 rounded outline-0 mt-4"
              />
            </div>

            <div>
              <label className="subtitle2">قیمت (تومان)</label>
              <input
                {...register("priceInTomans")}
                type="number"
                className="b2 w-full border p-2 rounded outline-0 mt-4"
              />
            </div>

            <div className="flex w-full items-center justify-between gap-2">
              <div className="w-full">
                <PersianDatePicker
                  label="تاریخ برگزاری"
                  value={watch("timeOfHolding")}
                  onChange={(date) => setValue("timeOfHolding", date)}
                />
              </div>

              <div className="w-full">
                <PersianDatePicker
                  label="مهلت ثبت‌نام"
                  value={watch("registrationDeadline")}
                  onChange={(date) => setValue("registrationDeadline", date)}
                />
              </div>
            </div>

            <div>
              <label className="subtitle2">توضیحات</label>
              <textarea
                {...register("description")}
                className="b2 w-full border p-2 rounded outline-0 mt-4"
              />
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
                {...register("teacherId")}
                type="number"
                className="b2 w-full border p-2 rounded outline-0 mt-4"
              />
            </div>

            <div>
              <label className="subtitle2">شناسه دسته‌بندی</label>
              <input
                {...register("categoryId")}
                type="number"
                className="b2 w-full border p-2 rounded outline-0 mt-4"
              />
            </div>

            <div>
              <label className="subtitle2">سطح سختی</label>
              <select
                {...register("difficulty")}
                className="b2 w-full border p-2 rounded outline-0 mt-4"
              >
                <option value="">انتخاب کنید</option>
                <option value="مقدماتی">مقدماتی</option>
                <option value="پیشرفته">پیشرفته</option>
              </select>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                className="b2 text-gray-600"
                onClick={() => setModalOpen(false)}
              >
                انصراف
              </button>
              <button type="submit" className="active">
                {editMode ? "ذخیره تغییرات" : "افزودن دوره"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

const defaultValues = {
  id: 0,
  title: "",
  durationInHours: 0,
  timeOfHolding: "",
  registrationDeadline: "",
  priceInTomans: 0,
  description: "",
  coverImage: "",
  coverVideo: "",
  headings: "",
  teacherId: 0,
  categoryId: 0,
  difficulty: "",
};
