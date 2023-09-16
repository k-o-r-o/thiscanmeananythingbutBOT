//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
require('dotenv').config();
const {Client, IntentsBitField} = require('discord.js');
const fs = require('fs');
const userStats = new Map();
let lastMessageId = null; // Initialize the variable to keep track of the last copied message ID
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.MessageContent,

    ]
});

// Import your command handling functions
const { playRPS } = require('./games/rps.js');
const { bagMe } = require('./bagme.js');
const { copyPastMessages } = require('./copy.js');
const { ping } = require('./games/ping.js');
const { handleTempAlerts } = require('./tempalerts.js');
const { welcomeNewMember } = require('./welcome.js');

client.on('ready', () => {
    console.log(`😈 ${client.user.tag} is online!`);
    // Other initialization code
});

client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase() === 'bag me') {
        bagMe(message);
    }
    else if (message.content == '<:ping:1151689834688159765>') {
        ping(message);
    }
    try {
        // Check if the message is in the 'bots' channel
        if (message.channel.name === 'bots') {
            // Check for different commands based on message content
            if (message.content === '~play rps') {
                playRPS(client, message);
            } else if (message.content.startsWith('~copy')) {
                copyPastMessages(client, message); // Call the copyMessages function
            }
            else if (message.content.startsWith('~add temp')) {
                handleTempAlerts(message);
            }
            // You can add more command checks here
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
});

//welcome.js
client.on('guildMemberAdd', (member) => {
    welcomeNewMember(member); // Call the welcome function
});

//roles.js
client.on('guildMemberAdd', (member) => {
    randomNum();
    const roleNames = ['happybag', 'sadbag', 'angrybag'];
    if (Num >= 1 && Num <= 3) {
        const roleName = roleNames[Num - 1]; // Adjust for 0-based index
        const newBagRole = member.guild.roles.cache.find(role => role.name === roleName);
        member.roles.add(newBagRole);
    }
    const newBagRole = member.guild.roles.cache.find(role => role.name === 'newbag');
    member.roles.add(newBagRole);

    setTimeout(() => {
        member.roles.remove(newBagRole);
    }, 1209600000);
});


//use my token in src/.env
client.login(process.env.TOKEN);


function randomNum() {
    Num = Math.floor(Math.random() * 3) + 1;
}
