import * as TON_CONNECT_UI from "@tonconnect/ui-react";

import * as api from "../request/index"

let tonConnectUI;

// let account;

async function connect() {
  try {
    if (!tonConnectUI) {
      console.log("🚧 INIT the tonconnect ", tonConnectUI);
      var manifest =
        "https://api.tonmeme.xyz/manifest/aso.json";
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

    tonConnectUI.onStatusChange(async (walletAndwalletInfo) => {
      console.log("walletAndwalletInfo : ", walletAndwalletInfo.account.address);
      await api.api_wallet_connect(
        {
          address : walletAndwalletInfo.account.address
        }
      )
      window.location.reload();
      
    });
  } catch (e) {
    console.error(e);
  }
}


function address_readable(font,back,raw)
{
    if(!raw || raw.length<font || raw.length < back)
    {
        return ''
    }
    let f = ""
    for(let i = 0 ; i < font ; i++)
    {
        f+=raw[i];
    }

    let b = "";
    for(let i = (raw.length-back)-1 ; i<raw.length ; i++ )
    {
        b+=raw[i]
    }

    return f+"..."+b
}


async function disconnectWallet() {
  await api.api_wallet_connect(
    {
      address : ""
    }
  )
  window.location.reload();
}


async function reconnect() {
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

    tonConnectUI.onStatusChange(async (walletAndwalletInfo) => {
      console.log("walletAndwalletInfo : ", walletAndwalletInfo.account.address);
      await api.api_wallet_connect(
        {
          address : walletAndwalletInfo.account.address
        }
      )
      window.location.reload();
      
    });
  } catch (e) {
    console.error(e);
  }
}


export { connect ,address_readable  ,disconnectWallet,reconnect};
