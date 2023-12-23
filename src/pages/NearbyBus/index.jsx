import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { LinkIcon } from "../../components/Buttons";
import BackHome from "../../components/BackHome";
import { Col, Container, Nav, Row } from "react-bootstrap";
import {
  faChevronLeft,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { getStoredItem } from "../../global/storage";
import {
  getCityBusStop,
  getCityBusArrival,
  getArrivalPlateNum,
  getBusInfo,
  getBusRealTimeByFrequency,
} from "../../global/api";
import MyNavbar from "../../components/MyNavbar";

const NearbyBus = () => {
  return (
    <div className="d-flex flex-column vh-100">
      <Container>
        <MyNavbar />
      </Container>
    </div>
  );
};

export default NearbyBus;
