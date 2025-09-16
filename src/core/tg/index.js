import { initMiniApp } from "@telegram-apps/sdk-react";
import { storage_set_raw_init_data } from "../storage/index";

function miniapp_init() {
  let decodeData = {
    isTelegram: false,
    initData: {},
    hasStarData: false,
    starData: "",
  };

  try {
    // ✅ 1. Telegram 官方 API
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      if (tg.initDataUnsafe && Object.keys(tg.initDataUnsafe).length > 0) {
        decodeData.initData = tg.initDataUnsafe;
        decodeData.isTelegram = true;
        console.log("✅ 从 Telegram.WebApp.initDataUnsafe 获取数据");
      }
    }

    // ✅ 2. URL fallback
    if (!decodeData.isTelegram) {
      const r = window.location.href || "";
      const tmp0 = r.split("#");

      if (tmp0.length > 1 && tmp0[1]) {
        const temp1 = tmp0[1];
        if (temp1.includes("tgWebAppData=")) {
          const temp2 = temp1.split("tgWebAppData=");
          if (temp2.length > 1) {
            decodeData.initData = { initData: temp2[1] };
            decodeData.isTelegram = true;
            console.log("⚠️ 从 URL hash 解析数据");
          }
        }
      }

      if (tmp0.length > 0 && tmp0[0].includes("tgWebAppStartParam=")) {
        const temp3 = tmp0[0].split("tgWebAppStartParam=");
        if (temp3.length > 1) {
          decodeData.starData = temp3[1];
          decodeData.hasStarData = true;
        }
      }
    }

    // ✅ 3. 环境变量 fallback
    if (!decodeData.isTelegram || !decodeData.initData || Object.keys(decodeData.initData).length === 0) {
      const envData = process.env.REACT_APP_TG_WEBAPPDATA;
      if (envData) {
        try {
          decodeData.initData = JSON.parse(envData);
          decodeData.isTelegram = false;
          console.log("⚠️ 使用环境变量 mock 数据");
        } catch (e) {
          console.error("解析 REACT_APP_TG_WEBAPPDATA 出错:", e);
        }
      }
    }
  } catch (e) {
    console.error("miniapp_init 解析错误:", e);
  }

  storage_set_raw_init_data(decodeData);
  return decodeData;
}

function tryCloseWebappWindows() {
  try {
    const [miniApp] = initMiniApp();
    miniApp.close();
  } catch (e) {
    console.error(e);
  }
}

function telegramShare(words, path) {
  window.location.href = encodeURI(
    `https://t.me/share/url?url=${path}&text=${words}`
  );
}

export { miniapp_init, tryCloseWebappWindows, telegramShare };
