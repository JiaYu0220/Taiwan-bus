import axios from "axios";

function getCookies(key) {
  // 從 cookies 取出 token
  const tokenCookie = document.cookie
    .split("; ") // 不同 cookies 以；做分隔，把 cookies 變成陣列的各元素
    .find((row) => row.startsWith(key)); // 找名為 token 的元素
  return tokenCookie ? tokenCookie.split("=")[1] : null; // 把 cookies名稱=值 變成 [名稱, 值]，並取 index=1 也就是值，如果找不到對應 key 的 cookie，getCookies 函數將返回 null
}

async function getTdxToken() {
  try {
    const parameter = {
      grant_type: "client_credentials",
      client_id: "alice49885-93ea6fa2-b1be-42fa",
      client_secret: "1fc51d3d-3f92-4465-a54d-342641acee30",
    };

    const auth_url =
      "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";

    const response = await axios.post(auth_url, parameter, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { access_token } = response.data;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); //86400ms token過期
    document.cookie = `tdxToken=${access_token}; expires=${tomorrow.toUTCString()}`;

    if (!document.cookie.includes(`tdxToken=${access_token}`)) {
      console.error("Failed to set the cookie");
    }
  } catch (error) {
    // 在這裡處理錯誤回應的邏輯
    console.error(error);
  }
}

async function getCookieToken() {
  let tdxToken = getCookies("tdxToken");

  if (!tdxToken) {
    await getTdxToken();
    tdxToken = getCookies("tdxToken"); // 更新token
  }
  return tdxToken;
}

export { getTdxToken, getCookies, getCookieToken };
