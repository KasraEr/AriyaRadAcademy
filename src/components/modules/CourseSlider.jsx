//Keen-Slider
import { useKeenSlider } from "keen-slider/react";
//modules
import Card from "./Card";

export default function CourseSlider({ courseData }) {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      rtl: true,
      slides: {
        perView: 2,
        spacing: 10,
      },
      breakpoints: {
        "(min-width:850px)": {
          slides: {
            perView: 3,
            spacing: 10,
          },
        },
        "(min-width:1400px)": {
          slides: {
            perView: 4,
            spacing: 30,
          },
        },
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );
  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        {courseData?.map((course) => (
          <div
            key={course.id}
            className={`keen-slider__slide number-slide${course.id}`}
          >
            <Card courseData={course} />
          </div>
        ))}
      </div>
    </>
  );
}
