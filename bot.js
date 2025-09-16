// bot.js
// 安装依赖：npm install telegraf

const { Telegraf } = require("telegraf");

// 👉 把这里替换成你在 BotFather 拿到的 token
const BOT_TOKEN = "8341220496:AAE3cFC9Mv58GzWy-7BJO9ZOe0wtJqmJlRs";

if (!BOT_TOKEN) {
  throw new Error("请先在 bot.js 里填写你的 Bot Token！");
}

const bot = new Telegraf(BOT_TOKEN);

// 监听 /start 命令
bot.start((ctx) => {
  ctx.reply("点这里打开 WebApp 👇", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "打开我的WebApp",
            web_app: { url: "https://bwdog.vercel.app/" } // 你的 Vercel 部署地址
          }
        ]
      ]
    }
  });
});

bot.launch();
console.log("✅ Bot 已启动，去 Telegram 搜索你的机器人输入 /start 测试吧！");
