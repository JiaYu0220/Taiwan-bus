import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as fasFaHeart,
  faLocationDot,
  faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farFaHeart } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import CityBusPanel from "./components/CityBusPanel";
import BackHome from "../../components/BackHome";
import Loading from "../../components/Loading";
import SearchBar from "../../components/Inputs";
import CardListLink from "../../components/Cards";
import CityBusSearchResult from "./components/CityBusSearchResult";
import { BtnIcon, BtnTextLight } from "../../components/Buttons";
const { VITE_APP_SITE } = import.meta.env;

const SearchCityBus = ({ city, setCity }) => {
  const [busData, setBusData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  // let getDataTimes = 1;
  // let top = 30 * getDataTimes;
  // let skip = top - 30;
  // window.addEventListener("scroll", function () {
  //   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //     getDataTimes++;
  //     getBusData(top, skip);
  //     console.log("已滚动到页面底部");
  //   }
  // });

  return (
    <>
      <div className="container">
        {/* 搜尋 */}
        <div>
          {/* input */}
          <div className="position-fixed top-0">
            <div className="w-100 w-lg-360px shadow-dark shadow-lg-none py-4 py-sm-6 pb-lg-4">
              <div className="d-flex align-items-center">
                <div className="me-3 me-lg-2">
                  <BackHome />
                </div>
                <SearchBar
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                />
                <BtnIcon
                  className={"bg-primary text-light"}
                  icon={faHeartCirclePlus}
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
          />
        </div>

        {/* 搜尋結果 */}
        <div className="mt-24 mt-sm-32 mt-lg-0 ms-lg-100 flex-grow-1">
          <h1 className="fs-6 fs-lg-5 mb-2 pt-lg-7">
            {city.tw ? city.tw : "請先選擇縣市"}
          </h1>
          <CityBusSearchResult
            busData={busData}
            isLoading={isLoading}
            city={city}
          />
        </div>
      </div>
    </>
  );
};

export default SearchCityBus;
