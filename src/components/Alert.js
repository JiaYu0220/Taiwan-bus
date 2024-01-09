import Swal from "sweetalert2";
const successToast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1000,
  icon: "success",
});
const confirmSwal = Swal.mixin({
  showCancelButton: true,
  confirmButtonColor: "#1CC8EE",
  cancelButtonColor: "#414242",
  confirmButtonText: "確定",
});
const errorSwal = Swal.mixin({
  icon: "error",
  confirmButtonColor: "#1CC8EE",
  confirmButtonText: "好的",
});

const myAlert = {
  miniToast(title) {
    return successToast.fire({
      title,
    });
  },
  confirmModal(title) {
    return confirmSwal.fire({
      title,
    });
  },
  errorModal(text = `發生錯誤，請稍後再試！`) {
    return errorSwal.fire({
      html: text,
    });
  },
};

export { myAlert };
