const startTwitchBot = require('./../src/twitchbot.js');
const refreshToken = require('./../src/tokenRefresh.js');

//START TWITCH BOT
refreshToken(startTwitchBot);

//restart every 4 hours
 setInterval(() => {
     refreshToken(startTwitchBot);
 }, (4*60*60*1000));