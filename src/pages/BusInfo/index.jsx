import React, { useEffect, useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import { getStoredItem } from "../../global/storage";
import {
  getCityBusStop,
  getCityBusArrival,
  getArrivalPlateNum,
  getBusInfo,
  getBusRealTimeByFrequency,
} from "../../global/api";
import InfoNavbar from "./components/InfoNavbar";
import { Container } from "react-bootstrap";

export const StopsContext = createContext([]);

const BusInfo = () => {
  const [selectedBus, setSelectedBus] = useState(getStoredItem("select"));
  const [direction, setDirection] = useState(0);
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

  useEffect(() => {
    initData();

    //取得呼叫api時間
    getApiTime = new Date().getTime();

    //計算距離上次呼叫api過幾秒
    const addSec = setInterval(() => {
      let nowTime = new Date().getTime();
      setSec(Math.floor((nowTime - getApiTime) / 1000));
    }, 1000);

    //每30秒重新呼叫api
    const intervalGetApi = setInterval(() => {
      initData();
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

  // 整理公車資料
  async function initData() {
    await getData();
    handleData();
    setStops([...stopData]);
    console.log("渲染資料", stopData);
  }
  async function getData() {
    if (!stopData) {
      stopData = await getCityBusStop(selectedBus);
      console.log("站牌", stopData[direction].Stops);
    }
    arrivalData = await getCityBusArrival(selectedBus);
    console.log("抵達時間", arrivalData);
    plateNumData = await getArrivalPlateNum(selectedBus);
    console.log("車牌", plateNumData);

    let plateNumArr = [];
    // 取得公車是否有斜坡(輪椅友善)資料、公車位置
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
  }

  function handleData() {
    // 處裡往返兩方向的資料
    stopData.forEach((directionItem, index) => {
      directionItem.Stops.forEach((stopItem) => {
        //清空上一次資料
        clearData(stopItem);

        const { StopUID, StationID } = stopItem;
        //站牌是否同側
        stopItem.isStopSameSide = findIsStopSameSide(index, StopUID, StationID);

        // 加入到站時間、到站狀態
        const { time, status } = findArrivalStatus(index, StopUID);
        stopItem.EstimateTime = time;
        stopItem.StopStatus = status;

        // 若現在有公車
        if (plateNumData.length) {
          // 列出所有到站公車的車牌
          stopItem.PlateNumb = findPlateNum(StopUID, index);

          // 若該站有公車，加入輪椅資訊和公車位置
          if (stopItem.PlateNumb) {
            // 輪椅
            stopItem.HasLiftOrRamp = findHasLiftOrRamp(stopItem.PlateNumb);
            // 公車位置
            stopItem.BusPosition = findBusPosition(stopItem.PlateNumb);
          }
        }
      });
    });
  }

  //清空上一次資料
  function clearData(stopItem) {
    stopItem.EstimateTime = "";
    stopItem.StopStatus = "";
    stopItem.PlateNumb = "";
    stopItem.HasLiftOrRamp = "";
    stopItem.BusPosition = "";
    stopItem.isStopSameSide = "";
  }

  //列出到站公車的車牌
  function findPlateNum(stopUID, direction) {
    const plateNumbObj = plateNumData.find(
      (plateItem) =>
        stopUID === plateItem.StopUID && direction === plateItem.Direction
    );
    return plateNumbObj ? plateNumbObj.PlateNumb : null;
  }

  //站牌是否同側
  function findIsStopSameSide(direction, stopUID, stationID) {
    const oppositeStop = stopData[direction ? 0 : 1].Stops.find(
      (oppositeItem) => stopUID === oppositeItem.StopUID
    );
    return stationID === oppositeStop?.StationID ? true : false;
  }

  //站牌順序加入到站時間
  function findArrivalStatus(direction, stopUID) {
    const arrivalObj = arrivalData.find(
      (arrivalItem) =>
        arrivalItem.StopUID === stopUID && arrivalItem.Direction === direction
    );
    const result = {
      time: Number(arrivalObj.EstimateTime),
      status: arrivalObj.StopStatus,
    };
    return result;
  }

  // 輪椅
  function findHasLiftOrRamp(plateNumb) {
    const hasLiftOrRampObj = busInfoData.find(
      (infoItem) => infoItem.PlateNumb === plateNumb
    );
    return hasLiftOrRampObj ? hasLiftOrRampObj.HasLiftOrRamp : null;
  }

  // 公車位置
  function findBusPosition(plateNumb) {
    const busPositionObj = busPositionData.find(
      (positionItem) => positionItem.PlateNumb === plateNumb
    );
    return busPositionObj ? busPositionObj.BusPosition : null;
  }

  return (
    <Container>
      <div className="d-flex flex-column vh-100">
        <InfoNavbar
          setDirection={setDirection}
          direction={direction}
          selectedBus={selectedBus}
        />
        <Outlet context={[direction, stops, sec]} />
      </div>
    </Container>
  );
};

export default BusInfo;
