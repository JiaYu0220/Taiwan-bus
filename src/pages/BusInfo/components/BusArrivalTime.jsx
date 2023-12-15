import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheelchair } from "@fortawesome/free-solid-svg-icons";
import { Badge, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
const { VITE_APP_SITE } = import.meta.env;
import {
  getTdxToken,
  getCookies,
} from "../../../global/getAuthorizationHeader";
// 1:06:00
const BusArrivalTime = ({ selectedBus }) => {
  const [frontStops, setFrontStops] = useState([]);
  const [sec, setSec] = useState(0);
  let getApiTime = 0;
  let allStopData = [];
  //站牌順序
  let stopData;
  //到站時間(站牌順序不準)
  let arrivalData;
  // 到站公車車牌
  let plateNumData;
  // 到站公車資訊
  let busInfoData;

  const getCityBusStop = async () => {
    try {
      let tdxToken = getCookies("tdxToken");

      if (!tdxToken) {
        await getTdxToken();
        tdxToken = getCookies("tdxToken"); // 更新token
        console.log("get NewToken");
      }
      const url = `${VITE_APP_SITE}/StopOfRoute/City/${selectedBus.city.en}/${selectedBus.routeName}?%24filter=routeUID%20eq%20%27${selectedBus.routeUID}%27&%24format=JSON`;

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${tdxToken}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log("getCityBusStop", error);
    }
  };
  const getCityBusArrival = async () => {
    try {
      let tdxToken = getCookies("tdxToken");

      if (!tdxToken) {
        await getTdxToken();
        tdxToken = getCookies("tdxToken"); // 更新token
        console.log("get NewToken");
      }
      // 有把 PlateNumb = -1 篩掉
      const url = `${VITE_APP_SITE}/EstimatedTimeOfArrival/City/${selectedBus.city.en}/${selectedBus.routeName}?&%24filter=PlateNumb%20ne%20%27-1%27%20and%20RouteUID%20eq%20%27${selectedBus.routeUID}%27&%24format=JSON`;

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${tdxToken}`,
        },
      });

      return data;
    } catch (error) {
      console.log("getCityBusArrival", error);
    }
  };

  const getArrivalPlateNum = async () => {
    try {
      let tdxToken = getCookies("tdxToken");

      if (!tdxToken) {
        await getTdxToken();
        tdxToken = getCookies("tdxToken"); // 更新token
        console.log("get NewToken");
      }
      const url = `${VITE_APP_SITE}/RealTimeNearStop/City/${selectedBus.city.en}/${selectedBus.routeName}?&%24filter=routeUID%20eq%20%27${selectedBus.routeUID}%27&%24format=JSON`;

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${tdxToken}`,
        },
      });

      return data;
    } catch (error) {
      console.log("getCityBusArrival", error);
    }
  };

  const getBusInfo = async (PlateNumArr) => {
    try {
      let tdxToken = getCookies("tdxToken");

      if (!tdxToken) {
        await getTdxToken();
        tdxToken = getCookies("tdxToken"); // 更新token
        console.log("get NewToken");
      }
      PlateNumArr = PlateNumArr.join("%20or%20");
      const url = `${VITE_APP_SITE}/Vehicle/City/${selectedBus.city.en}?%24filter=${PlateNumArr}&%24top=20&%24format=JSON`;
      console.log("輪椅", url);

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${tdxToken}`,
        },
      });

      return data;
    } catch (error) {
      console.log("getCityBusArrival", error);
    }
  };

  async function handleStopData() {
    // setIsLoading(true);
    let plateNumArr = [];
    if (!stopData) {
      stopData = await getCityBusStop();
      console.log("站牌", stopData[0].Stops);
    }
    arrivalData = await getCityBusArrival();
    console.log("抵達時間", arrivalData);
    plateNumData = await getArrivalPlateNum();
    console.log("車牌", plateNumData);

    // 取得公車是否有斜坡(輪椅友善)資料
    if (plateNumData.length) {
      plateNumData.forEach((plateItem) => {
        plateNumArr.push(
          `PlateNumb%20eq%20%27${plateItem.PlateNumb.trim()}%27`
        );
      });
      busInfoData = await getBusInfo(plateNumArr);
      console.log("輪椅", busInfoData);
    }

    stopData[0].Stops.forEach((stopItem) => {
      //清空上一次資料
      stopItem.EstimateTime = "";
      stopItem.StopStatus = "";
      stopItem.PlateNumb = "";
      stopItem.HasLiftOrRamp = "";

      //站牌是否同側
      stopData[1].Stops.forEach((oppositeItem) => {
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
          arrivalItem.Direction === 0
        ) {
          // 若有資料且原本時間<新時間 -> 不更新
          // if (
          //   stopItem.StopStatus &&
          //   Number(stopItem.EstimateTime) < Number(arrivalItem.EstimateTime)
          // ) {
          //   return;
          // }
          stopItem.EstimateTime = Number(arrivalItem.EstimateTime);
          stopItem.StopStatus = arrivalItem.StopStatus;
        }
      });
      if (plateNumData.length) {
        //列出到站公車的車牌
        plateNumData.forEach((plateItem) => {
          if (
            stopItem.StopUID === plateItem.StopUID &&
            plateItem.Direction === 0
          ) {
            stopItem.PlateNumb = plateItem.PlateNumb;
          }
        });

        // 列出到站公車的資訊
        busInfoData.forEach((busInfoItem) => {
          if (stopItem.PlateNumb === busInfoItem.PlateNumb) {
            stopItem.HasLiftOrRamp = busInfoItem.HasLiftOrRamp;
          }
        });
      }
    });

    setFrontStops(stopData[0].Stops);
    console.log(frontStops);
    // setIsLoading(false);
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

    //每60秒重新呼叫api
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

  // console.log(frontStops);
  return (
    <>
      <div className="bg-gray">
        <Container>
          <Row className="justify-content-center">
            <Col sm={8}>
              <p className="text-end text-primary my-4">*於 {sec} 秒前更新</p>
              <ul className="list-unstyled d-flex flex-column gap-4 mb-5">
                {frontStops ? (
                  frontStops.map((stop) => {
                    return (
                      <li
                        key={stop.StopUID}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <p className="text-primary">
                          {stop.EstimateTime > 0 && stop.EstimateTime < 60 ? (
                            <Badge
                              bg="primary"
                              text="dark"
                              className="me-3 w-80px"
                            >
                              進站中
                            </Badge>
                          ) : stop.EstimateTime >= 60 &&
                            stop.EstimateTime < 180 ? (
                            <Badge
                              bg="transparent"
                              text="light"
                              className="me-3 w-80px border border-primary shadow"
                            >
                              {Math.floor(parseFloat(stop.EstimateTime) / 60)}{" "}
                              分
                            </Badge>
                          ) : stop.EstimateTime >= 180 ? (
                            <Badge
                              bg="transparent"
                              text="primary"
                              className="me-3 w-80px border border-primary shadow"
                            >
                              {Math.floor(parseFloat(stop.EstimateTime) / 60)}{" "}
                              分
                            </Badge>
                          ) : stop.StopStatus === 4 ? (
                            <Badge
                              bg="dark"
                              text="gray-light"
                              className="me-3 w-80px"
                            >
                              今日停駛
                            </Badge>
                          ) : stop.StopStatus === 3 ? (
                            <Badge
                              bg="dark"
                              text="gray-light"
                              className="me-3 w-80px"
                            >
                              末班駛離
                            </Badge>
                          ) : (
                            //   stop.StopStatus === 1
                            <Badge
                              bg="gray-light"
                              text="light"
                              className="me-3 w-80px"
                            >
                              未發車
                            </Badge>
                          )}
                          {stop.StopName.Zh_tw}
                          <span className="text-light fs-7 fw-lighter ms-1">
                            {stop.isStopSameSide ? "(往返站牌同側)" : ""}
                          </span>
                        </p>
                        <div className="d-flex align-items-center gap-3">
                          <p className="text-primary">
                            <FontAwesomeIcon
                              className={`fs-4 me-1 ${
                                !stop.HasLiftOrRamp ? `d-none` : ``
                              }`}
                              icon={faWheelchair}
                            ></FontAwesomeIcon>
                            {stop.PlateNumb}
                          </p>
                          <div
                            className={`dot ${stop.PlateNumb ? `active` : ``}`}
                          ></div>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <p className="text-primary">沒有可用的數據</p>
                )}
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default BusArrivalTime;
