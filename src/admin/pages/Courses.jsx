import { useEffect, useState } from "react";
// admin components
import Table from "../components/Table";
import Modal from "../components/Modal";
// temps
import PersianDatePicker from "../../components/templates/PersianDatePicker";
// utils
import api from "../../utils/config";
import { showToast } from "../../utils/toast";
import { formatJalali } from "../../utils/formatJalali";
import { toPersianDigits } from "../../utils/toPersianDigits";

export default function Courses() {
  const initialCourse = () => ({
    title: "",
    durationInHours: 0,
    timeOfHolding: "",
    registrationDeadline: "",
    priceInTomans: 0,
    description: "",
    coverImage: "",
    coverVideo: "",
    headings: "",
    prerequisite: "", 
    techerId: 0, 
    categoryId: 0,
    difficulty: "",
  });

  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState(initialCourse());
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setNewCourse(initialCourse());
    setEditMode(false);
    setModalOpen(true);
  };

  const openEditModal = (course) => {
    setNewCourse({ ...initialCourse(), ...course });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editMode) {
        await api.put("/api/Course/Update", newCourse);
        showToast("دوره با موفقیت ویرایش شد");
      } else {
        await api.post("/api/Course/Create", newCourse);
        showToast("دوره با موفقیت ایجاد شد");
      }
      setModalOpen(false);
      fetchCourses();
    } catch (e) {
      showToast(
        e?.response?.data?.message || "خطا در ذخیره‌سازی دوره",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: "عنوان", accessor: "title" },
    {
      header: "مدت (ساعت)",
      accessor: "durationInHours",
      cell: (row) => toPersianDigits(row.durationInHours),
    },
    {
      header: "قیمت (تومان)",
      accessor: "priceInTomans",
      cell: (row) => toPersianDigits(row.priceInTomans),
    },
    { header: "تاریخ برگزاری", cell: (row) => formatJalali(row.timeOfHolding) },
    { header: "پیش‌نیاز", accessor: "prerequisite" }, 
    {
      header: "عملیات",
      cell: (row) => (
        <div className="flex gap-2 justify-start">
          <button className="text-blue-600" onClick={() => openEditModal(row)}>
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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="subtitle1">مدیریت دوره‌ها</h2>
        <button className="active" onClick={openAddModal}>
          افزودن دوره جدید
        </button>
      </div>

      <Table data={courses} columns={columns} />

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)} size="lg">
          <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
            <h3 className="subtitle2">
              {editMode ? "ویرایش دوره" : "افزودن دوره جدید"}
            </h3>

            <div>
              <label className="block mb-1 b2">عنوان</label>
              <input
                type="text"
                value={newCourse.title}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, title: e.target.value })
                }
                className="b2 w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-1 b2">مدت (ساعت)</label>
              <input
                type="number"
                value={newCourse.durationInHours}
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    durationInHours: +e.target.value,
                  })
                }
                className="b2 w-full p-2 border rounded-lg"
                required
              />
            </div>

            <PersianDatePicker
              label="تاریخ برگزاری"
              value={newCourse.timeOfHolding}
              onChange={(date) =>
                setNewCourse({ ...newCourse, timeOfHolding: date })
              }
            />

            <PersianDatePicker
              label="مهلت ثبت‌نام"
              value={newCourse.registrationDeadline}
              onChange={(date) =>
                setNewCourse({ ...newCourse, registrationDeadline: date })
              }
            />

            <div>
              <label className="block mb-1 b2">قیمت (تومان)</label>
              <input
                type="number"
                value={newCourse.priceInTomans}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, priceInTomans: +e.target.value })
                }
                className="b2 w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block mb-1 b2">توضیحات</label>
              <textarea
                value={newCourse.description}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, description: e.target.value })
                }
                className="b2 w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-1 b2">لینک تصویر کاور</label>
              <input
                type="text"
                value={newCourse.coverImage}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, coverImage: e.target.value })
                }
                className="b2 w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-1 b2">لینک ویدیو کاور</label>
              <input
                type="text"
                value={newCourse.coverVideo}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, coverVideo: e.target.value })
                }
                className="b2 w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-1 b2">سرفصل‌ها</label>
              <input
                type="text"
                value={newCourse.headings}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, headings: e.target.value })
                }
                className="b2 w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-1 b2">پیش‌نیاز</label>
              <input
                type="text"
                value={newCourse.prerequisite}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, prerequisite: e.target.value })
                }
                className="b2 w-full p-2 border rounded-lg"
                placeholder="مثلاً: HTML & CSS مقدماتی"
              />
            </div>

            <div>
              <label className="block mb-1 b2">شناسه مدرس</label>
              <input
                type="number"
                value={newCourse.techerId}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, techerId: +e.target.value })
                }
                className="b2 w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-1 b2">شناسه دسته‌بندی</label>
              <input
                type="number"
                value={newCourse.categoryId}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, categoryId: +e.target.value })
                }
                className="b2 w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-1 b2">سطح سختی</label>
              <select
                value={newCourse.difficulty}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, difficulty: e.target.value })
                }
                className="b2 w-full p-2 border rounded-lg"
              >
                <option value="">انتخاب سطح سختی</option>
                <option value="introductory">مبتدی</option>
                <option value="advanced">پیشرفته</option>
                <option value="bootcamps">بوت‌کمپ</option>
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                انصراف
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {loading ? "در حال ذخیره..." : "ذخیره"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
