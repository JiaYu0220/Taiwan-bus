import React, { useEffect, useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import { getStoredItem } from "../../global/storage";
import InfoNavbar from "./components/InfoNavbar";
import Loading from "../../components/Loading";
import { getData, handleData } from "./handleData";

export const StopsContext = createContext([]);
const BusInfo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBus, setSelectedBus] = useState(getStoredItem("select"));
  const [direction, setDirection] = useState(0);
  const [stops, setStops] = useState([]);
  const [sec, setSec] = useState(0);

  useEffect(() => {
    initData();
    //取得呼叫api時間
    let getApiTime = new Date().getTime();

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
    await getData(selectedBus);
    let bus = handleData();
    // 渲染的資料
    setStops([...bus.stopData]);
    setIsLoading(false);
  }

  return (
    <div className="d-flex flex-column vh-100">
      <InfoNavbar
        setDirection={setDirection}
        direction={direction}
        selectedBus={selectedBus}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <Outlet context={[direction, stops, sec, selectedBus]} />
      )}
    </div>
  );
};

export default BusInfo;
