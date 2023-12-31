import React from "react";

const EmptyMessage = ({ text }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100">
      <div className="w-50 w-lg-25 mb-4">
        <img className="img-fluid  rounded-circle" src="empty.svg" alt="" />
      </div>
      <p className="fs-5 fs-lg-4">{text}</p>
    </div>
  );
};

export default EmptyMessage;
