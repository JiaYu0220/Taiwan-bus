import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMagnifyingGlass,
  faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    // 背景
    <div className="bg-gradient-dark position-relative overflow-hidden vh-100">
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
      <div className="circle circle-3"></div>
      <div className="circle circle-4"></div>
      <div className="circle circle-5 d-none d-sm-block"></div>
      <div className="circle circle-6 d-none d-lg-block"></div>

      <div className="container-fluid">
        {/* logo 和 footer */}
        <div className="vh-100 d-flex flex-column justify-content-between">
          <h1 className="mt-6 ms-5 mt-sm-16 ms-sm-11 ms-lg-8">
            <picture>
              <source media="(min-width:576px)" srcSet="logo-sm.png" />
              <source media="(min-width:992px)" srcSet="logo-lg.png" />
              <img src="logo.png" alt="Taiwan Bus" />
            </picture>
          </h1>
          <footer className="align-self-end align-self-lg-start">
            <p className="mb-4 fs-8 fs-sm-7">
              Taiwan Bus © Code: jiayu / Design: KT / Data: 交通部 TDX 資料
            </p>
          </footer>
        </div>

        {/* nav */}
        <nav className="position-absolute top-0 bottom-0 end-0 w-100 w-lg-50">
          <ul className="list-unstyled">
            <li className="nav-circle nav-circle-primary">
              <NavLink
                className="h-100 d-flex flex-column justify-content-center align-items-center text-light pe-1 pb-3 p-sm-0 "
                to="/MyFollowing"
              >
                <FontAwesomeIcon
                  className="fs-5 fs-sm-1 fs-lg-3 mb-2 mb-sm-3"
                  icon={faHeartCirclePlus}
                />

                <p className="fs-sm-5">我的路線</p>
              </NavLink>
            </li>
            <li className="nav-circle nav-circle-white">
              <NavLink
                className="h-100 d-flex flex-column justify-content-center align-items-center text-dark me-4 m-sm-0"
                to="/SearchCityBus"
              >
                <FontAwesomeIcon
                  className="fs-5 fs-sm-1 fs-lg-3 mb-2 mb-sm-3"
                  icon={faMagnifyingGlass}
                />

                <p className="fs-sm-5">查詢公車</p>
              </NavLink>
            </li>
            <li className="nav-circle nav-circle-warning">
              <NavLink
                className="h-100 w-100 d-flex flex-column justify-content-center align-items-center text-dark ps-7 pb-1 ps-sm-3 pb-sm-2 p-lg-0 "
                to="/NearbyBus"
              >
                <FontAwesomeIcon
                  className="fs-5 fs-sm-1 fs-lg-3 mb-2 mb-sm-3"
                  icon={faLocationDot}
                />

                <p className="fw-sm-medium fs-sm-5">附近公車站</p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Home;
