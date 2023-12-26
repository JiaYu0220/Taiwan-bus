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
  getNearbyStationData,
} from "../../global/api";
import MyNavbar from "../../components/MyNavbar";
import NearbyBusMap from "./components/NearbyBusMap";
import NearbyBusList from "./components/NearbyBusList";

const NearbyBus = () => {
  const [position, setPosition] = useState(null);
  const [center, setCenter] = useState(null);
  const [stationData, setStationData] = useState([]);

  useEffect(() => {
    position && setData();
  }, [position]);

  async function setData() {
    const data = await getNearbyStationData(position.lat, position.lng, 500);
    setStationData(data);
  }

  return (
    <div className="d-flex flex-column vh-100 ">
      <MyNavbar />

      <Container className="flex-grow-1" fluid>
        <Row className=" h-50 h-md-100 position-relative">
          <Col
            md={6}
            lg={5}
            className="overflow-auto position-sticky start-0 top-0 vh-md-100-minus-navbar vh-50-minus-navbar"
          >
            <NearbyBusList
              stationData={stationData}
              setCenter={setCenter}
              className=""
            />
          </Col>
          <Col md={6} lg={7} className="h-100">
            <NearbyBusMap
              position={position}
              setPosition={setPosition}
              stationData={stationData}
              center={center}
              setCenter={setCenter}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NearbyBus;
