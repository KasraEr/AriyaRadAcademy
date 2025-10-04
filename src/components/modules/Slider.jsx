//Keen-Slider
import { useKeenSlider } from "keen-slider/react";
//images
import _1 from "/images/1.jpg";
import _2 from "/images/2.jpg";
import _3 from "/images/3.jpg";
import _4 from "/images/4.jpg";

export default function Slider() {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      rtl: true,
      breakpoints: {
        "(min-width:700px)": {
          slides: {
            perView: 2,
            spacing: 15,
          },
        },
        "(min-width:1000px)": {
          slides: {
            perView: 3,
            spacing: 10,
          },
        },
        "(min-width:1400px)": {
          slides: {
            perView: 4,
            spacing: 10,
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
      <div ref={sliderRef} className="keen-slider mx-auto">
        <div className="keen-slider__slide number-slide1">
          <img
            src={_1}
            loading="lazy"
            alt=""
            className="rounded-[16px] w-full"
          />
        </div>
        <div className="keen-slider__slide number-slide2">
          <img
            src={_2}
            loading="lazy"
            alt=""
            className="rounded-[16px] w-full"
          />
        </div>
        <div className="keen-slider__slide number-slide3">
          <img
            src={_3}
            loading="lazy"
            alt=""
            className="rounded-[16px] w-full"
          />
        </div>
        <div className="keen-slider__slide number-slide4">
          <img
            src={_4}
            loading="lazy"
            alt=""
            className="rounded-[16px] w-full"
          />
        </div>
      </div>
    </>
  );
}
