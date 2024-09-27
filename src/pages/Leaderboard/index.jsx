import React, { useState, useEffect } from "react";
import { Image } from "antd-mobile";
import checked from "../../assets/checked.png";
import rank1 from "../../assets/rank1.svg";
import rank2 from "../../assets/rank2.svg";
import rank3 from "../../assets/rank3.svg";
import { Backdrop, CircularProgress } from "@mui/material";
import toast, { Toaster } from 'react-hot-toast';
import {
  api_credit_list, api_holder_count
} from "../../core/request/index";

import {
  storage_get_uid,
  storage_get_user_tg_data
} from "../../core/storage/index";

export default function Leaderboard() {

  const [holder, setHolder] = useState(1521)
  const [listData, setListData] = useState(
    [
      {
        username:"NA",
        credit:"0"
      }
    ]
  )

  const [selfData, setSelfData] = useState(
    {
      username:"NA",
      credit:"0",
      rank:0
    }
  )

  useEffect( () => {
    api_credit_list().then((data) => {
      // console.log("🔥 list ",data)
      setListData(data.data)
      const credit = (storage_get_user_tg_data())?.credit;
      setSelfData(credit)
      // console.log("🔥 credit ",credit)

      //Set the holders 
      // setHolder
      api_holder_count().then((d) => {
        // console.log("holder count ",d)
        if(d.code == 200 )
        {
          setHolder(d.data)
        }
      })
      setLoading(false)
    })
  }, []);
  
  const [loading, setLoading] = useState(true);
  
  return (

    <div className="min-h-full bg-black text-white flex flex-col w-full px-4 pt-10">

    <Toaster />
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <h1 className="text-center text-3xl font-bold">Telegram Wall of Fame</h1>

      <div className="flex justify-between  mt-8 bg-[#1C1C1E] rounded-xl text-base p-3">
        <div className="flex items-center">
          <Image className="mr-4" src={checked} width={40} height={40} />
          <div className="flex flex-col  font-bold">
            <p>{selfData.username}</p>
            <p className="text-gray-300">{selfData.credit} ASO</p>
          </div>
        </div>
        <div className="flex items-center font-bold">#{selfData.index}</div>
      </div>

      <h2 className="text-xl font-bold mt-14">{holder} holders</h2>

      <div>
        
        {listData.map((item, index) => (
          <div
            className="flex justify-between mt-2 rounded-xl text-base py-3"
            key={item}
          >
            <div className="flex items-center">
              <Image className="mr-4" src={checked} width={40} height={40} />
              <div className="flex flex-col  font-bold">
                <p>{item.username}</p>
                <p className="text-gray-300">{item.credit} ASO</p>
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
      <div className="SafeArea h-[70px] bg-black"></div>
    </div>
  );
}
