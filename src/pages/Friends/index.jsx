import React from "react";
import { Button, Image } from "antd-mobile";
import logo from "../../assets/cow.svg";

export default function Friends() {
  return (
    <>
      <div className="min-h-full bg-black text-white flex flex-col w-full px-4 pt-10">
        <h1 className="text-center text-3xl font-bold">
          Invite friends <br /> and get more DOGS
        </h1>
        <div className="grow mb-[56px] relative flex flex-col items-center">
          <Image className="mr-1 mt-5" src={logo} width={150} height={150} />
          <h2 className=" font-medium text-2xl text-center mt-16">
            Tap on the button to irinvite your friends
          </h2>
          <Button className="w-full !absolute bottom-0 !rounded-lg">
            <span className="flex items-center justify-center font-bold text-lg py-1">
              Invite friends
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}
