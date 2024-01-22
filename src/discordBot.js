require('dotenv').config();
const fs = require('fs');
const getVideo = require('./YoutubeRequest.js');
const streamRequest = require('./TwitchRequest.js');
const schedule = require('node-schedule');

var jsonData = JSON.parse(fs.readFileSync('./data/program_data.json', {encoding: 'utf-8', flag: 'r'}));

var mostRecentUploadDate = new Date(0);

const { Client, IntentsBitField, ActivityType, EmbedBuilder} = require('discord.js');

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

        jsonData.isLive = false;
        fs.writeFileSync('./data/program_data.json', JSON.stringify(jsonData));

        console.log('Shyjinn is no longer live');
        return;
    } else if (data.length > 0 && jsonData.isLive == false){
        client.channels.fetch(process.env.ANNOUNCEMENTSCHANNELID)
        .then(channel => {
            channel.send('<@&1190402493260251256> HE JUST WENT LIVE GO WATCH HIM AT https://www.twitch.tv/shyjinn RIGHT NOW\n' + data[0].title);
        })

        jsonData.isLive = true;
        fs.writeFileSync('./data/program_data.json', JSON.stringify(jsonData));
        console.log('Shyjinn is now live');
        return;
    }

    if (jsonData.isLive == false) {
        newStatus = Math.floor(Math.random() * 4);
        switch (newStatus){
            case 0:
                client.user.setPresence({
                    activities: [{
                        name: "the sound of my own tears :(",
                        url: "https://www.twitch.tv/shyjinn",
                        state: "crying and sobbing rn",
                        type: ActivityType.Listening
                    }]
                });
                break;
            case 1:
                client.user.setPresence({
                    activities: [{
                        name: "a sadness contest",
                        url: "https://www.twitch.tv/shyjinn",
                        state: "because my favorite streamer is offline :(",
                        type: ActivityType.Competing
                    }]
                });
                break;
            case 2:
                client.user.setPresence({
                    activities: [{
                        name: "shyjinns offline chat waiting",
                        url: "https://www.twitch.tv/shyjinn",
                        state: "he'll be here any second I know it",
                        type: ActivityType.Watching
                    }]
                });
                break;
            case 3:
                client.user.setPresence({
                    activities: [{
                        name: "waiting",
                        url: "https://www.twitch.tv/shyjinn",
                        state: "Waiting for shyjinn at a medium pace",
                        type: ActivityType.Custom
                    }]
                });
                break;
        }
    } else {
        newStatus = Math.floor(Math.random() * 3);
        switch (newStatus){
            case 0:
                client.user.setPresence({
                    activities: [{
                        name: "ShyJinn",
                        url: "https://www.twitch.tv/shyjinn",
                        state: "at https://www.twitch.tv/shyjinn right now",
                        type: ActivityType.Watching
                    }]
                });
                break;
            case 1:
                client.user.setPresence({
                    activities: [{
                        name: "HES STREAMING",
                        url: "https://www.twitch.tv/shyjinn",
                        state: "HES STREAMING! MY FAVORITE STREAMER SHYJINN",
                        type: ActivityType.Custom
                    }]
                });
                break;
            case 2:
                client.user.setPresence({
                    activities: [{
                        name: "in a gift sub competition",
                        url: "https://www.twitch.tv/shyjinn",
                        state: "i will gift the most",
                        type: ActivityType.Competing
                    }]
                });
                break;
        }
    }
}

//YOUTUBE AND TWITCH POLLING
client.on('ready', (c) => {
    console.log(`${c.user.tag} is logged in`);
    console.log('Current directory: ' + process.cwd());
//MAKE SURE YOU WONT MAX OUT YOUTUBE API BEFORE UNCOMMENTING THESE
    // getVideo(process.env.APIKEY, initializeDate);
    // setInterval(function(){
    //      streamRequest(process.env.AUTHCODE, process.env.CLIENTID, pollLive)
    // }, 120000)
    // setInterval(function(){
    //     getVideo(process.env.APIKEY, pollVideo)
    // }, 900000)

    newStatus = Math.floor(Math.random() * 4);
        switch (newStatus){
            case 0:
                client.user.setPresence({
                    activities: [{
                        name: "the sound of my own tears :(",
                        url: "https://www.twitch.tv/shyjinn",
                        state: "crying and sobbing rn",
                        type: ActivityType.Listening
                    }]
                });
                break;
            case 1:
                client.user.setPresence({
                    activities: [{
                        name: "a sadness contest",
                        url: "https://www.twitch.tv/shyjinn",
                        state: "because my favorite streamer is offline :(",
                        type: ActivityType.Competing
                    }]
                });
                break;
            case 2:
                client.user.setPresence({
                    activities: [{
                        name: "shyjinns offline chat waiting",
                        url: "https://www.twitch.tv/shyjinn",
                        state: "he'll be here any second I know it",
                        type: ActivityType.Watching
                    }]
                });
                break;
            case 3:
                client.user.setPresence({
                    activities: [{
                        name: "waiting",
                        url: "https://www.twitch.tv/shyjinn",
                        state: "Waiting for shyjinn at a medium pace",
                        type: ActivityType.Custom
                    }]
                });
                break;
        }
        
});

console.log("READING JINNCOINUSERSTORE");

try{
    jinnCoinUserStore = JSON.parse(fs.readFileSync('./data/jinnCoinUserStore.json', {encoding: 'utf-8'}));
} catch {
    console.log('FILE NONEXISTANT... CREATING NEW FILE')
    fs.writeFileSync('./data/jinnCoinUserStore.json', '{}');
    jinnCoinUserStore = JSON.parse(fs.readFileSync('./data/jinnCoinUserStore.json', {encoding: 'utf-8'}));
}

console.log("READING DAILYCOINUSERDATES")
try{
    dailyCoinUserDates = JSON.parse(fs.readFileSync('./data/dailyCoinUserDates.json', {encoding: 'utf-8'}));
} catch {
    console.log('FILE NONEXISTANT... CREATING NEW FILE')
    fs.writeFileSync('./data/dailyCoinUserDates.json', '{}');
    dailyCoinUserDates = JSON.parse(fs.readFileSync('./data/dailyCoinUserDates.json', {encoding: 'utf-8'}));
}

corpaEmbed = new EmbedBuilder()
    .setColor(0x21aa48)
    .setTitle('CORPA')
    .setDescription('Corpa has begun')
    .setAuthor({name: 'Corpa', iconURL: 'https://pbs.twimg.com/media/FdC-dP1WAAAULq_.png'})
    .addFields(
        { name: 'To bet on buy:' + '\u2800'.repeat(3), value: 'Do /buy\n\n**Coins on buy:**\n0 Jinn Coins', inline: true},

        { name: 'To bet on sell:' + '\u2800'.repeat(3), value: 'Do /sell\n\n**Coins on sell:**\n0 Jinn Coins', inline:true},
        { name: '\u2800', value: '\n**Time Left:**\n60 mins', inline: true},
    )

buyWinEmbed = new EmbedBuilder()
        .setColor(0x1e69ff)
        .setTitle('BUY HAS WON')
        .setDescription('Participants should get a DM shortly')
sellWinEmbed = new EmbedBuilder()
        .setColor(0xe0008e)
        .setTitle('SELL HAS WON')
        .setDescription('Participants should get a DM shortly')
var usersBetBuy = {};
var buyBetTotal = 0;

var usersBetSell = {};
var sellBetTotal = 0;

var corpaStarted = false;

var corpaTimer = 60;
var corpaInterval;

var corpaMessage = 'empty';

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    switch(interaction.commandName){
    case 'announce':
        try{
            const message = interaction.options.get('message');
            const channel = interaction.options.get('channel');
            channel.channel.send(message.value);
            console.log('sent message "' + message.value + '" to ' + channel.channel.name);
            interaction.reply({content: 'Message sent to ' + channel.channel.name, ephemeral: true});  
        } catch {
            console.log('there was an error with the "announce" command');
        }
        break;
    
    case 'corpa':
        interaction.reply({content: 'started corpa', ephemeral: true});
        startCorpa();
        break;

    case 'coins':
        if (interaction.user.id in jinnCoinUserStore){
            interaction.reply({content: `<@${interaction.user.id}> you have ${jinnCoinUserStore[interaction.user.id]} JinnCoins`});
        } else {
            jinnCoinUserStore[interaction.user.id] = 500;
            interaction.reply({content: `Welcome <@${interaction.user.id}>! Heres ${jinnCoinUserStore[interaction.user.id]} JinnCoins to start you off`});
            fs.writeFileSync('./data/jinnCoinUserStore.json', JSON.stringify(jinnCoinUserStore));
        }
        break;
    case 'buy':
        if (corpaStarted){  
            const coins = interaction.options.get('coins');
            if (interaction.user.id in usersBetSell || interaction.user.id in usersBetBuy){
                interaction.reply({content: `You've already made your bet`, ephemeral: true});
            } else if (!(interaction.user.id in jinnCoinUserStore)){
                interaction.reply({content: `You don't have any coins yet! Do /coins to get started`, ephemeral: true});
            } else if (coins.value > jinnCoinUserStore[interaction.user.id]) {
                interaction.reply({content: `You don't have that many coins`, ephemeral: true});
            } else if (coins.value < 1){
                interaction.reply({content: `You cant bet non positive number`, ephemeral: true});
            } else {
                usersBetBuy[interaction.user.id] = coins.value;
                jinnCoinUserStore[interaction.user.id] -= coins.value;
                buyBetTotal += coins.value;
                corpaEmbed.data.fields[0].value = 'Do /buy\n\n**Coins on buy:**\n' + buyBetTotal + ' Jinn Coins';
                corpaMessage.edit({embeds: [corpaEmbed]})
                fs.writeFileSync('./data/jinnCoinUserStore.json', JSON.stringify(jinnCoinUserStore));
                interaction.reply({content: `${coins.value} JinnCoins have been bet on buy`, ephemeral: true});
                
            }
        } else if (!interaction.user.id in jinnCoinUserStore){
            interaction.reply({content: `You don't have any coins yet! Do /coins to get started`, ephemeral: true});  
        } else {
            interaction.reply({content: `Corpa isnt running right now :(`, ephemeral: true});
        }
        break;
    case 'sell':
        if (corpaStarted){
            const coins = interaction.options.get('coins');
            if (interaction.user.id in usersBetSell || interaction.user.id in usersBetBuy){
                interaction.reply({content: `You've already made your bet`, ephemeral: true});
            } else if (!(interaction.user.id in jinnCoinUserStore)){
                interaction.reply({content: `You don't have any coins yet! Do /coins to get started`, ephemeral: true});  
            } else if (coins.value > jinnCoinUserStore[interaction.user.id]) {
                interaction.reply({content: `You don't have that many coins`, ephemeral: true});
            } else if (coins.value < 1){
                interaction.reply({content: `You cant bet non positive number`, ephemeral: true});
            } else {
                usersBetSell[interaction.user.id] = coins.value;
                jinnCoinUserStore[interaction.user.id] -= coins.value;
                sellBetTotal += coins.value;
                corpaEmbed.data.fields[1].value = 'Do /sell\n\n**Coins on sell:**\n' + sellBetTotal + ' Jinn Coins';
                corpaMessage.edit({embeds: [corpaEmbed]})
                fs.writeFileSync('./data/jinnCoinUserStore.json', JSON.stringify(jinnCoinUserStore));
                interaction.reply({content: `${coins.value} JinnCoins have been bet on sell`, ephemeral: true});
            }
        } else if (!interaction.user.id in jinnCoinUserStore){
            interaction.reply({content: `You don't have any coins yet! Do /coins to get started`, ephemeral: true});  
        } else {
            interaction.reply({content: `Corpa isnt running right now :(`, ephemeral: true});
        }
        break;
    case 'dc':
        if (!(interaction.user.id in jinnCoinUserStore)){
        interaction.reply({content: `You don't have any coins yet! Do /coins to get started`, ephemeral: true});  
        } else if (interaction.user.id in dailyCoinUserDates){
            lastCalled = Date.parse(dailyCoinUserDates[interaction.user.id])
            now = new Date();
            if (now - lastCalled > 1000 * 60 * 60 * 24){
                jinnCoinUserStore[interaction.user.id] += 100;
                fs.writeFileSync('./data/jinnCoinUserStore.json', JSON.stringify(jinnCoinUserStore));
                interaction.reply({content: `You have now claimed your daily 100 JinnCoins. You now have ${jinnCoinUserStore[interaction.user.id]} JinnCoins`, ephemeral: true});
                dailyCoinUserDates[interaction.user.id] = new Date();
                fs.writeFileSync('./data/dailyCoinUserDates.json', JSON.stringify(dailyCoinUserDates));
            } else {
                interaction.reply({content: `It hasn't been 24 hours yet :( come back later`, ephemeral: true});
            }
        } else {
            dailyCoinUserDates[interaction.user.id] = new Date();
            jinnCoinUserStore[interaction.user.id] += 100
            fs.writeFileSync('./data/jinnCoinUserStore.json', JSON.stringify(jinnCoinUserStore));
            interaction.reply({content: `You have now claimed your daily 100 JinnCoins. You now have ${jinnCoinUserStore[interaction.user.id]} JinnCoins`, ephemeral: true});
            fs.writeFileSync('./data/dailyCoinUserDates.json', JSON.stringify(dailyCoinUserDates));
        }
        break;
    }
})

const job = schedule.scheduleJob('0 18 * * SAT', startCorpa);

function startCorpa(){
    console.log('corpa has been initiated');
        if (!corpaStarted){
            corpaTimer = 60;
            corpaStarted = true;  

            client.channels.fetch('1197001022204297357')
            .then(async channel => {
                corpaMessage = await channel.send({content: '<@&1198113125489197217>', embeds: [corpaEmbed]});
                corpaInterval = setInterval(() => {
                    corpaTimer--;
                    corpaEmbed.data.fields[2].value = '\n**Time Left:**\n' + corpaTimer + ' mins';
                    corpaMessage.edit({content: '<@&1198113125489197217>', embeds: [corpaEmbed]});
                }, 60000)
            })
            
            setTimeout(() => {
                clearInterval(corpaInterval);
                endCorpa()
                corpaStarted = false;
            }, 3600000);
        } else {
            interaction.reply({content: 'corpa has already been started', ephemeral: true});
        }
}

function endCorpa(){
    buyWon = (Math.floor(Math.random() * 2) == 0);
    if (buyWon){
        console.log('Buy has won the corpa');
        corpaMessage.edit({embeds: [buyWinEmbed]})
        for (const user in usersBetBuy){
            console.log(`gave ${user} ${Math.floor(usersBetBuy[user] + (sellBetTotal*(usersBetBuy[user]/buyBetTotal)))} coins`)
            jinnCoinUserStore[user] += Math.floor(usersBetBuy[user] + (sellBetTotal*(usersBetBuy[user]/buyBetTotal)));
            client.users.send(user, `Congratulations! You won ${Math.floor(usersBetBuy[user] + (sellBetTotal*(usersBetBuy[user]/buyBetTotal)))} JinnCoins! Your new total is ${jinnCoinUserStore[user]}`)
            fs.writeFileSync('./data/jinnCoinUserStore.json', JSON.stringify(jinnCoinUserStore));
        }
        for (const user in usersBetSell){
            client.users.send(user, `ggs. Maybe next time! Your current amount of JinnCoins is ${jinnCoinUserStore[user]}`)
        }
    } else {
        console.log('Sell has won the corpa');
        corpaMessage.edit({embeds: [sellWinEmbed]})
        for (const user in usersBetSell){
            console.log(`gave ${user} ${Math.floor(usersBetSell[user] + (buyBetTotal*(usersBetSell[user]/sellBetTotal)))} coins`)
            jinnCoinUserStore[user] += Math.floor(usersBetSell[user] + (buyBetTotal*(usersBetSell[user]/sellBetTotal)));
            client.users.send(user, `Congratulations! You won ${Math.floor(usersBetSell[user] + (buyBetTotal*(usersBetSell[user]/sellBetTotal)))} JinnCoins! Your new total is ${jinnCoinUserStore[user]}`)
            fs.writeFileSync('./data/jinnCoinUserStore.json', JSON.stringify(jinnCoinUserStore));
        }
        for (const user in usersBetBuy){
            client.users.send(user, `ggs. Maybe next time! Your current amount of JinnCoins is ${jinnCoinUserStore[user]}`)
        }
    }
    corpaEmbed = new EmbedBuilder()
    .setColor(0x21aa48)
    .setTitle('CORPA')
    .setDescription('Corpa has begun')
    .setAuthor({name: 'Corpa', iconURL: 'https://pbs.twimg.com/media/FdC-dP1WAAAULq_.png'})
    .addFields(
        { name: 'To bet on buy:' + '\u2800'.repeat(3), value: 'Do /buy\n\n**Coins on buy:**\n0 Jinn Coins', inline: true},

        { name: 'To bet on sell:' + '\u2800'.repeat(3), value: 'Do /sell\n\n**Coins on sell:**\n0 Jinn Coins', inline:true},
        { name: '\u2800', value: '\n**Time Left:**\n30 mins', inline: true},
    )
    sellBetTotal = 0;
    buyBetTotal = 0;
    usersBetSell = {};
    usersBetBuy = {};
}

client.on('messageCreate', (message) => {    
    if (message.author.bot) return;

    switch (message.content.toLowerCase()){
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
            message.reply({content: '<@&1198113125489197217>', embeds: [corpaEmbed]})
            break;
        case 'date':
            //message.reply(mostRecentUploadDate.toString());
            break;
    }
}
);


async function startDiscordBot(){
    client.login(process.env.TOKEN);
}

module.exports = startDiscordBot;