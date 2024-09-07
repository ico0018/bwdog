import React, { useState, useEffect } from "react";
import { Button, Image } from "antd-mobile";
import logo from "../../assets/cow.svg";
import copy from "../../assets/copy.svg";
import { telegramShare } from "../../core/tg/index";

import {
  api_invite_count
} from "../../core/request/index";

import {
  storage_get_uid,
} from "../../core/storage/index";

export default function Friends() {

  useEffect( () => {
    api_invite_count().then((data) => {
      console.log("🔥 friend count",data,data.data.invite?data.data.invite:0)
      setInvite(
        data.data.invite?data.data.invite:0
      )
    })
  }, []);

  const [invite, setInvite] = useState(0)

  function shareToFriend() {
    console.log("🍺 The to share uid :: ",storage_get_uid(),Number(storage_get_uid()).toString(16))
    telegramShare(
      "🍺 Earn your COWS here ! ",
      `http://t.me/cowscoin_bot/app?startapp=i${Number(storage_get_uid()).toString(16)}`
    );
  }
  return (
    <>
      <div className="min-h-full bg-black text-white flex flex-col w-full px-4 pt-10">
        <h1 className="text-center text-3xl font-bold">
          Invite friends <br /> and get more ASO
        </h1>
        <div className="grow mb-[70px] relative flex flex-col items-center">
          <Image className="mr-1 mt-5" src={logo} width={150} height={150} />
          <h2 className=" font-medium text-2xl text-center mt-16">
            Tap on the button to irinvite your friends
          </h2>

          <div className="w-full !absolute bottom-0">
            {/* Invited friends */}
            <p className="text-center text-sm mb-4">
              Invited friends: <span className="font-bold">{invite}</span>
            </p>
            <div className="flex justify-between">
              <Button className="grow !rounded-lg" onClick={shareToFriend}>
                <span className="flex items-center justify-center font-bold text-lg py-1">
                  Invite friends
                </span>
              </Button>
              <Button className="!ml-3 !rounded-lg">
                <div className="flex items-center">
                  <Image src={copy} width={25} height={25} />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
