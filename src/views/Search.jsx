import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as fasFaHeart,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farFaHeart } from "@fortawesome/free-regular-svg-icons";

const Search = () => {
  const [search, setSearch] = useState("");
  const [chooseCity, setChooseCity] = useState(false);

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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* 鍵盤 */}
          <div className="position-fixed bottom-0 start-0 bottom-lg-initial start-lg-initial mt-lg-24 z-2">
            <div className="w-100 w-lg-360px min-h-lg-550px">
              <div className="bg-gray rounded-2 pt-5 pb-6 px-5 pt-sm-6 px-sm-12 pt-lg-5 px-lg-5">
                <ul className="list-unstyled d-flex gap-4">
                  <li className="flex-grow-2">
                    <button
                      type="button"
                      className="w-100 btn btn-icon btn-outline-primary shadow text-light fs-lg-6"
                    >
                      <FontAwesomeIcon className="me-2" icon={faLocationDot} />
                      <p>選擇縣市</p>
                    </button>
                  </li>
                  <li className="flex-grow-1">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow fs-lg-6"
                    >
                      手動輸入
                    </button>
                  </li>
                </ul>
                <ul className="list-unstyled row row-cols-5 g-3 mb-0">
                  {/* 1 */}
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow fs-lg-6"
                      onClick={(e) => setSearch(search + e.target.innerText)}
                    >
                      紅
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow fs-lg-6"
                      onClick={(e) => setSearch(search + e.target.innerText)}
                    >
                      藍
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow text-white fs-lg-6"
                      onClick={(e) => setSearch(search + e.target.innerText)}
                    >
                      1
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow text-white fs-lg-6"
                    >
                      2
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow text-white fs-lg-6"
                    >
                      3
                    </button>
                  </li>
                  {/* 2 */}
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow fs-lg-6"
                    >
                      綠
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow fs-lg-6"
                    >
                      棕
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow text-white fs-lg-6"
                    >
                      4
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow text-white fs-lg-6"
                    >
                      5
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow text-white fs-lg-6"
                    >
                      6
                    </button>
                  </li>
                  {/* 3 */}
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow fs-lg-6"
                    >
                      綠
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow fs-lg-6"
                    >
                      棕
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow text-white fs-lg-6"
                    >
                      4
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow text-white fs-lg-6"
                    >
                      5
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 btn btn-outline-primary shadow text-white fs-lg-6"
                    >
                      6
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
                    >
                      0
                    </button>
                  </li>
                  <li className="col">
                    <button
                      type="button"
                      className="w-100 h-100 btn btn-img btn-outline-primary shadow text-white"
                    >
                      <img src="icon/del.svg" alt="delete" />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* 搜尋結果 */}
        <div className="mt-24 mt-sm-32 mt-lg-0 ms-lg-100 flex-grow-1">
          <h1 className="fs-6 fs-lg-5 mb-2 pt-lg-7">請先選擇縣市</h1>
          <ul className="list-unstyled ">
            <li className="card bg-strip hover-bg-gray-light">
              <Link className="card-body d-flex justify-content-between align-items-center pe-2 ">
                <div>
                  <h2 className="card-title fs-5 fs-lg-4 fw-medium">紅10</h2>
                  <p className="fs-7 fs-lg-6 text-primary">
                    <span className="text-light">台北海大</span> 往{" "}
                    <span className="text-light">捷運劍潭站</span>
                  </p>
                </div>
                <button type="button" className="btn btn-link hover-scale">
                  <FontAwesomeIcon className="fs-5" icon={farFaHeart} />
                </button>
              </Link>
            </li>
            <li className="card bg-strip hover-bg-gray-light">
              <Link className="card-body d-flex justify-content-between align-items-center pe-2 ">
                <div>
                  <h2 className="card-title fs-5 fs-lg-4 fw-medium">紅10</h2>
                  <p className="fs-7 fs-lg-6 text-primary">
                    <span className="text-light">台北海大</span> 往{" "}
                    <span className="text-light">捷運劍潭站</span>
                  </p>
                </div>
                <button type="button" className="btn btn-link hover-scale">
                  <FontAwesomeIcon className="fs-5" icon={farFaHeart} />
                </button>
              </Link>
            </li>
            <li className="card bg-strip hover-bg-gray-light">
              <Link className="card-body d-flex justify-content-between align-items-center pe-2 ">
                <div>
                  <h2 className="card-title fs-5 fs-lg-4 fw-medium">紅10</h2>
                  <p className="fs-7 fs-lg-6 text-primary">
                    <span className="text-light">台北海大</span> 往{" "}
                    <span className="text-light">捷運劍潭站</span>
                  </p>
                </div>
                <button type="button" className="btn btn-link hover-scale">
                  <FontAwesomeIcon className="fs-5" icon={farFaHeart} />
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Search;
