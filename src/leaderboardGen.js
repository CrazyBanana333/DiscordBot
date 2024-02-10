const { Client, IntentsBitField, ActivityType, EmbedBuilder} = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const jimp = require('jimp');
const convertWebp = require('./convertWebp.js');


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.token = process.env.TOKEN;

imagepath = 'image_data/profile'

clientIds = ['313804585577873409', '405510488173051915', '285547159359717376']

async function startLeaderboardGen(userarr, coinsarr, callback){
    for(i = 0; i < 3; i++) {
        await convertWebp(userarr[i].displayAvatarURL(), imagepath);
        await generateLeaderboard(userarr[i].displayName, coinsarr[i], i + 1)
    }

    callback();

}

async function generateLeaderboard(username, coins, place) {
    return new Promise(async (resolve) => {
        if (place == 1) {
            image = await jimp.read(`${imagepath}.png`);
            mask = await jimp.read('image_data/mask.png');
            
            image.resize(380, 380);
            image.mask(mask, 0, 0);
    
            podium = await jimp.read(`image_data/podium.png`);
    
            podium.blit(image, 820, 520);
    
            if (username.length > 20){
                font = await jimp.loadFont('image_data/font/comic-sans-48.fnt');
                podium.print(
                    font,
                    505,
                    990,
                    {
                        text: username,
                        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: jimp.VERTICAL_ALIGN_BOTTOM
                    },
                    1000,
                    0
                );
            } else {
                font = await jimp.loadFont('image_data/font/comic-sans-72.fnt');
                podium.print(
                    font,
                    505,
                    990,
                    {
                        text: username,
                        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: jimp.VERTICAL_ALIGN_BOTTOM
                    },
                    1000,
                    0
                );
            }
    
            font = await jimp.loadFont('image_data/font/comic-sans-32.fnt');
            podium.print(
                font,
                505,
                995,
                {
                    text: `${coins} Jinncoins`,
                    alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: jimp.VERTICAL_ALIGN_TOP
                },
                1000,
                0
            ).write('image_data/podium-leaderboard.png');
        }else if (place == 2) {
            image = await jimp.read(`${imagepath}.png`);
            mask = await jimp.read('image_data/mask.png');
            
            image.resize(380, 380);
            image.mask(mask, 0, 0);
    
            podium = await jimp.read(`image_data/podium-leaderboard.png`);
    
            podium.blit(image, 212, 842);
    
            if (username.length > 20){
                font = await jimp.loadFont('image_data/font/comic-sans-48.fnt');
                podium.print(
                    font,
                    -100,
                    1315,
                    {
                        text: username,
                        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: jimp.VERTICAL_ALIGN_BOTTOM
                    },
                    1000,
                    0
                );
            } else {
                font = await jimp.loadFont('image_data/font/comic-sans-72.fnt');
                podium.print(
                    font,
                    -100,
                    1315,
                    {
                        text: username,
                        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: jimp.VERTICAL_ALIGN_BOTTOM
                    },
                    1000,
                    0
                );
            }
    
            font = await jimp.loadFont('image_data/font/comic-sans-32.fnt');
            podium.print(
                font,
                -100,
                1320,
                {
                    text: `${coins} Jinncoins`,
                    alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: jimp.VERTICAL_ALIGN_TOP
                },
                1000,
                0
            ).write('image_data/podium-leaderboard.png');
        } else if (place == 3) {
            image = await jimp.read(`${imagepath}.png`);
            mask = await jimp.read('image_data/mask.png');
            
            image.resize(380, 380);
            image.mask(mask, 0, 0);
    
            podium = await jimp.read(`image_data/podium-leaderboard.png`);
    
            podium.blit(image, 1470, 1000);
    
            if (username.length > 20){
                font = await jimp.loadFont('image_data/font/comic-sans-48.fnt');
                podium.print(
                    font,
                    1160,
                    1475,
                    {
                        text: username,
                        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: jimp.VERTICAL_ALIGN_BOTTOM
                    },
                    1000,
                    0
                );
            } else {
                font = await jimp.loadFont('image_data/font/comic-sans-72.fnt');
                podium.print(
                    font,
                    1160,
                    1475,
                    {
                        text: username,
                        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: jimp.VERTICAL_ALIGN_BOTTOM
                    },
                    1000,
                    0
                );
            }
    
            font = await jimp.loadFont('image_data/font/comic-sans-32.fnt');
            podium.print(
                font,
                1160,
                1480,
                {
                    text: `${coins} Jinncoins`,
                    alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: jimp.VERTICAL_ALIGN_TOP
                },
                1000,
                0
            ).write('image_data/podium-leaderboard.png');
        }
        resolve();
    })
    
}


module.exports = startLeaderboardGen;