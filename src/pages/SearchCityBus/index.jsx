import React, { useEffect, useState } from "react";
import {
  faHeart as fasFaHeart,
  faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import CityBusPanel from "./components/CityBusPanel";
import BackHome from "../../components/BackHome";
import SearchBar from "../../components/Inputs";
import CityBusSearchResult from "./components/CityBusSearchResult";
import { LinkIcon } from "../../components/Buttons";
import Loading from "../../components/Loading";
import { Container } from "react-bootstrap";

const SearchCityBus = ({ city, setCity }) => {
  const [busData, setBusData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  // 初始化 city
  useEffect(() => {
    setCity({
      tw: "",
      en: "",
    });
  }, []);

  return (
    <>
      <Container>
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
                <LinkIcon
                  className={"bg-primary"}
                  icon={faHeartCirclePlus}
                  to={"/MyFollowing"}
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
        <div className="mt-24 mt-sm-32 mt-lg-0 ms-lg-100 flex-grow-1 d-flex flex-column vh-100">
          <h1 className="fs-6 fs-lg-5 mb-2 pt-lg-7">
            {city.tw ? city.tw : "請先選擇縣市"}
          </h1>
          {isLoading ? (
            <Loading />
          ) : (
            <CityBusSearchResult busData={busData} city={city} />
          )}
        </div>
      </Container>
    </>
  );
};

export default SearchCityBus;
