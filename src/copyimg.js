const fs = require('fs');
const { MessageAttachment } = require('discord.js');

module.exports = { copyAllMessages };

async function copyAllMessages(client, message) {
    try {
        console.log(`copyAllMessages called by user: ${message.author.username}`);

        const copiedMessages = [];
        let lastMessageId = null;

        while (true) {
            // Get the next batch of 100 messages from the channel, starting from the last fetched message
            const options = { limit: 100, before: lastMessageId };
            const messages = await message.channel.messages.fetch(options);
            console.log(`Fetched ${messages.size} messages from ${message.channel.name}.`);

            if (messages.size === 0) {
                // No more messages left to fetch, break the loop
                break;
            }

            for (const msg of messages.values()) {
                // Check if the message has a ✅ reaction
                const hasCheckMark = msg.reactions.cache.has('✅');

                // Add a ✅ to the end of the message if it has the reaction
                let messageContent = hasCheckMark ? `${msg.content} ✅` : msg.content;

                // Check for attachments (images)
                if (msg.attachments.size > 0) {
                    for (const attachment of msg.attachments.values()) {
                        // Handle image attachments
                        if (attachment.url) {
                            messageContent += `\n${attachment.url}`;
                        }
                    }
                }

                copiedMessages.push(messageContent);

                // Update the lastMessageId to the ID of the oldest message in the current batch
                lastMessageId = msg.id;
            }
        }

        // Reverse the order of copied messages before writing to the file
        copiedMessages.reverse();

        // Write the modified messages to the 'copy.txt' file
        fs.writeFileSync('copy.txt', copiedMessages.join('\n\n'), { encoding: 'utf-8' });
        console.log(`Copied messages successfully to copy.txt.`);
    } catch (error) {
        console.error('An error occurred while copying messages:', error);
    }
}