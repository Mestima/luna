const ytdl = require('ytdl-core');

var servers = {};

var doPlay = async (connection, msg) => {
	var server = servers[msg.guild.id];
	server.dispatcher = connection.play(await ytdl(server.queue[0], {type: 'opus', filter: 'audioonly', quality: 'highestaudio'}));
	server.queue.shift();
	server.dispatcher.on('finish', () => {
		if (server.queue[0]) {
			msg.channel.send(`:play_pause: ${server.queue[0]}`);
			doPlay(connection, msg);
		} else {
			connection.disconnect();
			delete servers[msg.guild.id];
		}
	});
	servers[msg.guild.id] = server;
}

var play = (msg, text) => {
	if (!text[1]) {
		msg.reply('you have to provide a link!');
		return;
	}
	
	if (!msg.member.voice.channel) {
		msg.reply('you must be in a voice channel to play the music!');
		return;
	}

	var id = msg.guild.id;
	if (!servers[id]) {
		servers[id] = {
			queue: []
		}
	}

	servers[id].queue.push(text[1]);
	var lockedLink = '`' + text[1] + '`';
	if (!servers[id].connection) {
		msg.member.voice.channel.join()
		.then(connection => {
			msg.channel.send(`:white_check_mark: Successfully connected to channel ${msg.member.voice.channel.name}`);
			msg.channel.send(`:white_check_mark: Added to queue -> ${lockedLink}`);
			servers[id].connection = connection;
			doPlay(connection, msg);
		});
	} else {
		if (!msg.client.voice.channel) {
			servers[id].connection.disconnect();
			delete servers[id];
			servers[id] = {
				queue: []
			}
			servers[id].queue.push(text[1]);
			msg.member.voice.channel.join()
			.then(connection => {
				msg.channel.send(`:white_check_mark: Successfully connected to channel ${msg.member.voice.channel.name}`);
				msg.channel.send(`:white_check_mark: Added to queue -> ${lockedLink}`);
				servers[id].connection = connection;
				doPlay(connection, msg);
			});
		} else {
			msg.channel.send(`:white_check_mark: Added to queue -> ${lockedLink}`);
		}
	}
}

module.exports = play;
