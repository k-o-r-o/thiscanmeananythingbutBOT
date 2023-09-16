function bagMe(message) {
    if (message.content === 'bag me') {
        message.channel.send("<:thiscanmeananything:1151663864589594725>");
    } else if (message.content === 'Bag me') {
        message.channel.send("<:thiscanmeananything:1151663864589594725>");
    } else if (message.content === 'BAG ME') {
        message.channel.send("<:thiscammeananythingbutscared:1151674928098185336>");
    }
}

module.exports = { bagMe };