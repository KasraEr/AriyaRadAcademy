import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `آکادمی آریاراد | ${title}`;
  }, [title]);
};
export default useTitle;
