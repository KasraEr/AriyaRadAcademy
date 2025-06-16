//images
import programming from "/src/assets/images/programming.svg";
import ai from "/src/assets/images/ai.svg";
import productDesign from "/src/assets/images/product-design.svg";
import graphicDesign from "/src/assets/images/graphic-design.svg";
//r-r-d
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="grid grid-rows-3 grid-cols-3 mb-14 sm:max-lg:max-w-[500px] w-fit mx-auto items-center justify-items-center">
      <Link to="/categories/programming" className="row-start-1 col-start-2">
        <img src={programming} alt="" className="xl:w-35 2xl:w-38" />
      </Link>
      <Link to="/categories/product-design" className="row-start-2 col-start-1">
        <img src={productDesign} alt="" className="xl:w-35 2xl:w-38" />
      </Link>
      <Link
        to="/categories/artificial-intelligence"
        className="row-start-2 col-start-3"
      >
        <img src={ai} alt="" className="xl:w-35 2xl:w-38" />
      </Link>
      <Link to="/categories/graphic-design" className="row-start-3 col-start-2">
        <img src={graphicDesign} alt="" className="xl:w-35 2xl:w-38" />
      </Link>
    </div>
  );
}

// (
//     <div className="relative mb-6 sm:max-lg:max-w-[500px] lg:justify-center w-full sm:mx-auto">
//       <Link to="/categories/programming">
//         <img src={programming} alt="" className="" className=" mx-auto mb-2 xl:w-35 2xl:w-38" />
//       </Link>
//       <Link to="/categories/product-design">
//         <img
//           src={productDesign}
//           alt="" className=""
//           className="absolute top-[100px] left-[25px] lg:max-xl:left-[206px] xl:left-[150px] 2xl:left-[160px] xl:w-35 2xl:w-38"
//         />
//       </Link>
//       <Link to="/categories/artificial-intelligence">
//         <img
//           src={ai}
//           alt="" className=""
//           className="absolute top-[100px] right-[25px] lg:max-xl:right-[206px] xl:right-[150px] 2xl:right-[160px] xl:w-35 2xl:w-38"
//         />
//       </Link>
//       <Link to="/categories/graphic-design">
//         <img src={graphicDesign} alt="" className="" className="mx-auto xl:w-35 2xl:w-38" />
//       </Link>
//     </div>
//   );
