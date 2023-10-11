const fs = require('fs');
module.exports = { pasteCopiedMessages };

async function pasteCopiedMessages(client, message) {
    try {
        console.log(`pasteCopiedMessages called by user: ${message.author.username}`);

        // Read the contents of the 'copy.txt' file
        const copiedMessages = fs.readFileSync('copy.txt', 'utf-8').split('\n');
        
        if (copiedMessages.length === 0) {
            // If there are no messages to paste, send an error message
            message.channel.send("There are no copied messages to paste.");
            return;
        }

        // Send each line from 'copy.txt' as a separate message in the target channel
        for (const copiedMessage of copiedMessages) {
            if (copiedMessage.trim() !== '') {
                await message.channel.send(copiedMessage);
            }
        }

        console.log(`Copied messages pasted successfully to ${message.channel.name}.`);
    } catch (error) {
        console.error('An error occurred while pasting copied messages:', error);
    }
}