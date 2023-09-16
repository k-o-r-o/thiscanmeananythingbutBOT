module.exports = { copyPastMessages };
function copyPastMessages(client, channelNameToCopy) {
    client.on('messageCreate', async (message) => {
        try {
            // Check if the message is in the 'bots' channel and starts with the command ~copy
            if (message.channel.name === 'bots' && message.content.startsWith('~copy')) {
                // Extract the channel name to copy
                const commandParts = message.content.split(' ');
                if (commandParts.length !== 2) {
                    message.channel.send('Invalid command format. Use ~copy [channel name]');
                    return;
                }
                const channelNameToCopy = commandParts[1];

                // Call the copyPastMessages function to start copying
                copyPastMessages(client, channelNameToCopy);
            }
        } catch (error) {
            console.error('An error occurred while copying past messages:', error);
        }
    });

    async function copyPastMessages(client, channelNameToCopy) {
        try {
            // Find the source and target channels
            const sourceGuild = client.guilds.cache.get('1059659642495582289'); // Replace with your guild ID
            const sourceChannel = sourceGuild.channels.cache.find(channel => channel.name === channelNameToCopy);
            const targetChannel = sourceGuild.channels.cache.find(channel => channel.name === 'test-2'); // Target channel

            if (!sourceChannel) {
                console.error(`Source channel '${channelNameToCopy}' not found.`);
                return;
            }
            if (!targetChannel) {
                console.error('Target channel "test-2" not found.');
                return;
            }

            // Initialize an array to store copied messages
            const copiedMessages = [];

            // Fetch messages from the source channel, starting from the beginning
            let lastMessageId = null;
            let fetchComplete = false;

            while (!fetchComplete) {
                const options = { limit: 100, before: lastMessageId };
                const messages = await sourceChannel.messages.fetch(options);

                // If there are no more messages, set fetchComplete to true
                if (messages.size === 0) {
                    fetchComplete = true;
                    continue;
                }

                // Update the lastMessageId to the ID of the oldest message in the current batch
                lastMessageId = messages.last().id;

                // Iterate through the fetched messages and send them to the target channel
                for (const pastMessage of messages.values()) {
                    // Check if the past message is not a system message (e.g., bot's message)
                    if (!pastMessage.system) {
                        // Construct the message in the format 'User: message'
                        const formattedMessage = `${pastMessage.author.username}: ${pastMessage.content}`;
                        await targetChannel.send(formattedMessage);

                        // Add the formatted message to the array
                        copiedMessages.push(formattedMessage);
                    }
                }
            }

            console.log(`Messages from ${channelNameToCopy} copied successfully to test-2.`);

            // Save the copied messages to a text file
            fs.writeFileSync('copy.txt', copiedMessages.join('\n'), 'utf-8');
            console.log('Copied messages saved to copy.txt');
        } catch (error) {
            console.error('An error occurred while copying past messages:', error);
        }
    }
};