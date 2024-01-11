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
    //計算距離上次呼叫api過幾秒
    const addSec = setInterval(() => {
      setSec((prevSec) => {
        // 20 秒取一次 api
        if (prevSec === 19) {
          initData();
          return 0; // 歸零
        } else {
          return prevSec + 1; // 遞增
        }
      });
    }, 1000);

    return () => {
      clearInterval(addSec);
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
