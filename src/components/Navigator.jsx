import React from "react";
import logo from "../assets/cow.svg";
import { Button, Image } from "antd-mobile";
import { useNavigate } from "react-router-dom";

export default function Navigator() {
  const router = useNavigate();
  function toWelcome() {
    router("/welcome");
  }
  return (
    <header className="h-20 flex items-center" style={{backgroundColor:"RGB(20,110,223)"}}>
      <div className="container mx-auto flex justify-center items-center text-white text-lg" style={{width:"100%"}} >
        <Image
          className="mr-2"
          src={logo}
          width={35}
          height={35}
          fit="cover"
          style={{ borderRadius: "50%" }}
        />
        <p>COWS comming &nbsp; &nbsp;  &nbsp;</p> 
        <Button className="!rounded-xl" style={{marginRight:"0px"}} onClick={toWelcome}>
              <span className="flex items-center justify-center font-bold text-lg py-1">
                Whaat
              </span>
            </Button>
      </div>
    </header>
  );
}
