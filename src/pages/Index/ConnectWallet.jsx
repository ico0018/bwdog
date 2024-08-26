import { Popup, Image } from "antd-mobile";
import React, { useState, useImperativeHandle } from "react";
import qrcode from "../../assets/qrcode.png";
import closeIcon from "../../assets/close.png";
import wallet_w from "../../assets/wallet_w.png";
import tg from "../../assets/Telegram_logo.svg";
import ask from "../../assets/ask.png";
const ConnectWallet = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(true);

  const close = () => {
    setVisible(false);
  };

  const open = () => {
    setVisible(true);
  };

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Popup
      visible={visible}
      onMaskClick={close}
      bodyStyle={{
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        minHeight: "40vh",
        backgroundColor: "#111827",
      }}
    >
      <div className="popupbody">
        {/* Action bar */}
        <div className="flex justify-between items-center p-4">
          <div className="rounded-full bg-gray-700 flex items-center justify-center w-[30px] h-[30px]">
            <Image src={qrcode} width={20} height={20} />
          </div>
          <div
            onClick={close}
            className="rounded-full bg-gray-700 flex items-center justify-center w-[30px] h-[30px]"
          >
            <Image src={closeIcon} width={20} height={20} />
          </div>
        </div>
        {/* Content */}
        <div className="flex flex-col items-center px-6">
          <h1 className="text-white text-xl font-bold">Connect your wallet</h1>
          <p className="mt-2 text-gray-400 text-lg text-center">
            Open Wallet in Telegram or select your wallet to connect
          </p>
          <div className="mt-4 flex justify-around items-center text-white w-full bg-[#31A6F5] rounded-xl h-12 ">
            <Image src={wallet_w} width={30} height={30} />
            <span className="text-lg font-bold">Open Wallet in Telegram</span>
            <Image src={tg} width={30} height={30} />
          </div>
          {/* TODO: Wallets List */}
        </div>
      </div>
      <div className="flex justify-between text-sm px-6 absolute bottom-0 p-5 w-full">
        <div className="flex items-center">
          <Image className="mr-4" src={tg} width={35} height={35} />
          <p className="text-white text-xl">TON Connect</p>
        </div>
        <div className="rounded-full bg-gray-700 flex items-center justify-center w-[30px] h-[30px]">
          <Image src={ask} width={20} height={20} />
        </div>
      </div>
    </Popup>
  );
});

ConnectWallet.displayName = "ConnectWallet";

export default ConnectWallet;
