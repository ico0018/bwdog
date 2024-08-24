import React from "react";
import logo from "../logo.svg";
import { Image } from "antd-mobile";

export default function Navigator() {
  return (
    <header className="bg-slate-400 h-16 flex items-center">
      <div className="container mx-auto flex justify-center items-center text-white text-lg">
        <Image
          className="mr-2"
          src={logo}
          width={35}
          height={35}
          fit="cover"
          style={{ borderRadius: "50%" }}
        />
        <p>Your Score</p>
      </div>
    </header>
  );
}
