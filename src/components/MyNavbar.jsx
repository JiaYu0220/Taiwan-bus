import React from "react";
import { useLocation } from "react-router-dom";
import { LinkIcon } from "./Buttons";
import BackHome from "./BackHome";
import {
  faChevronLeft,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row } from "react-bootstrap";

const MyNavbar = () => {
  const location = useLocation();

  return (
    <div className="mb-26">
      <header className="position-fixed top-0 start-0 end-0 w-100 mb-26 bg-dark z-3">
        <Container className="">
          <Row className=" justify-content-between align-items-center my-6">
            <Col className="text-start">
              <LinkIcon icon={faChevronLeft} to={-1} />
            </Col>
            <Col xs={6} className="text-center">
              <BackHome />
            </Col>
            <Col className="text-end">
              <LinkIcon
                className={location.pathname === "/BusInfo" ? "" : "d-none"}
                icon={faMapLocationDot}
                to={"BusArrivalMap"}
              />
              <p className={location.pathname === "/NearbyBus" ? "" : "d-none"}>
                我的附近
              </p>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
};

export default MyNavbar;
