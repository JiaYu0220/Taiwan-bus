import React from "react";
import { useLocation } from "react-router-dom";
import { LinkIcon } from "./Buttons";
import BackHome from "./BackHome";
import {
  faChevronLeft,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";

const MyNavbar = () => {
  const location = useLocation();

  return (
    <Row className="justify-content-between align-items-center my-6">
      <Col className="text-start">
        <LinkIcon icon={faChevronLeft} to={-1} />
      </Col>
      <Col xs={6} className="text-center">
        <BackHome />
      </Col>
      <Col className="text-end">
        <LinkIcon
          className={
            location.pathname === "/BusInfo/BusArrivalMap" ? "d-none" : ""
          }
          icon={faMapLocationDot}
          to={"BusArrivalMap"}
        />
      </Col>
    </Row>
  );
};

export default MyNavbar;
