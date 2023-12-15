import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { LinkIcon } from "../../components/Buttons";
import BackHome from "../../components/BackHome";
import { Col, Container, Nav, Row } from "react-bootstrap";
import {
  faChevronLeft,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { getStoredItem } from "../../global/storage";

import BusArrivalTime from "./components/BusArrivalTime";

const BusInfo = () => {
  const [stopData, setStopData] = useState({
    stop1: [
      {
        Direction: 0, //item.Direction (0去左，1反右)
        StopName: "", //item.stopName.Zh_tw
        StationID: "", //item.Station 相同代表往返站牌同側

        bus: [
          {
            StopStatus: 1, //尚未發車
            EstimateTime: 300, //預估到站(秒)
          },
        ],
      },
    ],
  });
  const [selectedBus, setSelectedBus] = useState(getStoredItem("select"));
  console.log("selectedBus", selectedBus);

  // const getCityBusArrival = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${VITE_APP_SITE}/EstimatedTimeOfArrival/City/${url.city.en}/${url.routeName}?%24top=10&%24format=JSON`,
  //       {
  //         headers: getAuthorizationHeader(),
  //       }
  //     );
  //     setArrivalData(res);
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <Container>
        {/* header */}
        <div className="d-flex justify-content-between align-items-center my-6">
          <LinkIcon icon={faChevronLeft} to={"/SearchCityBus"} />

          <BackHome />
          <LinkIcon icon={faMapLocationDot} />
        </div>
        <Row className="justify-content-center">
          <Col sm={6}>
            <Nav justify variant="underline" activeKey={"forth"}>
              <Nav.Item>
                <Nav.Link eventKey="forth">
                  <span className="text-primary">往 </span>
                  {selectedBus.forth}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="back">
                  <span className="text-primary">往 </span>
                  {selectedBus.back}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
      <BusArrivalTime selectedBus={selectedBus} />
    </>
  );
};

export default BusInfo;
