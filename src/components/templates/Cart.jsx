//hooks
import { useEffect, useState } from "react";
//utils
import api from "../../utils/config";

export default function Cart() {
  const [date, setDate] = useState({});

  useEffect(() => {
    api.get("/api/Course/GetSelectList").then((res) => setDate(res.data[1]));
  }, []);

  const showDate = date?.timeOfHolding;

  const localDate = new Date(showDate).toLocaleDateString("fa-IR", {
    timeZone: "Asia/Tehran",
  });

  return (
    <>
      <div className="text-center">
        <h2>سبد خرید شما خالی است!!</h2>
        {console.log(localDate)}
      </div>
    </>
  );
}
