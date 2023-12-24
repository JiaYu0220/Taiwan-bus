import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  BtnTextPrimary,
  BtnTextLight,
  BtnRadio,
} from "../../../components/Buttons";
import { getBusData, getCityAllBus } from "../../../global/api";

const CityBusPanel = ({
  searchInput,
  setSearchInput,
  city,
  setCity,
  setBusData,
  setIsLoading,
}) => {
  const [togglePanel, setTogglePanel] = useState("city");

  // 鍵盤按鍵資料
  const CityBusPanelData = {
    base: [
      "紅",
      "藍",
      1,
      2,
      3,
      "綠",
      "棕",
      4,
      5,
      6,
      "橘",
      "小",
      7,
      8,
      9,
      "幹線",
      "更多",
      "C",
      0,
    ],
    city: [
      { tw: "臺北市", cityCode: "TPE", en: "Taipei" },
      { tw: "新北市", cityCode: "NWT", en: "NewTaipei" },
      { tw: "基隆市", cityCode: "KEE", en: "Keelung" },
      { tw: "桃園市", cityCode: "TAO", en: "Taoyuan" },
      { tw: "新竹市", cityCode: "HSZ", en: "Hsinchu" },
      { tw: "新竹縣", cityCode: "HSQ", en: "HsinchuCounty" },
      { tw: "苗栗縣", cityCode: "MIA", en: "MiaoliCounty" },
      { tw: "臺中市", cityCode: "TXG", en: "Taichung" },
      { tw: "南投縣", cityCode: "NAN", en: "NantouCounty" },
      { tw: "彰化縣", cityCode: "CHA", en: "ChanghuaCounty" },
      { tw: "雲林縣", cityCode: "YUN", en: "YunlinCounty" },
      { tw: "嘉義市", cityCode: "CYI", en: "Chiayi" },
      { tw: "嘉義縣", cityCode: "CYQ", en: "ChiayiCounty" },
      { tw: "臺南市", cityCode: "TNN", en: "Tainan" },
      { tw: "高雄市", cityCode: "KHH", en: "Kaohsiung" },
      { tw: "屏東縣", cityCode: "PIF", en: "PingtungCounty" },
      { tw: "臺東縣", cityCode: "TTT", en: "TaitungCounty" },
      { tw: "花蓮縣", cityCode: "HUA", en: "HualienCounty" },
      { tw: "宜蘭縣", cityCode: "ILA", en: "YilanCounty" },
      { tw: "澎湖縣", cityCode: "PEN", en: "PenghuCounty" },
      { tw: "金門縣", cityCode: "KIN", en: "KinmenCounty" },
      { tw: "連江縣", cityCode: "LIE", en: "LienchiangCounty" },
    ],
    more: [
      "F",
      "R",
      "T",
      "快",
      "內科",
      "跳蛙",
      "通勤",
      "南軟",
      "先導",
      "夜間",
      "市民",
    ],
  };

  // 鍵盤按鍵事件
  const handlePanelBtn = (e) => {
    const { innerText } = e.target;
    if (innerText === "更多") {
      setTogglePanel("more");
    } else if (innerText === "C") {
      setSearchInput("");
    } else if (innerText.match(/[0-9]/)) {
      setSearchInput(searchInput + innerText);
    } else {
      setSearchInput(innerText);
    }
  };

  // input搜尋
  useEffect(() => {
    if (searchInput) {
      handleSearch();
    }
  }, [searchInput]);

  async function handleCityConfirm() {
    setIsLoading(true);
    setTogglePanel("base");
    const cityData = await getCityAllBus(city.en);
    setBusData(cityData);
    setIsLoading(false);
  }
  async function handleSearch() {
    setIsLoading(true);
    const searchBus = await getBusData(city.en, searchInput);
    setBusData(searchBus);
    setIsLoading(false);
  }

  return (
    <div className="position-fixed bottom-0 start-0 bottom-lg-initial start-lg-initial mt-lg-24 z-2">
      <div className="w-100 w-lg-360px h-lg-550px bg-gray rounded-2 pt-5 pb-6 px-5 pt-sm-6 px-sm-12 pt-lg-5 px-lg-5">
        {togglePanel === "city" ? (
          <ul className="list-unstyled row row-cols-4 g-3 mb-0">
            {/* city togglePanel */}
            {CityBusPanelData.city.map((item, index) => {
              return (
                <li className="col" key={index}>
                  <BtnRadio
                    name="city"
                    id={item.en}
                    htmlFor={item.en}
                    onClick={(e) =>
                      setCity({
                        tw: e.target.innerText,
                        en: e.target.htmlFor,
                      })
                    }
                  >
                    {item.tw}
                  </BtnRadio>
                </li>
              );
            })}
            {/* city 確認 */}
            <li className="col flex-grow-1">
              <BtnTextPrimary onClick={handleCityConfirm}>設定</BtnTextPrimary>
            </li>
          </ul>
        ) : togglePanel === "base" ? (
          <>
            {/* base togglePanel */}
            <ul className="list-unstyled row row-cols-5 g-3 mb-0">
              <li className="col-12">
                <BtnTextLight onClick={() => setTogglePanel("city")}>
                  <FontAwesomeIcon className="me-2" icon={faLocationDot} />
                  <span>選擇縣市</span>
                </BtnTextLight>
              </li>
              {CityBusPanelData.base.map((item, index) => {
                return (
                  <li className="col" key={index}>
                    {Number.isInteger(item) ? (
                      <BtnTextLight onClick={(e) => handlePanelBtn(e)}>
                        {item}
                      </BtnTextLight>
                    ) : (
                      <BtnTextPrimary onClick={(e) => handlePanelBtn(e)}>
                        {item}
                      </BtnTextPrimary>
                    )}
                  </li>
                );
              })}
              {/* backspace */}
              <li className="col">
                <BtnTextLight
                  onClick={() => setSearchInput(searchInput.slice(0, -1))}
                  className={"btn-img"}
                >
                  {<img src="icon/del.svg" alt="backspace" />}
                </BtnTextLight>
              </li>
            </ul>
          </>
        ) : togglePanel === "more" ? (
          <ul className="list-unstyled row row-cols-5 g-3 mb-0">
            {/* more togglePanel */}
            {CityBusPanelData.more.map((item, index) => {
              return (
                <li className="col" key={index}>
                  <button
                    type="button"
                    className="w-100 btn btn-outline-primary shadow fs-lg-6"
                    onClick={(e) => handlePanelBtn(e)}
                  >
                    {item}
                  </button>
                </li>
              );
            })}
            {/* 上一頁 */}
            <li className="col flex-grow-1">
              <button
                type="button"
                className="w-100 btn btn-outline-primary shadow fs-lg-6 "
                onClick={() => setTogglePanel("base")}
              >
                回上一頁
              </button>
            </li>
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CityBusPanel;
