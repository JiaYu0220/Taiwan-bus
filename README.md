# Taiwan-Bus 全台公車動態時刻查詢應用服務

- [DEMO](https://jiayu0220.github.io/taiwan-bus/)

## 作品說明

### 作品資源

- 本作品採用 [KT 的設計稿](https://www.behance.net/gallery/131646273/Taiwan-Bus-Project)
- 資料取自於 [TDX 運輸資料流通服務 API](https://tdx.transportdata.tw/api-service/swagger#/CityBus)

### 作品動機

我曾因為不知道公車往返站牌會有同側的情況而錯過公車，看到 2021 The F2E 有此全台公車動態時刻查詢應用服務主題，決定要製作讓使用者可以確認站牌是否在同側的公車查詢網站。

## 功能、畫面

- 查詢公車 -> 查看公車到站時間 -> 查看公車和站牌位置

- 加入收藏 -> 查看我的收藏 -> 刪除收藏

- 查看我的位置附近站牌 -> 查看某站牌公車

## 安裝

本專案使用 React Vite 開發，並部署到 Github Pages

Node.js 版本建議為：`18.16.0` 以上

### 取得專案

```bash
git clone git@github.com:JiaYu0220/taiwan-bus.git
```

### 移動到專案內

```bash
cd taiwan-bus
```

### 安裝套件

```bash
npm install
```

### 運行專案

```bash
npm run dev
```

### 開啟專案

在瀏覽器網址列輸入以下即可看到畫面

```bash
http://localhost:5173/
```

## 資料夾說明

- public - 圖片
- src - 要編譯檔案
  - components - 共用元件
  - global - 共用 function
  - scss - 共用 scss
  - pages - 畫面放置處
    - Home - 首頁
    - SearchCityBus - 搜尋公車頁面
    - BusInfo - 公車到站資訊頁面
    - MyFollowing - 我的收藏頁面
    - NearbyBus - 我的位置頁面

## 專案技術

- Node.js `^18.16.0`
- React `^18.2.0`
- Vite `^4.4.5`
- react-router-dom `^6.16.0`
- axios `^1.5.1`
- bootstrap `^5.3.2`、react-bootstrap `^2.9.0`
- leaflet `^1.9.4`、react-leaflet `^4.2.1`
- sweetalert2 `^11.10.1`、sweetalert2-react-content `^5.0.7`


