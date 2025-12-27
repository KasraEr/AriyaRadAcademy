//temps
import Banner from "../components/templates/Banner";
import Intro from "../components/templates/Intro";
import Environment from "../components/templates/Environment";
import IntroductoryCourses from "../components/templates/IntroductoryCourses";
import Teacher from "../components/templates/Teacher";
import Bootcamps from "../components/templates/Bootcamps";
import Certificates from "../components/templates/Certificates";
import AdvancedCourses from "../components/templates/AdvancedCourses";
//r-h-a
import { Helmet } from "react-helmet-async";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>آکادمی آریا راد | صفحه اصلی</title>
        <meta name="description" content="the landing page of the website" />
      </Helmet>

      <div className="sm:mt-6 ml:mt-1 lg:mt-5 lg:grid lg:grid-rows-1 2xl:grid-rows-[750px] lg:grid-cols-[1.2fr_1.4fr] lg:gap-5 mb-8">
        <Banner />
        <Intro />
      </div>
      <Environment />
      <IntroductoryCourses />
      <Teacher />
      <Bootcamps />
      <Certificates />
      <AdvancedCourses />
    </>
  );
}
