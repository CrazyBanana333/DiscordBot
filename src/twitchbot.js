const tmi = require('tmi.js');
const fs = require('fs');
require('dotenv').config();

var cooks = 0;
var ableToCook = true;

async function startBot(){
    console.log('STARTING BOT');

    //timeout to kill bot
    setTimeout(() =>  {
        client.disconnect();
        console.log('TWITCH DISCONNECTED...')
    }, (4*60*60*1000));

    const data = fs.readFileSync('./program_data.json', {encoding: 'utf-8', flag: 'r'});

    var jsonData = JSON.parse(data);

    var access_token = jsonData.OAUTHTOKEN

    cooks = jsonData.COOKS

    const client = new tmi.Client({
        options: { debug: true },
        identity: {
            username: 'jang_bot',
            password: 'oauth:' + access_token
        },
        channels: [ 'shyjinn' ]
    });

    client.connect();

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
        // Ignore echoed messages.
        if(self) return;

        if(message.toLowerCase() === '!c') {
            // "@alca, heya!"
            client.say(channel, `@${tags.username} the commands are: !lurk, !youtube, !tiktok, !insta, !fight, !cooked, and !cooks`);

        } else if (message.toLowerCase() === '!lurk') {
            client.say(channel, `thank you @${tags.username} for lurking! shyjin1Heart`);
        } else if (message.toLowerCase() === '!youtube') {
            client.say(channel, `@${tags.username} https://www.youtube.com/channel/UCfqAgoVQHLWrovN0MeZKdhA`);
        } else if (message.toLowerCase() === '!tiktok'){
            client.say(channel, `@${tags.username} https://www.tiktok.com/@shyjinn_`);
        } else if (message.toLowerCase() === '!insta'){
            client.say(channel, `@${tags.username} https://www.instagram.com/shyjinnn`);
        } else if (message.toLowerCase() === '!fight'){
            

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
        } else if (message.toLowerCase() === '!cooked'){
            console.log(`ableToCook: ${ableToCook}\nCooks: ${jsonData.COOKS}`);
            if (ableToCook){
                ableToCook = false;
                jsonData.COOKS++;

                fs.writeFileSync('./program_data.json', JSON.stringify(jsonData))

                client.say(channel, `@shyjinn has been cooked ${jsonData.COOKS} time(s)`);

                setTimeout(() =>{
                    ableToCook=true;
                }, 60000);
            }
        } else if (message.toLowerCase() === '!cooks'){
            client.say(channel, `@shyjinn has been cooked ${jsonData.COOKS} time(s)`);
        } else if (message.toLowerCase() === '@jang_bot whats your opinion on toronto?'){
            client.say(channel, 'There are more stabbings there than there are in london');
        }
    });
};
module.exports = startBot;
