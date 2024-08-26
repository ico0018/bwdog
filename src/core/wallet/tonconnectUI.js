import * as TON_CONNECT_UI from "@tonconnect/ui-react";

let tonConnectUI;

// let account;

async function connect() {
  try {
    if (!tonConnectUI) {
      console.log("🚧 INIT the tonconnect ", tonConnectUI);
      var manifest =
        "https://tonspay.github.io/Tonspay-manifest/tonsmarket.json";
      tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: manifest,
        uiPreferences: {
          theme: TON_CONNECT_UI.THEME.DARK,
        },
      });
    }
  } catch (e) {
    console.error(e);
  }
  console.log("tonConnectUI.connected :: @2.0.0", tonConnectUI.connected);
  try {
    if (tonConnectUI.connected) {
      console.log("Disconnect for connection reload");
      await tonConnectUI.disconnect();
    }
  } catch (e) {
    console.error(e);
  }

  try {
    await tonConnectUI.openModal();

    tonConnectUI.onStatusChange((walletAndwalletInfo) => {
      console.log("change : ", walletAndwalletInfo);
      //   account = walletAndwalletInfo;
    });
  } catch (e) {
    console.error(e);
  }
}

export { connect };
