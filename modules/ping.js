module.exports = {
	init: () => {},
	commands: {
		ping: {func: (cl, msg, text) => {msg.reply('pong!');}, desc: 'ping-pong!', category: 'General commands'}
	}
};