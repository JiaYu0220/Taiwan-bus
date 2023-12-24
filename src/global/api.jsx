import axios from "axios";
const { VITE_APP_SITE } = import.meta.env;
import {
  getTdxToken,
  getCookies,
  getCookieToken,
} from "./getAuthorizationHeader";

/*** 公車號碼 ***/
// 找該縣市的所有公車
async function getCityAllBus(city) {
  try {
    // 取得存在 cookies 的 token
    let tdxToken = await getCookieToken();
    const { data } = await axios.get(
      `${VITE_APP_SITE}/Route/City/${city}?%24orderby=RouteName%2FZh_tw&%24top=30&%24format=JSON`,
      {
        headers: {
          Authorization: `Bearer ${tdxToken}`,
          "Content-Encoding": "br,gzip", //呼叫歷史資料類型API時，使用此設定將可大幅降低資料傳輸時間
        },
      }
    );

    //有一樣的 RouteName 時，要特別標出來，因為卡片標題需特別新增補充名稱，如基隆
    data.forEach((item, index, array) => {
      console.log(array[index + 1]);
      if (
        array[index + 1] &&
        item.RouteName.Zh_tw === array[index + 1].RouteName.Zh_tw
      ) {
        item.isSameName = true;
        array[index + 1].isSameName = true;
      } else if (!item.isSameName) {
        item.isSameName = false;
      }
    });
    console.log(data);

    return data;
  } catch (error) {
    console.log("searchCityBus", error);
  }
}

// 找指定縣市、公車號碼的公車
async function getBusData(city, routeName) {
  try {
    // 取得存在 cookies 的 token
    let tdxToken = await getCookieToken();
    const { data } = await axios.get(
      `${VITE_APP_SITE}/Route/City/${city}/${routeName}?%24orderby=RouteName%2FZh_tw&%24top=30&%24format=JSON`,
      {
        headers: {
          Authorization: `Bearer ${tdxToken}`,
          "Content-Encoding": "br,gzip", //呼叫歷史資料類型API時，使用此設定將可大幅降低資料傳輸時間
        },
      }
    );
    return data;
  } catch (error) {
    console.log("getBusData", error);
  }
}

/*** 公車資訊 ***/

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
  getCityAllBus,
  getBusData,
  getCityBusStop,
  getCityBusArrival,
  getArrivalPlateNum,
  getBusInfo,
  getBusRealTimeByFrequency,
};
