import { Link } from "react-router-dom";

import programming from "/src/assets/images/programming.svg";
import ai from "/src/assets/images/ai.svg";
import productDesign from "/src/assets/images/product-design.svg";
import graphicDesign from "/src/assets/images/graphic-design.svg";

export default function Banner() {
  const categories = [
    {
      slug: "programming",
      img: programming,
      className: "row-start-1 col-start-2",
      alt: "Programming",
    },
    {
      slug: "product-design",
      img: productDesign,
      className: "row-start-2 col-start-1",
      alt: "Product Design",
    },
    {
      slug: "artificial-intelligence",
      img: ai,
      className: "row-start-2 col-start-3",
      alt: "Artificial Intelligence",
    },
    {
      slug: "graphic-design",
      img: graphicDesign,
      className: "row-start-3 col-start-2",
      alt: "Graphic Design",
    },
  ];

  return (
    <div className="grid grid-rows-3 grid-cols-3 mb-14 sm:max-lg:max-w-[500px] w-fit mx-auto items-center justify-items-center">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          to={`/categories/${cat.slug}`}
          className={cat.className}
        >
          <img src={cat.img} alt={cat.alt} className="xl:w-35 2xl:w-38" />
        </Link>
      ))}
    </div>
  );
}
