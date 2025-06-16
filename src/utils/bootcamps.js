const bootcamps = [
  {
    id: 1,
    image: "/src/assets/images/react.svg",
    title: "برنامه نویسی .net core",
    teacher: "کسری عرفانیان",
    duration: "3",
    tos: { month: "تیر", year: "1404" },
    signUp: { d: "30", m: "خرداد", y: "1404" },
    price: "4500000",
  },
  {
    id: 2,
    image: "/src/assets/images/react.svg",
    title: "برنامه نویسی .net core",
    teacher: "کسری عرفانیان",
    duration: "3",
    tos: { month: "تیر", year: "1404" },
    signUp: { d: "30", m: "خرداد", y: "1404" },
    price: "4500000",
  },
  {
    id: 3,
    image: "/src/assets/images/react.svg",
    title: "برنامه نویسی .net core",
    teacher: "کسری عرفانیان",
    duration: "3",
    tos: { month: "تیر", year: "1404" },
    signUp: { d: "30", m: "خرداد", y: "1404" },
    price: "4500000",
  },
  {
    id: 4,
    image: "/src/assets/images/react.svg",
    title: "برنامه نویسی .net core",
    teacher: "کسری عرفانیان",
    duration: "3",
    tos: { month: "تیر", year: "1404" },
    signUp: { d: "30", m: "خرداد", y: "1404" },
    price: "4500000",
  },
  {
    id: 5,
    image: "/src/assets/images/react.svg",
    title: "برنامه نویسی .net core",
    teacher: "کسری عرفانیان",
    duration: "3",
    tos: { month: "تیر", year: "1404" },
    signUp: { d: "30", m: "خرداد", y: "1404" },
    price: "4500000",
  },
];

const convertToPersianNumbers = (num) => {
  return num.toString().replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
};

const persianBootcamps = bootcamps?.map((course) => ({
  ...course,
  duration: convertToPersianNumbers(course.duration),
  price: convertToPersianNumbers(course.price),
  tos: {
    month: course.tos.month,
    year: convertToPersianNumbers(course.tos.year),
  },
  signUp: {
    d: convertToPersianNumbers(course.signUp.d),
    m: course.signUp.m,
    y: convertToPersianNumbers(course.signUp.y),
  },
}));

export default persianBootcamps;
