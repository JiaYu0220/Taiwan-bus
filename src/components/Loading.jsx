import React from "react";
const Loading = ({ isLoading }) => {
  return isLoading ? (
    <div className="d-flex flex-grow-1 justify-content-center align-items-center h-100">
      <img src="../../Spinner.svg" alt="" />
    </div>
  ) : null;
};

export default Loading;
