# Taiwan-Bus 全台公車動態時刻查詢應用服務 | [DEMO](https://jiayu0220.github.io/taiwan-bus/)

<table width="100%">
  <tr>
  <td width="30%"><img src="https://github.com/JiaYu0220/taiwan-bus/assets/134919211/3ae517ba-0a64-4488-b371-11390961312d" alt="首頁-手機板"></td>
  <td width="70%"><img src="https://github.com/JiaYu0220/taiwan-bus/assets/134919211/5d1db1c9-9fdb-465f-bea6-c473631427c7" alt="首頁-桌機板"></td>
  </tr>
  <tr>
  <td width="30%">首頁-手機板</td>
  <td width="70%">首頁-桌機板</td>
  </tr>
</table>

## 作品說明

### 作品資源

- 本作品採用 [KT 的設計稿](https://www.behance.net/gallery/131646273/Taiwan-Bus-Project)
- 資料取自於 [TDX 運輸資料流通服務 API](https://tdx.transportdata.tw/api-service/swagger#/CityBus)

### 作品動機

我曾因為不知道公車往返站牌會有同側的情況而錯過公車，看到 2021 The F2E 有此全台公車動態時刻查詢應用服務主題，決定要製作讓使用者可以確認站牌是否在同側的公車查詢網站。

## 功能、畫面

- 查詢公車 -> 查看公車到站時間 -> 查看公車和站牌位置

  ![查詢公車](https://github.com/JiaYu0220/taiwan-bus/assets/134919211/c653bd39-21c2-4c2f-9164-da92db802ea5)


- 加入收藏 -> 查看我的收藏 -> 刪除收藏

  ![我的路線](https://github.com/JiaYu0220/taiwan-bus/assets/134919211/63ac0b1e-7005-4b81-a8ea-cf51143d5ace)



- 查看我的位置附近站牌 -> 查看某站牌公車
  - 記得打開存取位置權限
  - 有時候定位會跑掉，[React Leaflet 官網範例](https://react-leaflet.js.org/docs/example-events/)也是相同情形
    
   ![我的位置](https://github.com/JiaYu0220/taiwan-bus/assets/134919211/7ed6f074-1510-404a-96a9-b3d61a26a600)


## 安裝

- 本專案使用 React Vite 開發，並部署到 Github Pages

- Node.js 版本建議為：`18.16.0` 以上

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

```
|- public - 圖片
|- src - 要編譯檔案
    |- components - 共用元件
    |- global - 共用 function
    |- pages - 畫面放置處
        |- Home - 首頁
        |- SearchCityBus - 搜尋公車頁面
        |- BusInfo - 公車到站資訊頁面
        |- MyFollowing - 我的收藏頁面
        |- NearbyBus - 我的位置頁面
```     

## 專案技術

- Node.js `^18.16.0`
- React `^18.2.0`
- Vite `^4.4.5`
- react-router-dom `^6.16.0`
- axios `^1.5.1`
- bootstrap `^5.3.2`、react-bootstrap `^2.9.0`
- leaflet `^1.9.4`、react-leaflet `^4.2.1`
- sweetalert2 `^11.10.1`、sweetalert2-react-content `^5.0.7`


