import { Flip, toast } from "react-toastify";

export const showWarningToast = (text, rest) => {
  toast.warn(text, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Flip,
    ...rest,
  });
}

export const showSuccessToast = (text, rest) => {
  toast.success(text, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Flip,
    ...rest,
  });
}