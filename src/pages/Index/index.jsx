import React from "react";
import Navigator from "../../components/Navigator";
import logo from "../../assets/cow.svg";
import wallet from "../../assets/wallet.png";
import checked from "../../assets/checked.png";
import { Button, Image } from "antd-mobile";
import { connect } from "../../core/wallet/tonconnectUI";
import { miniapp_init } from "../../core/tg/index";
import { useNavigate } from "react-router-dom";

function MiniButton() {
  return (
    <>
      <div className="bg-white rounded-full text-black text-center w-fit font-extrabold p-2 mt-3 active:bg-gray-600 transition-all duration-75">
        Share
      </div>
    </>
  );
}

export default function Index() {
  miniapp_init();

  const router = useNavigate();

  function toWelcome() {
    router("/welcome");
  }

  return (
    <div className="bg-black  text-white px-4">
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

        <h1 className="text-4xl mt-5">838</h1>
        <h2 className="text-xl text-gray-300 font-medium">COWS</h2>

        {/* TODO:Cards Component */}
        <div className="w-full mt-5 bg-gray-800 rounded-xl p-5 text-sm">
          <p className="text-xl  font-bold">Share your OG Status</p>
          <p>In Telegram stories</p>
          <MiniButton></MiniButton>
        </div>

        <div className="w-full text-xl mt-5">
          <h1>Tasks</h1>

          <div className="flex justify-between text-sm  mt-3">
            <div className="flex items-center">
              <Image className="mr-4" src={checked} width={35} height={35} />
              <div className="flex flex-col">
                <p>Share your story</p>
                <p className="text-gray-300">+1,000 COWS</p>
              </div>
            </div>
            <MiniButton></MiniButton>
          </div>

          <div className="flex justify-between text-sm  mt-3">
            <div className="flex items-center">
              <Image className="mr-4" src={checked} width={35} height={35} />
              <div className="flex flex-col">
                <p>Follow us on Twitter</p>
                <p className="text-gray-300">+50 COWS</p>
              </div>
            </div>
            <MiniButton></MiniButton>
          </div>
        </div>
      </div>
    </div>
  );
}
