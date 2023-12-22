import axios from "axios";
const { VITE_APP_SITE } = import.meta.env;
import {
  getTdxToken,
  getCookies,
  getCookieToken,
} from "./getAuthorizationHeader";

// 取得公車站牌
const getCityBusStop = async (selectedBus) => {
  try {
    // 取得存在 cookies 的 token
    let tdxToken = await getCookieToken();
    const url = `${VITE_APP_SITE}/StopOfRoute/City/${selectedBus.city.en}/${selectedBus.routeName}?%24filter=routeUID%20eq%20%27${selectedBus.routeUID}%27&%24format=JSON`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${tdxToken}`,
      },
    });
    return data;
  } catch (error) {
    console.log("getCityBusStop", error);
  }
};

// 取得公車到達時間
const getCityBusArrival = async (selectedBus) => {
  try {
    // 取得存在 cookies 的 token
    let tdxToken = await getCookieToken();
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

// 取得車牌
const getArrivalPlateNum = async (selectedBus) => {
  try {
    // 取得存在 cookies 的 token
    let tdxToken = await getCookieToken();
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

// 取得指定公車資訊
const getBusInfo = async (selectedBus, PlateNumArr) => {
  try {
    // 取得存在 cookies 的 token
    let tdxToken = await getCookieToken();
    PlateNumArr = PlateNumArr.join("%20or%20");
    const url = `${VITE_APP_SITE}/Vehicle/City/${selectedBus.city.en}?%24filter=${PlateNumArr}&%24format=JSON`;

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

// 取得指定公車動態定時資料
const getBusRealTimeByFrequency = async (selectedBus, PlateNumArr) => {
  try {
    // 取得存在 cookies 的 token
    let tdxToken = await getCookieToken();
    PlateNumArr = PlateNumArr.join("%20or%20");
    const url = `${VITE_APP_SITE}/RealTimeByFrequency/City/${selectedBus.city.en}?%24filter=${PlateNumArr}&%24format=JSON`;
    console.log(url);

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${tdxToken}`,
      },
    });

    return data;
  } catch (error) {
    console.log("getBusRealTimeByFrequency", error);
  }
};

export {
  getCityBusStop,
  getCityBusArrival,
  getArrivalPlateNum,
  getBusInfo,
  getBusRealTimeByFrequency,
};
