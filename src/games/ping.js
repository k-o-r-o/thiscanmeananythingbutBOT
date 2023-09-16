//if you send the pingpong emoji it will send one back
function ping(message) {
    if (message.content === '<:ping:1151689834688159765>') {
        message.channel.send("<:transparent:1151690597745315911><:pong:1151689637300031532>");
    }
}

module.exports = { ping };