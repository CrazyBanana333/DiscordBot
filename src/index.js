const startTwitchBot = require('./twitchbot.js');
const refreshToken = require('./tokenRefresh.js');
const startDiscordBot = require('./discordBot.js');

//START TWITCH BOT
refreshToken(startTwitchBot);
//restart every 4 hours
 setInterval(() => {
     refreshToken(startTwitchBot);
 }, (4*60*60*1000));

 //START DISCORD BOT
 startDiscordBot();
