import React from "react";
import { Button, Image } from "antd-mobile";
import logo from "../../assets/cow.svg";
import copy from "../../assets/copy.svg";
import { telegramShare } from "../../core/tg/index";

export default function Friends() {
  function shareToFriend() {
    telegramShare(
      "🍺 Earn your COWS here ! ",
      "http://t.me/cowscoin_bot/app?startapp=invite1234"
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
              Invited friends: <span className="font-bold">0</span>
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
