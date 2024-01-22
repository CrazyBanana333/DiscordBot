const tmi = require('tmi.js');
const fs = require('fs');
require('dotenv').config();

var cooks = 0;
var ableToCook = true;

console.log('STARTING BOT');

//timeout to kill bot
setTimeout(() =>  {
    client.disconnect();
    console.log('TWITCH DISCONNECTED...')
    process.exit(0);
}, (60*1000));
//(4*60*60*1000)


const data = fs.readFileSync('./data/program_data.json', {encoding: 'utf-8', flag: 'r'});
var jsonData = JSON.parse(data);

var access_token = jsonData.OAUTHTOKEN

cooks = jsonData.COOKS

const client = new tmi.Client({
    options: { debug: true },
    identity: {
        username: 'jang_bot',
        password: 'oauth:' + access_token
    },
    connection: {reconnect: true, },
    channels: [ 'shyjinn' ]
});

var interval = setInterval(() => {
    client.ping();
}, 300000);

async function startTwitchBot(){
    const data = fs.readFileSync('./data/program_data.json', {encoding: 'utf-8', flag: 'r'});
    client.opts.identity.password = 'oauth:' + JSON.parse(data).OAUTHTOKEN
    client.connect();
};

function diffRandomNum(prevNum, max){
    console.log(`prevNum: ${prevNum}`);
    randomNum = Math.floor(Math.random() * max);
    while (randomNum == prevNum){
        randomNum = Math.floor(Math.random() * max);
    }

    console.log(`newNum: ${randomNum}`);
    return randomNum;

}

var fightParticipants = {}
var textPicker = 0;



client.on('message', (channel, tags, message, self) => {
    if(self) return;

    switch(message.toLowerCase()){
        case '!c':
            client.say(channel, `@${tags.username} the commands are: !lurk, !youtube, !tiktok, !insta, !fight, !cooked, and !cooks`);
            break;

        case '!lurk':
            client.say(channel, `thank you @${tags.username} for lurking! shyjin1Heart`);
            break;
        case '!youtube':
            client.say(channel, `@${tags.username} https://www.youtube.com/channel/UCfqAgoVQHLWrovN0MeZKdhA`);
            break;
        case '!tiktok':
            client.say(channel, `@${tags.username} https://www.tiktok.com/@shyjinn_`);
            break;
        case '!insta':
            client.say(channel, `@${tags.username} https://www.instagram.com/shyjinnn`);
            break;
        case '!discord':
            client.say(channel, `@${tags.username} https://discord.com/invite/DNfkvfn6kZ`);
            break;
        case '!fight':           

            fightParticipants[tags.username] = tags.username;
            console.log(fightParticipants);
            if (Object.keys(fightParticipants).length >= 2){
                textPicker = diffRandomNum(textPicker, 3);
                fightersArr = Object.values(fightParticipants);
                const randomNum = Math.floor(Math.random() * (fightersArr.length));
                console.log(randomNum);
                console.log(`A ${fightersArr[randomNum]} was rolled`);

                if (textPicker == 0){
                    client.say(channel, `@${fightersArr[randomNum]} won the fight!`);
                } else if (textPicker == 1){
                    client.say(channel, `@${fightersArr[randomNum]} has emerged victorious!`);
                } else if (textPicker == 2){
                    client.say(channel, `@${fightersArr[randomNum]} wins!`);
                }
                for (const key in fightParticipants){
                    delete fightParticipants[key];
                }
            }
            break;
        case '!cooked':
            console.log(`ableToCook: ${ableToCook}\nCooks: ${jsonData.COOKS}`);
            if (ableToCook){
                ableToCook = false;
                jsonData.COOKS++;

                fs.writeFileSync('./data/program_data.json', JSON.stringify(jsonData))

                client.say(channel, `@shyjinn has been cooked ${jsonData.COOKS} time(s)`);

                setTimeout(() =>{
                    ableToCook=true;
                }, 60000);
            }
            break;
        case '!cooks':
            client.say(channel, `@shyjinn has been cooked ${jsonData.COOKS} time(s)`);
            break
        case '@jang_bot whats your opinion on toronto?':
            client.say(channel, 'There are more stabbings there than there are in london');
            break;
    }
});
module.exports = startTwitchBot;
