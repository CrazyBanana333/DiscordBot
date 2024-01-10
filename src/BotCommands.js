const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");
require('dotenv').config();

const commands = [
    {
        name: 'announce',
        description: 'Makes an announcement on the bots behalf in your channel of choosing',
        options: [
            {
                name: 'message',
                description: 'Message you want to send',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'channel',
                description: 'The channel you want to send the message in',
                type: ApplicationCommandOptionType.Channel,
                required: true,
            },
        ],
    }
]

const rest = new REST ({ version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID),
            {body : commands}
        );
        console.log('Slash commands were registered successfully!');
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();