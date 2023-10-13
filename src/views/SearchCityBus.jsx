import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as fasFaHeart,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farFaHeart } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import jsSHA from "jssha";
import CityBusPanel from "../components/CityBusPanel";
import BackHome from "../components/BackHome";
import Loading from "../components/Loading";
import SearchBar from "../components/Inputs";
import CardListLink from "../components/Cards";
const { VITE_APP_SITE } = import.meta.env;

const SearchCityBus = () => {
  const [searchInput, setSearchInput] = useState("");
  const [city, setCity] = useState({
    tw: "",
    en: "",
  });
  const [busData, setBusData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // input搜尋
  useEffect(() => {
    if (searchInput) {
      (async () => {
        try {
          setIsLoading(true);
          const { data } = await axios.get(
            `${VITE_APP_SITE}/Route/City/${city.en}/${searchInput}?%24orderby=RouteName%2FZh_tw&%24top=30&%24format=JSON`,
            {
              headers: getAuthorizationHeader(),
            }
          );
          setIsLoading(false);
          setBusData(data);
        } catch (error) {
          console.log("searchCityBus", error);
        }
      })();
    }
  }, [searchInput]);

  // API 認證
  const getAuthorizationHeader = () => {
    // 自己 ID、KEY
    const AppID = "alice49885-93ea6fa2-b1be-42fa";
    const AppKey = "1fc51d3d-3f92-4465-a54d-342641acee30";
    // 拿到日期的 GMT String
    let GMTString = new Date().toGMTString();
    // 創建一個用於SHA-1雜湊的物件
    let ShaObj = new jsSHA("SHA-1", "TEXT");
    // 設置HMAC密鑰為AppKey
    ShaObj.setHMACKey(AppKey, "TEXT");
    // 更新HMAC的內容，包括"x-date"標頭和GMT時間字串
    ShaObj.update("x-date: " + GMTString);
    // 獲取HMAC的結果，以Base64編碼的字串形式
    let HMAC = ShaObj.getHMAC("B64");
    // 構建授權 header
    let Authorization =
      'hmac username="' +
      AppID +
      '", algorithm="hmac-sha1", headers="x-date", signature="' +
      HMAC +
      '"';
    return { Authorization: Authorization, "X-Date": GMTString };
  };

  return (
    <>
      <div className="container">
        {/* 搜尋 */}
        <div>
          {/* input */}
          <div className="position-fixed top-0">
            <div className="w-100 w-lg-360px shadow-dark shadow-lg-none py-4 py-sm-6 pb-lg-4">
              <div className="d-flex">
                <div className="me-3 me-lg-2">
                  <BackHome />
                </div>
                <SearchBar
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                />
              </div>
            </div>
          </div>
          {/* 鍵盤 */}
          <CityBusPanel
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            city={city}
            setCity={setCity}
            busData={busData}
            setBusData={setBusData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            getAuthorizationHeader={getAuthorizationHeader}
          />
        </div>

        {/* 搜尋結果 */}
        <div className="mt-24 mt-sm-32 mt-lg-0 ms-lg-100 flex-grow-1">
          <h1 className="fs-6 fs-lg-5 mb-2 pt-lg-7">
            {city.tw ? city.tw : "請先選擇縣市"}
          </h1>
          {busData ? (
            <>
              <Loading isLoading={isLoading} />
              <ul className="list-unstyled">
                {busData.map((item) => {
                  return (
                    <CardListLink
                      key={item.RouteUID}
                      title={item.RouteName.Zh_tw}
                      text={
                        <>
                          {item.DepartureStopNameZh}
                          <span className="text-primary"> 往 </span>
                          {item.DestinationStopNameZh}
                        </>
                      }
                    />
                  );
                })}
              </ul>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchCityBus;
