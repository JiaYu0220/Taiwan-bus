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
import {
  getCityBusStop,
  getCityBusArrival,
  getArrivalPlateNum,
  getBusInfo,
  getBusRealTimeByFrequency,
} from "../../global/api";

import BusArrivalTime from "./components/BusArrivalTime";
import BusArrivalMap from "./components/BusArrivalMap";
import { createContext } from "react";

export const StopsContext = createContext([]);

const BusInfo = () => {
  const [selectedBus, setSelectedBus] = useState(getStoredItem("select"));
  const [direction, setDirection] = useState(getStoredItem("direction"));
  const [stops, setStops] = useState([]);
  const [sec, setSec] = useState(0);
  //呼叫api時間
  let getApiTime = 0;
  //站牌順序
  let stopData;
  //到站時間(站牌順序不準)
  let arrivalData;
  // 到站公車車牌
  let plateNumData;
  // 到站公車資訊
  let busInfoData;
  // 公車動態位置資料
  let busPositionData;

  // 整理抵達時間資料
  async function handleStopData() {
    let plateNumArr = [];
    if (!stopData) {
      stopData = await getCityBusStop(selectedBus);
      console.log("站牌", stopData[direction].Stops);
    }
    arrivalData = await getCityBusArrival(selectedBus);
    console.log("抵達時間", arrivalData);
    plateNumData = await getArrivalPlateNum(selectedBus);
    console.log("車牌", plateNumData);

    // 取得公車是否有斜坡(輪椅友善)資料
    if (plateNumData.length) {
      plateNumData.forEach((plateItem) => {
        plateNumArr.push(
          `PlateNumb%20eq%20%27${plateItem.PlateNumb.trim()}%27`
        );
      });
      busInfoData = await getBusInfo(selectedBus, plateNumArr);
      busPositionData = await getBusRealTimeByFrequency(
        selectedBus,
        plateNumArr
      );

      console.log("輪椅", busInfoData);
      console.log("位置", busPositionData);
    }
    // 處裡往返兩方向的資料
    stopData.forEach((directionItem, index) => {
      directionItem.Stops.forEach((stopItem) => {
        //清空上一次資料
        stopItem.EstimateTime = "";
        stopItem.StopStatus = "";
        stopItem.PlateNumb = "";
        stopItem.HasLiftOrRamp = "";

        //站牌是否同側
        stopData[index ? 0 : 1].Stops.forEach((oppositeItem) => {
          if (stopItem.StopUID === oppositeItem.StopUID) {
            stopItem.StationID === oppositeItem.StationID
              ? (stopItem.isStopSameSide = true)
              : (stopItem.isStopSameSide = false);
          }
        });

        //站牌順序加入到站時間
        arrivalData.forEach((arrivalItem) => {
          if (
            stopItem.StopUID === arrivalItem.StopUID &&
            arrivalItem.Direction === index
          ) {
            stopItem.EstimateTime = Number(arrivalItem.EstimateTime);
            stopItem.StopStatus = arrivalItem.StopStatus;
          }
        });
        if (plateNumData.length) {
          //列出到站公車的車牌
          plateNumData.forEach((plateItem) => {
            if (
              stopItem.StopUID === plateItem.StopUID &&
              plateItem.Direction === index
            ) {
              stopItem.PlateNumb = plateItem.PlateNumb;
            }
          });

          // 列出到站公車的資訊
          busInfoData.forEach((busInfoItem) => {
            // 找出公車現在位置
            let busPosition =
              busPositionData.find(
                (busPositionItem) =>
                  busPositionItem.PlateNumb === busInfoItem.PlateNumb
              ) || null;
            if (stopItem.PlateNumb === busInfoItem.PlateNumb) {
              // 將公車加入是否有輪椅
              stopItem.HasLiftOrRamp = busInfoItem.HasLiftOrRamp;
            }
            // 加入公車現在位置
            busPosition
              ? (stopItem.BusPosition = busPosition.BusPosition)
              : (stopItem.BusPosition = null);
          });
        }
      });
    });
    setStops([...stopData]);
    console.log("渲染資料", stopData);
  }

  useEffect(() => {
    handleStopData();

    //取得呼叫api時間
    getApiTime = new Date().getTime();

    //計算距離上次呼叫api過幾秒
    const addSec = setInterval(() => {
      let nowTime = new Date().getTime();
      setSec(Math.floor((nowTime - getApiTime) / 1000));
    }, 1000);

    //每30秒重新呼叫api
    const intervalGetApi = setInterval(() => {
      handleStopData();
      //取得呼叫api時間
      getApiTime = new Date().getTime();
    }, 30000);

    return () => {
      if (addSec) {
        clearInterval(addSec);
      }
      if (intervalGetApi) {
        clearInterval(intervalGetApi);
      }
    };
  }, []);

  return (
    <div className="d-flex flex-column vh-100">
      <Container>
        {/* header */}
        <div className="d-flex justify-content-between align-items-center my-6">
          <LinkIcon icon={faChevronLeft} to={"/SearchCityBus"} />

          <BackHome />
          <LinkIcon icon={faMapLocationDot} to={"BusArrivalMap"} />
        </div>
        <Row className="justify-content-center">
          <Col sm={6}>
            <Nav
              justify
              variant="underline"
              defaultActiveKey={direction ? "back" : "forth"}
            >
              <Nav.Item>
                <Nav.Link
                  eventKey="forth"
                  onClick={() => {
                    setDirection(0);
                  }}
                >
                  <span className="text-primary">往 </span>
                  {selectedBus.forth}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="back"
                  onClick={() => {
                    setDirection(1);
                  }}
                >
                  <span className="text-primary">往 </span>
                  {selectedBus.back}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>

      <Outlet context={[direction, stops, sec]} />
    </div>
  );
};

export default BusInfo;
