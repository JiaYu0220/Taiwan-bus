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
const { VITE_APP_SITE } = import.meta.env;

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [togglePanel, setTogglePanel] = useState("default");
  const [city, setCity] = useState({
    tw: "",
    en: "",
  });
  const [busData, setBusData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 搜尋縣市
  const searchCity = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${VITE_APP_SITE}/Route/City/${city.en}?%24orderby=RouteName%2FZh_tw&%24top=30&%24format=JSON`,
        {
          headers: getAuthorizationHeader(),
        }
      );
      setIsLoading(false);
      setBusData(data);
    } catch (error) {
      console.log("searchCity", error);
    }
  };

  // input搜尋
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${VITE_APP_SITE}/Route/City/Taipei/${searchInput}?%24orderby=RouteName%2FZh_tw&%24top=30&%24format=JSON`,
          {
            headers: getAuthorizationHeader(),
          }
        );
        setIsLoading(false);
        setBusData(data);
      } catch (error) {
        console.log("searchBus", error);
      }
    })();
  }, [searchInput]);
  // 搜尋關鍵字

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
                <Link className="me-3 me-lg-2" to="/">
                  <picture>
                    <source
                      media="(min-width:576px)"
                      srcSet="back-home-sm.png"
                    />
                    <source
                      media="(min-width:992px)"
                      srcSet="back-home-lg.png"
                    />
                    <img src="back-home.png" alt="logo" />
                  </picture>
                </Link>
                <input
                  className="align-self-end form-control ps-4"
                  type="text"
                  name="search"
                  id="search"
                  placeholder="選擇路線或手動輸入關鍵字"
                  inputMode="none"
                  disabled={!busData}
                  value={search}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          {/* 鍵盤 */}
          <div className="position-fixed bottom-0 start-0 bottom-lg-initial start-lg-initial mt-lg-24 z-2">
            <div className="w-100 w-lg-360px h-lg-550px bg-gray rounded-2 pt-5 pb-6 px-5 pt-sm-6 px-sm-12 pt-lg-5 px-lg-5">
              {togglePanel === "default" ? (
                <>
                  {/* default togglePanel */}
                  <ul className="list-unstyled d-flex gap-4">
                    <li className="flex-grow-2">
                      <button
                        type="button"
                        className="w-100 btn btn-icon btn-outline-primary shadow text-light fs-lg-6"
                        onClick={() => setTogglePanel("city")}
                      >
                        <FontAwesomeIcon
                          className="me-2"
                          icon={faLocationDot}
                        />
                        <p>選擇縣市</p>
                      </button>
                    </li>
                    {busData ? (
                      <li className="d-lg-none flex-grow-1">
                        <button
                          type="button"
                          className="w-100 btn btn-outline-primary shadow fs-lg-6"
                        >
                          手動輸入
                        </button>
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                  {busData ? (
                    <ul className="list-unstyled row row-cols-5 g-3 mb-0">
                      {/* 1 */}
                      <li className="col">
                        <button
                          type="button"
                          className="w-100 btn btn-outline-primary shadow fs-lg-6"
                          onClick={(e) =>
                            setSearchInput(searchInput + e.target.innerText)
                          }
                        >
                          紅
                        </button>
                      </li>
                      <li className="col">
                        <button
                          type="button"
                          className="w-100 btn btn-outline-primary shadow fs-lg-6"
                          onClick={(e) =>
                            setSearchInput(searchInput + e.target.innerText)
                          }
                        >
                          藍
                        </button>
                      </li>
                      <li className="col">
                        <button
                          type="button"
                          className="w-100 btn btn-outline-primary shadow text-white fs-lg-6"
                          onClick={(e) =>
                            setSearchInput(searchInput + e.target.innerText)
                          }
                        >
                          1
                        </button>
                      </li>
                      <li className="col">
                        <button
                          type="button"
                          className="w-100 btn btn-outline-primary shadow text-white fs-lg-6"
                          onClick={(e) =>
                            setSearchInput(searchInput + e.target.innerText)
                          }
                        >
                          2
                        </button>
                      </li>
                      <li className="col">
                        <button
                          type="button"
                          className="w-100 btn btn-outline-primary shadow text-white fs-lg-6"
                          onClick={(e) =>
                            setSearchInput(searchInput + e.target.innerText)
                          }
                        >
                          3
                        </button>
                      </li>
                      {/* 2 */}
                      <li className="col">
                        <button
                          type="button"
                          className="w-100 btn btn-outline-primary shadow fs-lg-6"
                          onClick={(e) =>
                            setSearchInput(searchInput + e.target.innerText)
                          }
                        >
                          綠
                        </button>
                      </li>
                      <li className="col">
                        <button
                          type="button"
                          className="w-100 btn btn-outline-primary shadow fs-lg-6"
                          onClick={(e) =>
                            setSearchInput(searchInput + e.target.innerText)
                          }
                        >
                          棕
                        </button>
                      </li>
                      <li className="col">
                        <button
                          type="button"
                          className="w-100 btn btn-outline-primary shadow text-white fs-lg-6"
                          onClick={(e) =>
                            setSearchInput(searchInput + e.target.innerText)
                          }
                        >
                          4
                        </button>
                      </li>
                      <li className="col">
                        <button
                          type="button"
                          className="w-100 btn btn-outline-primary shadow text-white fs-lg-6"
                          onClick={(e) =>
                            setSearchInput(searchInput + e.target.innerText)
                          }
                        >
                          5
                        </button>
                      </li>
                      <li className="col">
                        <button
                          type="button"
                          className="w-100 btn btn-outline-primary shadow text-white fs-lg-6"
                          onClick={(e) =>
                            setSearchInput(searchInput + e.target.innerText)
                          }
                        >
                          6
                        </button>
                      </li>
                      {/* 3 */}
                      <li className="col">
                        <button
                          type="button"
                          className="w-100 btn btn-outline-primary shadow fs-lg-6"
                          onClick={(e) =>
                            setSearchInput(searchInput + e.target.innerText)
                          }
                        >
                          橘
                        </button>
                      </li>
                      <li className="col">
                        <button
                          type="button"
                          className="w-100 btn btn-outline-primary shadow fs-lg-6"
                          onClick={(e) =>
                            setSearchInput(searchInput + e.target.innerText)
                          }
                        >
                          小
                        </button>
                      </li>
                      <li className="col">
                        <button
                          type="button"
                          className="w-100 btn btn-outline-primary shadow text-white fs-lg-6"
                          onClick={(e) =>
                            setSearchInput(searchInput + e.target.innerText)
                          }
                        >
                          7
                        </button>
                      </li>
                      <li className="col">
                        <button
                          type="button"
                          className="w-100 btn btn-outline-primary shadow text-white fs-lg-6"
                          onClick={(e) =>
                            setSearchInput(searchInput + e.target.innerText)
                          }
                        >
                          8
                        </button>
                      </li>
                      <li className="col">
                        <button
                          type="button"
                          className="w-100 btn btn-outline-primary shadow text-white fs-lg-6"
                          onClick={(e) =>
                            setSearchInput(searchInput + e.target.innerText)
                          }
                        >
                          9
                        </button>
                      </li>
                      {/* 4 */}
                      <li className="col">
                        <button
                          type="button"
                          className="w-100 btn btn-outline-primary shadow fs-lg-6"
                        >
                          幹線
                        </button>
                      </li>
                      <li className="col">
                        <button
                          type="button"
                          className="w-100 btn btn-outline-primary shadow fs-lg-6"
                          onClick={() => setTogglePanel("more")}
                        >
                          更多
                        </button>
                      </li>
                      <li className="col">
                        <button
                          type="button"
                          className="w-100 btn btn-outline-primary shadow fs-lg-6"
                          onClick={() => setSearch("")}
                        >
                          c
                        </button>
                      </li>
                      <li className="col">
                        <button
                          type="button"
                          className="w-100 btn btn-outline-primary shadow text-white fs-lg-6"
                          onClick={(e) =>
                            setSearchInput(searchInput + e.target.innerText)
                          }
                        >
                          0
                        </button>
                      </li>
                      <li className="col">
                        <button
                          type="button"
                          className="w-100 h-100 btn btn-img btn-outline-primary shadow text-white"
                          onClick={() =>
                            setSearchInput(searchInput.slice(0, -1))
                          }
                        >
                          <img src="icon/del.svg" alt="delete" />
                        </button>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </>
              ) : togglePanel === "city" ? (
                <ul className="list-unstyled row row-cols-4 g-3 mb-0">
                  {/* city togglePanel */}
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="Taipei"
                      className="d-none"
                    />
                    <label
                      htmlFor="Taipei"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      台北市
                    </label>
                  </li>
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="NewTaipei"
                      className="d-none"
                    />
                    <label
                      htmlFor="NewTaipei"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      新北市
                    </label>
                  </li>
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="Keelung"
                      className="d-none"
                    />
                    <label
                      htmlFor="Keelung"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      基隆市
                    </label>
                  </li>
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="Taoyuan"
                      className="d-none"
                    />
                    <label
                      htmlFor="Taoyuan"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      桃園市
                    </label>
                  </li>
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="Hsinchu"
                      className="d-none"
                    />
                    <label
                      htmlFor="Hsinchu"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      新竹市
                    </label>
                  </li>
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="HsinchuCountry"
                      className="d-none"
                    />
                    <label
                      htmlFor="HsinchuCountry"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      新竹縣
                    </label>
                  </li>
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="MiaoliCountry"
                      className="d-none"
                    />
                    <label
                      htmlFor="MiaoliCountry"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      苗栗縣
                    </label>
                  </li>
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="Taichung"
                      className="d-none"
                    />
                    <label
                      htmlFor="Taichung"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      台中市
                    </label>
                  </li>
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="NantouCounty"
                      className="d-none"
                    />
                    <label
                      htmlFor="NantouCounty"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      南投縣
                    </label>
                  </li>
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="ChanghuaCounty"
                      className="d-none"
                    />
                    <label
                      htmlFor="ChanghuaCounty"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      彰化縣
                    </label>
                  </li>
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="YunlinCounty"
                      className="d-none"
                    />
                    <label
                      htmlFor="YunlinCounty"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      雲林縣
                    </label>
                  </li>
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="Chiayi"
                      className="d-none"
                    />
                    <label
                      htmlFor="Chiayi"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      嘉義市
                    </label>
                  </li>
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="ChiayiCounty"
                      className="d-none"
                    />
                    <label
                      htmlFor="ChiayiCounty"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      嘉義縣
                    </label>
                  </li>
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="Tainan"
                      className="d-none"
                    />
                    <label
                      htmlFor="Tainan"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      台南市
                    </label>
                  </li>
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="Kaohsiung"
                      className="d-none"
                    />
                    <label
                      htmlFor="Kaohsiung"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      高雄市
                    </label>
                  </li>
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="PingtungCounty"
                      className="d-none"
                    />
                    <label
                      htmlFor="PingtungCounty"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      屏東縣
                    </label>
                  </li>
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="TaitungCounty"
                      className="d-none"
                    />
                    <label
                      htmlFor="TaitungCounty"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      台東縣
                    </label>
                  </li>
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="HualienCounty"
                      className="d-none"
                    />
                    <label
                      htmlFor="HualienCounty"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      花蓮縣
                    </label>
                  </li>
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="YilanCounty"
                      className="d-none"
                    />
                    <label
                      htmlFor="YilanCounty"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      宜蘭縣
                    </label>
                  </li>
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="PenghuCounty"
                      className="d-none"
                    />
                    <label
                      htmlFor="PenghuCounty"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      澎湖縣
                    </label>
                  </li>
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="KinmenCounty"
                      className="d-none"
                    />
                    <label
                      htmlFor="KinmenCounty"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      金門縣
                    </label>
                  </li>
                  <li className="col">
                    <input
                      type="radio"
                      name="city"
                      id="LienchiangCounty"
                      className="d-none"
                    />
                    <label
                      htmlFor="LienchiangCounty"
                      className="w-100 btn btn-radio btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setCity({
                          tw: e.target.innerText,
                          en: e.target.htmlFor,
                        })
                      }
                    >
                      連江縣
                    </label>
                  </li>
                  <li className="col flex-grow-1">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow fs-lg-6 "
                      onClick={() => {
                        setTogglePanel("default");
                        searchCity();
                      }}
                    >
                      設定
                    </button>
                  </li>
                </ul>
              ) : (
                <ul className="list-unstyled row row-cols-5 g-3 mb-0">
                  {/* more togglePanel */}
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setSearchInput(searchInput + e.target.innerText)
                      }
                    >
                      F
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setSearchInput(searchInput + e.target.innerText)
                      }
                    >
                      R
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setSearchInput(searchInput + e.target.innerText)
                      }
                    >
                      T
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setSearchInput(searchInput + e.target.innerText)
                      }
                    >
                      快
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setSearchInput(searchInput + e.target.innerText)
                      }
                    >
                      內科
                    </button>
                  </li>
                  {/* 2 */}
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setSearchInput(searchInput + e.target.innerText)
                      }
                    >
                      跳蛙
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setSearchInput(searchInput + e.target.innerText)
                      }
                    >
                      通勤
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setSearchInput(searchInput + e.target.innerText)
                      }
                    >
                      南軟
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setSearchInput(searchInput + e.target.innerText)
                      }
                    >
                      先導
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setSearchInput(searchInput + e.target.innerText)
                      }
                    >
                      夜間
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setSearchInput(searchInput + e.target.innerText)
                      }
                    >
                      市民
                    </button>
                  </li>
                  {/* 3 */}
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow fs-lg-6"
                      onClick={(e) =>
                        setSearchInput(searchInput + e.target.innerText)
                      }
                    >
                      其他
                    </button>
                  </li>
                  <li className="col flex-grow-1">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow fs-lg-6 "
                      onClick={() => setTogglePanel("default")}
                    >
                      回上一頁
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* 搜尋結果 */}
        <div className="mt-24 mt-sm-32 mt-lg-0 ms-lg-100 flex-grow-1">
          <h1 className="fs-6 fs-lg-5 mb-2 pt-lg-7">
            {city.tw ? city.tw : "請先選擇縣市"}
          </h1>
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            ""
          )}
          {busData ? (
            <ul className="list-unstyled ">
              {busData.map((item) => {
                return (
                  <li
                    className="card bg-strip hover-bg-gray-light"
                    key={item.RouteUID}
                  >
                    <Link className="card-body d-flex justify-content-between align-items-center pe-2 ">
                      <div>
                        <h2 className="card-title fs-5 fs-lg-4 fw-medium">
                          {item.RouteName.Zh_tw}
                        </h2>
                        <p className="fs-7 fs-lg-6 text-primary">
                          <span className="text-light">
                            {item.DepartureStopNameZh}
                          </span>{" "}
                          往{" "}
                          <span className="text-light">
                            {item.DestinationStopNameZh}
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn btn-link hover-scale"
                      >
                        <FontAwesomeIcon className="fs-5" icon={farFaHeart} />
                      </button>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
