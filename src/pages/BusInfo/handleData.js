import {
  getCityBusStop,
  getCityBusArrival,
  getArrivalPlateNum,
  getBusInfo,
  getBusRealTimeByFrequency,
} from "../../global/api";
let bus = {
  //站牌順序
  stopData: null,
  //到站時間(站牌順序不準)
  arrivalData: null,
  // 到站公車車牌
  plateNumData: null,
  // 到站公車資訊
  busInfoData: null,
  // 公車動態位置資料
  busPositionData: null,
};

async function getData(selectedBus) {
  if (!bus.stopData) {
    // 站牌
    bus.stopData = await getCityBusStop(selectedBus);
  }
  // 抵達時間
  bus.arrivalData = await getCityBusArrival(selectedBus);
  //車牌
  bus.plateNumData = await getArrivalPlateNum(selectedBus);

  let plateNumArr = [];
  // 取得公車是否有斜坡(輪椅友善)資料、公車位置
  if (bus.plateNumData.length) {
    bus.plateNumData.forEach((plateItem) => {
      plateNumArr.push(`PlateNumb%20eq%20%27${plateItem.PlateNumb.trim()}%27`);
    });
    // 輪椅
    bus.busInfoData = await getBusInfo(selectedBus, plateNumArr);
    // 公車位置
    bus.busPositionData = await getBusRealTimeByFrequency(
      selectedBus,
      plateNumArr
    );
  }
}

function handleData() {
  // 處裡往返兩方向的資料
  bus.stopData.forEach((directionItem, index) => {
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
      if (bus.plateNumData.length) {
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
  return bus;
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
  const plateNumbObj = bus.plateNumData.find(
    (plateItem) =>
      stopUID === plateItem.StopUID && direction === plateItem.Direction
  );
  return plateNumbObj ? plateNumbObj.PlateNumb : null;
}

//站牌是否同側
function findIsStopSameSide(direction, stopUID, stationID) {
  const oppositeStop = bus.stopData[direction ? 0 : 1].Stops.find(
    (oppositeItem) => stopUID === oppositeItem.StopUID
  );
  return stationID === oppositeStop?.StationID ? true : false;
}

//站牌順序加入到站時間
function findArrivalStatus(direction, stopUID) {
  const arrivalObj = bus.arrivalData.find(
    (arrivalItem) =>
      arrivalItem.StopUID === stopUID &&
      (arrivalItem.Direction === direction ||
        (arrivalItem.Direction !== 0 && arrivalItem.Direction !== 1)) // 有些資料的 Direction 數字不是1或0
  );

  const result = arrivalObj
    ? {
        time: Number(arrivalObj.EstimateTime),
        status: arrivalObj.StopStatus,
      }
    : // 若 undefined 就當作未發車
      {
        time: 0,
        status: 1,
      };
  return result || null;
}

// 輪椅
function findHasLiftOrRamp(plateNumb) {
  const hasLiftOrRampObj = bus.busInfoData.find(
    (infoItem) => infoItem.PlateNumb === plateNumb
  );
  return hasLiftOrRampObj ? hasLiftOrRampObj.HasLiftOrRamp : null;
}

// 公車位置
function findBusPosition(plateNumb) {
  const busPositionObj = bus.busPositionData.find(
    (positionItem) => positionItem.PlateNumb === plateNumb
  );
  return busPositionObj ? busPositionObj.BusPosition : null;
}

export { getData, handleData };
