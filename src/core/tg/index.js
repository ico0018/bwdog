
import {  initMiniApp } from '@telegram-apps/sdk-react';
import { Route, Routes ,useRoutes} from "react-router-dom";

function miniapp_init() {
    let decodeData = {
        isTelegram :false,
        initData:{},
        hasStarData:false,
        starData:""
    }
    try{

        const r = window.location.href;

        const path = r;

        const tmp0 = path.split("#");

        if(tmp0.length>1)
        {
            const temp1 = tmp0[1]
            
            const temp2 = temp1.split("tgWebAppData=");

            if(temp2.length>1)
            {
                decodeData.initData ={initData:temp2[1]}
                decodeData.isTelegram=true;

            }
            // const initData = useLaunchParams().initDataRaw;
            // decodeData.initData ={initData:initData}
        }
        if(tmp0.length>0)
        {
            const temp3 = tmp0[0].split("tgWebAppStartParam=")
            if(temp3.length>1)
            {
                decodeData.starData = temp3[1];
                decodeData.hasStarData=true;
            }
        }
        

    }catch(e)
    {
        console.log(e)
       
    }
    return decodeData

    
}


function tryCloseWebappWindows()
{
    try{

        const [miniApp] = initMiniApp();
        miniApp.close();
    }catch(e)
    {
        console.error(e)
    }
}

function telegramShare(words,path)
{
    // Route.navigator(
    //     encodeURI(`https://t.me/share/url?url=${path}&text=${words}`)
    // )
}

function telegramShareApp()
{
    telegramShare("url","🍬 Use your multiChain assert here ! 🍬")
}

export {
    miniapp_init,
    tryCloseWebappWindows,
    telegramShareApp,
    telegramShare
}