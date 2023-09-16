// Define your function for temp alerts
function handleTempAlerts(message) {
    try {
        if (message.channel.name === 'bots') {
            // Check if the message starts with '~add temp' and contains 'pxls.space'
            if (message.content.startsWith('~add temp') && message.content.includes('pxls.space')) {
                // Extract the link from the message content
                const link = message.content.split(' ').slice(2).join(' ');

                // Find the bag channel
                const bagChannel = message.guild.channels.cache.find(channel => channel.name === 'temps');
                message.channel.send(`Check #temps`);

                // Check if the bag channel exists
                if (bagChannel) {
                    bagChannel.send("__**New Bag Just Dropped @Alerts**__");
                    bagChannel.send(link); // Send the extracted link
                } else {
                    console.log('temps channel not found.');
                }
            } else if (message.content.includes('pxls.space') && !message.content.includes('template') && !message.attachments.size) {
                message.channel.send(`Thats not a temp <:thiscanmeananything:1151663864589594725>`);
            }
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

module.exports = { handleTempAlerts };