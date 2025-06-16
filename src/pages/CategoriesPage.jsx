//react-router-dom
import { Link } from "react-router-dom";
//data
import categories from "/src/utils/categoires.js";
//C-hooks
import useTitle from "../hooks/useTitle.js";

export default function CategoriesPage() {
  useTitle('دوره ها')
  return (
    <div className="grid grid-cols-1 place-items-center gap-6 ml:max-lg:grid-cols-2 lg:max-xl:mt-9 lg:max-xl:grid-cols-3 xl:grid-cols-4">
      {categories?.map((item) => (
        <Link key={item.id} to={`/categories/${item.to}`}>
          <img src={item.src} alt="" />
        </Link>
      ))}
    </div>
  );
}
