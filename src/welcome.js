//give new users a welcome message in welcome channel
// welcome.js

function welcomeNewMember(member) {
    try {
        const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome');
        welcomeChannel.send(`Be one with the bag, ${member}!`);
    } catch (error) {
        console.error('An error occurred while welcoming a new member:', error);
    }
}

module.exports = { welcomeNewMember };
