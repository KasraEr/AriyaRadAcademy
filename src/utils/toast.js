import { toast } from "react-toastify";

export const showToast = (message, type = "success", options = {}) => {
  toast[type](message, {
    className: "b1",
    bodyClassName: "b1",
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "light",
    ...options,
  });
};
