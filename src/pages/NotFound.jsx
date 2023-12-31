import React from "react";
import { Container } from "react-bootstrap";
import MyNavbar from "../components/MyNavbar";

const NotFound = () => {
  return (
    <Container>
      <MyNavbar />
      <div className="d-flex flex-column align-items-center pt-8">
        <div className="w-50 w-lg-25 mb-5 ">
          <img
            className="img-fluid"
            src="404-page-not-found.svg"
            alt="404 page not found"
          />
        </div>
        <h2 className="mb-3">找不到頁面！</h2>
        <p className="fs-md-4 text-center">
          非常抱歉，您目前訪問的頁面出現問題
          <br />
          請嘗試重新刷新頁面或點擊按鈕返回首頁
        </p>
      </div>
    </Container>
  );
};

export default NotFound;
