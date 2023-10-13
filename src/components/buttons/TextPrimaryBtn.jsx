import React from "react";

const TextPrimaryBtn = ({ onClick, children }) => {
  return (
    <button
      type="button"
      className={"w-100 btn btn-outline-primary shadow fs-lg-6"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default TextPrimaryBtn;
