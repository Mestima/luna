'use strict';

const sql = require('mysql');
const md5 = require('md5');
const chalk = require('chalk');
const request = require('request');
const fs = require('fs');
const { dbinfo } = require('../config/config');

const download = (url, path) => {
	request.get(url)
		.on('error', console.error)
		.pipe(fs.createWriteStream(path));
}

const db = sql.createConnection({
	host: dbinfo.host,
	port: dbinfo.port,
	user: dbinfo.user,
	password: dbinfo.pass,
	database: dbinfo.db
});

db.connect((err) => {
	if (err) {
		console.log(chalk.hex("#ff2200").bold("DB Error: could not connect to database!"));
		console.log(err);
		return;
	}
	
	console.log(chalk.hex("#00ff44").bold("DB: connected!"));
});

const newUser = (msg, text) => {
	if (!text[1]) {
		msg.reply('You have to specify command. See `~help` for more information.');
		return;
	}
	
	if (text[1] == 'create') {
		if (!text[2]) {
			msg.reply('You have to specify nickname. See `~help` for more information.');
			return;
		}
		
		if (!text[3]) {
			msg.reply('You have to specify password. See `~help` for more information.');
			return;
		}
		
		let nick = text[2];
		let pwd = md5(text[3]);
		let uid = msg.author.id;
		let query = `INSERT INTO users (id, nick, password) VALUES ('${uid}', '${nick}', '${pwd}') ON DUPLICATE KEY UPDATE nick = '${nick}', password = '${pwd}'`;
		db.query(query, (err, res, fields) => {
			if (err) {
				msg.reply('Error! Could not connect to database!');
				console.log(err);
				return;
			}
			let author = msg.author.toString();
			msg.channel.send(`${author}, all done!`);
			msg.delete();
		});
	}
	
	if (text[1] == 'skin') {
		let uid = msg.author.id;
		let query = `SELECT * FROM users WHERE id = '${uid}' LIMIT 1`;
		db.query(query, (err, res, fields) => {
			if (err) {
				msg.reply('Error! Could not connect to database!');
				return;
			}
			if (res[0]) {
				let nick = res[0].nick;
				if(msg.attachments.first()) {
					if(msg.attachments.first().contentType == 'image/png') {
						download(msg.attachments.first().url, `./skin/${nick}.png`);
						msg.reply(`Congrats ${nick}! Your skin have been set.`);
					} else {
						msg.reply('Error! Your skin have to be .png format!');
					}
				} else {
					msg.reply('Ops.. Looks like you have forgot to upload your skin :)');
				}
			} else {
				msg.reply('Error! You have no account. Try to create one!');
			}
		});
	}
};

module.exports = {
	init: () => {},
	commands: {
		lc: {func: (cl, msg, text) => {newUser(msg, text);}, descExt: [
			{cmd: 'lc create `nickname` `password`', desc: 'register a new account'},
		//	{cmd: 'lc newpassword `password`', desc: 'change your password'},
			{cmd: 'lc skin (drop your skin.png)', desc: 'upload skin'},
		], category: 'LisoCraft'}
	}
};

