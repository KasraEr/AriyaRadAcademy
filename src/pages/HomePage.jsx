//temps
import Banner from "../components/templates/Banner";
import Intro from "../components/templates/Intro";
import Environment from "../components/templates/Environment";
import IntroductoryCourses from "../components/templates/IntroductoryCourses";
import Teacher from "../components/templates/Teacher";
import Bootcamps from "../components/templates/Bootcamps";
import Certificates from "../components/templates/Certificates";
import AdvancedCourses from "../components/templates/AdvancedCourses";

export default function HomePage() {
  return (
    <>
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
