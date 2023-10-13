import React from "react";

const TextLightBtn = ({ onClick, children }) => {
  return (
    <button
      type="button"
      className={"w-100 btn btn-outline-primary text-light shadow fs-lg-6"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default TextLightBtn;
