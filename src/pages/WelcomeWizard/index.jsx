import { useMemo, useState } from "react";
import demon1 from "../../assets/demon_eva.svg";
import demon2 from "../../assets/demon_gulom.svg";
import demon3 from "../../assets/demon_jackey.svg";
import demon4 from "../../assets/demon_laser.svg";
import demon5 from "../../assets/demon_thinta.svg";
import { Image, Button } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import React from "react";

function Steps(props) {
  const steps = [];
  for (let i = 0; i < 5; i++) {
    steps.push(
      <div
        key={i}
        className={`w-12 h-1 mr-3 rounded-full last:mr-0 bg-[#83B6F0] ${
          props.step === i ? "!bg-white" : ""
        }`}
      ></div>
    );
  }
  return <div className="flex justify-center px-10">{steps}</div>;
}

export default function WelcomeWizard() {
  const navgator = useNavigate();

  const [step, setStep] = useState(0);

  const tipList = useMemo(() => {
    return [
      {
        title: (
          <>
            Your sticker <br /> collection
          </>
        ),
        desc: "Create your own sticker pack with unique Dogs",
        img: demon1,
        btnTitle: "Wow, what",
      },
      {
        title: (
          <>
            Catch the <br /> rare stickers
          </>
        ),
        desc: "Collect rare stickers in your pack before others do",
        img: demon2,
        btnTitle: "Oh!",
      },
      {
        title: (
          <>
            Mint and trade <br /> your stickers
          </>
        ),
        desc: "Mint and trade your stickers on the NFT marketplace",
        img: demon3,
        btnTitle: "Yayyy",
      },
      {
        title: (
          <>
            Earn stickers that <br /> no one can buy
          </>
        ),
        desc: "Donate to charities, join activities or just be real OG",
        img: demon4,
        btnTitle: "OMG I WANT IT!",
      },
      {
        title: (
          <>
            You've got some
            <br />
            unique stickers
            <br />
            already
          </>
        ),
        desc: "But no rush, the plantform is cooking so be ready to chaim it first",
        img: demon5,
        btnTitle: "Okaaay, will get back",
      },
    ];
  }, []);

  function nextTip() {
    if (step < 4) {
      setStep(step + 1);
    } else {
      navgator("/");
    }
  }

  return (
    <>
      <div className="bg-[#1E89D6]  h-full relative pt-8">
        <Steps step={step} />
        <div className="text-white font-bold ">
          <h1 className=" text-3xl  px-10 text-center pt-8">
            {tipList[step].title}
          </h1>

          <div className="flex justify-center pt-8">
            {tipList.map((tip, index) => (
              <div key={tip.title} className={index === step ? "" : "hidden"}>
                <Image
                  src={tip.img}
                  width={"100%"}
                  height={300}
                  fallback={<></>}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 m-auto w-full p-4">
          <p className="text-white font-bold text-center text-base mb-8 px-16">
            {tipList[step].desc}
          </p>
          <Button className="font-bold" block size="large" onClick={nextTip}>
            {tipList[step].btnTitle}
          </Button>
        </div>
      </div>
    </>
  );
}
