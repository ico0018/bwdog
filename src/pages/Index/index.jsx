import React, { useState, useEffect } from "react";
import Navigator from "../../components/Navigator";
import logo from "../../assets/cow.svg";
import wallet from "../../assets/wallet.png";
import checked from "../../assets/checked.png";
import { Button, Image, Popup, Swiper } from "antd-mobile";
import { connect } from "../../core/wallet/tonconnectUI";
import { miniapp_init } from "../../core/tg/index";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Backdrop, CircularProgress } from "@mui/material";

import {
  api_login,
  api_login_data,
  api_action_update,
} from "../../core/request/index";
import {
  storage_set_authkey,
  storage_get_authkey,
  storage_set_uid,
  storage_set_user_tg_data,
  storage_get_user_tg_data,
  storage_set_user_invite_code
} from "../../core/storage/index";

export default function Index() {
  /**
   * Action list
   *
   * twitterFollow
   * mainTelegramChannelJoin
   */

  const actionStatus = ["Check", "Done"];
  const [cardsData, setCardsData] = useState([
    {
      title: "Join our Channel",
      text: "Join and see more details",
      button: "Join",
      link: "https://t.me/ASOWEIKE",
      action: "twitterFollow",
      status: 0,
    },
    {
      title: "Follow our twitter",
      text: "Follow to earn ! ",
      button: "Follow",
      link: "https://x.com/gunmuho1",
      action: "mainTelegramChannelJoin",
      status: 0,
    },
  ]);

  const [sharePop, setSharePop] = useState(false);

  const [reqData, setReqData] = useState({
    wallet: {},
    credit: {
      _id: "",
      uid: 0,
      credit: 0,
      withdraws: 0,
    },
    history: [],
    action: [],
  });

  const [isInited, setIsInited] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    telegramWebappInit();
    console.log("isInited", isInited);
  }, []);

  function afterLogin(auth) {
    console.log("🔥 afterLogin", auth);
    storage_set_uid(auth?.uid);
    storage_set_user_tg_data(auth?.data);
    setReqData(auth.data);
    var cardsFinal = JSON.parse(JSON.stringify(cardsData));
    auth.data.action.forEach((e) => {
      for (let i = 0; i < cardsFinal.length; i++) {
        if (e.action == cardsFinal[i].action) {
          cardsFinal[i].status = e.status;

          // if(e.status || e.status==0)
          // {
          cardsFinal[i].button = actionStatus[0];
          // }
        }
      }
    });
    setCardsData(cardsFinal);
    setLoading(false);
    console.log("🔥auth.data", auth.data);
    console.log("🔥cardsFinal", cardsFinal);
  }
  function telegramWebappInit() {
    if (isInited) {
      console.log("Looping again . find reason plz . ");
      return false;
    } else {
      setIsInited(true);
    }

    let autKey = storage_get_authkey();
    if (autKey && autKey.length > 10) {
      //🍺Check login status . if it do already have the auth key
      console.log("🔥autKey exsit", autKey);
      api_login_data()
        .then((auth) => {
          afterLogin(auth);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      //🍺First time to get the init interface .
      const initData = miniapp_init();
      console.log("🔥initData", initData);
      let inviteCode = "";
      if(initData.starData&&initData.starData.length>1)
      {
        if(initData.starData[0]=='i')
        {
          inviteCode =  initData.starData
          inviteCode = inviteCode.substring(1,inviteCode.length);
        }
      }
      console.log("⚠ Invite code check : ",inviteCode,initData.starData)
      api_login({
        initData: initData.initData.initData.split("&tgWebAppVersion")[0] || "",
        invite: initData.starData,
        invite:inviteCode
      })
        .then((auth) => {
          storage_set_authkey(auth.token);
          afterLogin(auth);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  // function MiniButton(title) {
  //   return (
  //     <>
  //       <div
  //         onClick={() => {
  //           setSharePop(true);
  //         }}
  //         className="bg-white rounded-full text-black text-center w-fit font-extrabold p-2 mt-3 active:bg-gray-600 transition-all duration-75"
  //       >
  //         {title}
  //       </div>
  //     </>
  //   );
  // }

  async function CardButton(index, data) {
    await api_action_update({
      action: cardsData[index].action,
      status: cardsData[index].status + 1,
      data: "" ? data : "",
    });
    window.open(cardsData[index].link);
    telegramWebappInit();
  }

  const router = useNavigate();

  function toWelcome() {
    router("/welcome");
  }

  // Loading Control
  const [loading, setLoading] = useState(true);
  // setTimeout(() => {
  //   setLoading(false);
  // }, 1000);

  return (
    <>
      {/* Loading Control */}
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="bg-black min-h-full text-white px-4">
        <Navigator></Navigator>
        <div className="body flex flex-col items-center">
          <Button className="!mt-6" onClick={connect}>
            <div className="flex items-center">
              <Image className="mr-1" src={wallet} width={20} height={20} />
              Connect wallet
            </div>
          </Button>

          <Image
            onClick={toWelcome}
            className="mr-1 mt-5"
            src={logo}
            width={150}
            height={150}
          />

          <h1 className="text-4xl mt-5">{reqData.credit.credit || "838"}</h1>
          <h2 className="text-xl text-gray-300 font-medium">COWS</h2>

          <Swiper
            style={{
              "--track-padding": " 0 0 16px",
            }}
          >
            {cardsData.map((item, index) => (
              <Swiper.Item key={index}>
                <div className=" mt-5 bg-gray-800 rounded-xl p-5 text-sm w-[98%]">
                  <p className="text-xl  font-bold">{item.title}</p>
                  <p>{item.text}</p>
                  <div
                    onClick={() => {
                      window.open(item.link);
                    }}
                    className="bg-white rounded-full text-black text-center w-fit font-extrabold p-2 mt-3 active:bg-gray-600 transition-all duration-75"
                  >
                    {item.button}
                  </div>
                </div>
              </Swiper.Item>
            ))}
          </Swiper>

          <div className="w-full text-xl mt-5">
            <h1>Tasks</h1>

            {cardsData.map((item, index) => (
              <div className="flex justify-between text-sm  mt-3">
                <div className="flex items-center">
                  <Image
                    className="mr-4"
                    src={checked}
                    width={35}
                    height={35}
                  />
                  <div className="flex flex-col">
                    <p>{item.title}</p>
                    <p className="text-gray-300">+1,000 COWS</p>
                  </div>
                </div>
                <div
                  onClick={async () => {
                    CardButton(index, "");
                  }}
                  className="bg-white rounded-full text-black text-center w-fit font-extrabold p-2 mt-3 active:bg-gray-600 transition-all duration-75"
                >
                  {item.button}
                </div>
              </div>
            ))}

            {/* {
              <div className="flex justify-between text-sm  mt-3">
              <div className="flex items-center">
                <Image className="mr-4" src={checked} width={35} height={35} />
                <div className="flex flex-col">
                  <p>Join our channel</p>
                  <p className="text-gray-300">+1,000 COWS</p>
                </div>
              </div>
              <div
                onClick={() => {
                    window.open("https://t.me/ASOWEIKE")
                }}
                className="bg-white rounded-full text-black text-center w-fit font-extrabold p-2 mt-3 active:bg-gray-600 transition-all duration-75"
              >
                Join
              </div>
            </div>

            <div className="flex justify-between text-sm  mt-3">
              <div className="flex items-center">
                <Image className="mr-4" src={checked} width={35} height={35} />
                <div className="flex flex-col">
                  <p>Follow us on Twitter</p>
                  <p className="text-gray-300">+1000 COWS</p>
                </div>
              </div>
              <div
                onClick={() => {
                  window.open("https://x.com/gunmuho1")
                }}
                className="bg-white rounded-full text-black text-center w-fit font-extrabold p-2 mt-3 active:bg-gray-600 transition-all duration-75"
              >
                Follow
              </div>
            </div>
} */}
          </div>
        </div>
        <Popup
          visible={sharePop}
          onMaskClick={() => {
            setSharePop(false);
          }}
          bodyStyle={{
            background: "#131313",
            borderTopLeftRadius: "1rem",
            borderTopRightRadius: "1rem",
          }}
        >
          <div className="flex flex-col items-center text-white min-h-[235px]">
            <h1 className="flex justify-center items-center relative p-4 text-lg font-medium w-full border-b-[0.5px] border-gray-700">
              <p>Invite friends</p>
              <div
                className="!absolute right-4 bg-[#222222] rounded-full w-8 h-8 flex justify-center items-center"
                onClick={() => {
                  setSharePop(false);
                }}
                shape="rounded"
              >
                <CloseIcon
                  sx={{
                    color: "#535353",
                  }}
                />
              </div>
            </h1>

            <div className="flex flex-col w-full grow justify-between px-4 py-7">
              <Button className="w-full !rounded-xl">
                <span className="flex items-center justify-center font-bold text-lg py-1">
                  Copy invite link
                </span>
              </Button>
              <Button className="w-full !rounded-xl">
                <span className="flex items-center justify-center font-bold text-lg py-1">
                  Share invite link
                </span>
              </Button>
            </div>
          </div>
        </Popup>
        <div className="SafeArea h-[70px] bg-black"></div>
      </div>
    </>
  );
}
