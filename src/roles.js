module.exports = (client) => {
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
};