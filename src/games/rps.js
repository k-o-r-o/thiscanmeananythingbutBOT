
async function playRPS(client, message) {
    try {
        // Check if the message is in the 'bots' channel and starts with the command ~play rps
        if (message.channel.name === 'bots' && message.content === '~play rps') {
            // Send the emoji options for rock, paper, and scissors
            const emojiOptions = 'Select your emoji\nHas to be right facing:\n' +
                ' <:scissorsP:1151694820977410138>: Scissors\n' +
                '<:rockP:1151694981682171935>: Rock\n' +
                ' <:paperP:1151695081254948894>: Paper';
            await message.channel.send(emojiOptions);

            // Collect the user's choice
            const filter = (user) => user.author.id === message.author.id;
            const collector = message.channel.createMessageCollector({ filter, time: 30000 }); // Allow 30 seconds for a response

            collector.on('collect', async (userMessage) => {
                const userChoice = userMessage.content;

                // Check if the user's choice is a valid emoji
                if (
                    userChoice === '<:scissorsP:1151694820977410138>' ||
                    userChoice === '<:rockP:1151694981682171935>' ||
                    userChoice === '<:paperP:1151695081254948894>'
                ) {
                    // Generate a random choice for the bot
                    const choices = ['<:botscissors:1151694917962317824>', '<:botrock:1151695022572437554>', '<:botpaper:1151695145331327056>'];
                    const botChoice = choices[Math.floor(Math.random() * 3)];

                    let result;

                    // Determine the result of the game
                    if (
                        (userChoice === '<:scissorsP:1151694820977410138>' && botChoice === '<:botscissors:1151694917962317824>') ||
                        (userChoice === '<:rockP:1151694981682171935>' && botChoice === '<:botrock:1151695022572437554>') ||
                        (userChoice === '<:paperP:1151695081254948894>' && botChoice === '<:botpaper:1151695145331327056>')
                    ) {
                        result = 'It\'s a tie!';
                    } else if (
                        (userChoice === '<:scissorsP:1151694820977410138>' && botChoice === '<:botpaper:1151695145331327056>') ||
                        (userChoice === '<:rockP:1151694981682171935>' && botChoice === '<:botscissors:1151694917962317824>') ||
                        (userChoice === '<:paperP:1151695081254948894>' && botChoice === '<:botrock:1151695022572437554>')
                    ) {
                        result = '**You win! 👑**';
                    } else {
                        result = '**Bot wins! 😭**';
                    }

                    // Send the result
                    await message.channel.send(`You chose: ${userChoice}\nBot chose: ${botChoice}\n${result}`);
                } else {
                    // Invalid choice
                    await message.channel.send('Invalid emoji choice. Please select from the provided emojis.');
                }

                // Stop collecting messages
                collector.stop();
            });

            collector.on('end', (collected, reason) => {
                if (reason === 'time') {
                    // If the collector times out, inform the user
                    message.channel.send('You took too long to make a choice. Game canceled.');
                }
            });
        }
    } catch (error) {
        console.error('An error occurred while playing Rock, Paper, Scissors:', error);
    }
}

module.exports = { playRPS };