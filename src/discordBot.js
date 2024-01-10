require('dotenv').config();
const fs = require('fs');
const getVideo = require('./YoutubeRequest.js');
const streamRequest = require('./TwitchRequest.js');

var mostRecentUploadDate = new Date(0);

const { Client, IntentsBitField, ActivityType} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

//FUNCTIONS
function initializeDate(data){
    mostRecentUploadDate = new Date(data.snippet.publishedAt);
    console.log('Date initialized as ' + mostRecentUploadDate);
}


function pollVideo(data){
    
    publishDate = new Date(data.snippet.publishedAt);

    console.log("\nmostRecentUploadDate: " + mostRecentUploadDate + "\nCurrent Upload Date: " + publishDate.toString() + "\nVideo Title: " + data.snippet.title + "\nVideo Id: " + data.id.videoId + "\n");
    
    if (publishDate > mostRecentUploadDate){
        mostRecentUploadDate = publishDate;
        client.channels.fetch(process.env.YOUTUBECHANNELID)
        .then(channel => {
            channel.send('<@&1190910279236735067>\n 🎉 NEW VIDEO GO WATCH IT RIGHT NOW 🎉\nhttps://www.youtube.com/watch?v=' + data.id.videoId);
        })
    }
    
}

function pollLive(data){
    if (data.length == 0 && jsonData.isLive == true){
        client.channels.fetch(process.env.ANNOUNCEMENTSCHANNELID)
        .then(channel => {
            channel.send('bro went offline im sobbing :((((');
        })
        client.user.setPresence({
            activities: [{
                name: "the sound of my own tears :(",
                url: "https://www.twitch.tv/shyjinn",
                state: "crying and sobbing rn",
                type: ActivityType.Listening
            }]
        })
        jsonData.isLive = false;
        fs.writeFileSync('./program_data.json', JSON.stringify(jsonData));

        console.log('Shyjinn is no longer live');
        return;
    } else if (data.length > 0 && jsonData.isLive == false){
        client.channels.fetch(process.env.ANNOUNCEMENTSCHANNELID)
        .then(channel => {
            channel.send('<@&1190402493260251256> HE JUST WENT LIVE GO WATCH HIM AT https://www.twitch.tv/shyjinn RIGHT NOW\n' + data[0].title);
        })
            client.user.setPresence({
        activities: [{
            name: "ShyJinn",
            url: "https://www.twitch.tv/shyjinn",
            state: "at https://www.twitch.tv/shyjinn right now",
            type: ActivityType.Watching
        }]
    })
        jsonData.isLive = true;
        fs.writeFileSync('./program_data.json', JSON.stringify(jsonData));
        console.log('Shyjinn is now live');
        return;
    }
}

//DISCORD STUFF
client.on('ready', (c) => {
    console.log(`${c.user.tag} is logged in`);
//MAKE SURE YOU WONT MAX OUT YOUTUBE API BEFORE UNCOMMENTING THESE
    getVideo(process.env.APIKEY, initializeDate);
    setInterval(function(){
         streamRequest(process.env.AUTHCODE, process.env.CLIENTID, pollLive)

    }, 120000)
    setInterval(function(){
        getVideo(process.env.APIKEY, pollVideo)
    }, 900000)

    client.user.setPresence({
        activities: [{
            name: "the sound of my own tears :(",
            url: "https://www.twitch.tv/shyjinn",
            state: "crying and sobbing rn",
            type: ActivityType.Listening
        }]
    })
        
})

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'announce'){
        try{
            const message = interaction.options.get('message');
            const channel = interaction.options.get('channel');
            console.log('sent message "' + message.value + '" to ' + channel.channel.name);
            channel.channel.send(message.value);
            interaction.reply({content: 'Message sent to ' + channel.channel.name, ephemeral: true});  
        } catch {
            console.log('there was an error with the "announce" command ' + error);
        }
      
    }
})

client.on('messageCreate', (message) => {    
    if (message.author.bot){
        return;
    }

    switch (message.content){
        case 'should i watch twitch.tv/shyjinn?':
        case 'send the gif':
            message.reply("https://tenor.com/view/shyjinn-shyjinn-twitch-stream-twitch-gif-11659758548203600062");
            break;
        case 'is shyjinn live rn?':
            if(jsonData.isLive){
                message.reply("You bet your ass he is");
            } else {
                message.reply("I wish :(");
            }
            break;
        case 'test':
            //message.reply('winnig');
            break;
        case 'date':
            //message.reply(mostRecentUploadDate.toString());
            break;
    }
    function ifLive(data){
        if (data.length === 0){
            message.reply("my favorite streamer shyjinn is not live currently :(((")
            return false;
        } else {
            message.reply("HES LIVE GO WATCH HIM AT https://www.twitch.tv/shyjinn RIGHT NOW")
            return true;
        }
    }


}
);


async function startDiscordBot(){
    client.login(process.env.TOKEN);
}

module.exports = startDiscordBot;
