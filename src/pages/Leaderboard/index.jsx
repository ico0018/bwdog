import React from "react";
import { Image } from "antd-mobile";
import checked from "../../assets/checked.png";
import rank1 from "../../assets/rank1.svg";
import rank2 from "../../assets/rank2.svg";
import rank3 from "../../assets/rank3.svg";

export default function Leaderboard() {
  return (
    <div className="min-h-full bg-black text-white flex flex-col w-full px-4 pt-10">
      <h1 className="text-center text-3xl font-bold">Telegram Wall of Fame</h1>

      <div className="flex justify-between  mt-8 bg-[#1C1C1E] rounded-xl text-base p-3">
        <div className="flex items-center">
          <Image className="mr-4" src={checked} width={40} height={40} />
          <div className="flex flex-col  font-bold">
            <p>jackchanelx</p>
            <p className="text-gray-300">0 COWS</p>
          </div>
        </div>
        <div className="flex items-center font-bold">#84578392</div>
      </div>

      <h2 className="text-xl font-bold mt-14">44.4M holders</h2>

      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
          <div
            className="flex justify-between mt-2 rounded-xl text-base py-3"
            key={item}
          >
            <div className="flex items-center">
              <Image className="mr-4" src={checked} width={40} height={40} />
              <div className="flex flex-col  font-bold">
                <p>jackchanelx</p>
                <p className="text-gray-300">0 COWS</p>
              </div>
            </div>
            <div className="flex items-center">
              {index === 0 && <Image src={rank1} width={35} height={35} />}
              {index === 1 && <Image src={rank2} width={35} height={35} />}
              {index === 2 && <Image src={rank3} width={35} height={35} />}
              {index > 2 && (
                <span className="mr-2 font-semibold">#{index + 1}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
