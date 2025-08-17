//r-r-d
import { Link } from "react-router-dom";

export default function ArticleCard({ data, key }) {

  return (
    <div key={key} className="flex flex-col items-center gap-6 overflow-hidden border border-text-500 rounded-4xl w-full p-5 ml:my-5 ml:min-h-[calc(600px+8%)]">
      <img src={data.image} alt="" className="w-full" />
      <h3 className="text-[21px]">{data.title}</h3>
      <div className="flex items-center justify-between w-full border-t border-text-500">
        <p className="b3 text-primary-500 flex items-center justify-center gap-1 pt-4">
          <img src={teacherIcon} alt="" />
          هم‌یار
        </p>
        <p className="subtitle2 text-primary-900 flex items-center justify-center gap-1 pt-4">
          {data.teacher}
        </p>
      </div>
      <div className="flex items-center justify-between w-full border-t border-text-500">
        <p className="b3 text-primary-500 flex items-center justify-center gap-1 pt-4">
          <img src={durationIcon} alt="" />
          مدت زمان
        </p>
        <p className="subtitle2 text-primary-900 flex items-center justify-center gap-1 pt-4">
          {data.duration} ماه
        </p>
      </div>
      <button className="bg-primary-500 text-basic-100 w-full rounded-full hover:bg-primary-100 hover:text-primary-500 active:bg-primary-900 active:text-text-100 transition">
        <Link to=''>
        خواندن مقاله
        </Link>
      </button>
    </div>
  );
}
