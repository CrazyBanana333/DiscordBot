const startTwitchBot = require('./../src/twitchbot.js');
const refreshToken = require('./../src/tokenRefresh.js');

//START TWITCH BOT
refreshToken(startTwitchBot);
