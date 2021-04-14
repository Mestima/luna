'use strict';

const PastebinAPI = require('pastebin-js');
const { pastebinToken } = require('../config.json');

var pb = new PastebinAPI(pastebinToken);

var pastebin = (msg, text) => {
	if (text[1].toLowerCase() == 'get') {
		if (text.length < 3) {
			msg.reply("not enought arguments use this command.\nTry to use 'help' command.");
			return;
		}
		
		pb.getPaste(text[2])
			.then(function (data) {
				msg.reply('\n```' + data + '```');
			})
			.fail(function (err) {
				msg.reply('cannot find paste: ' + text[2]);
				console.log(err);
			});
	}
	
	if (text[1].toLowerCase() == 'post') {
		if (text.length < 4) {
			msg.reply("not enought arguments use this command.\nTry to use 'help' command.");
			return;
		}
		
		var content = text.slice(3).join(' ');
		pb.createPaste(content, text[2].split('-').join(' '))
			.then(function (data) {
				msg.reply('your paste: ' + data);
			})
			.fail(function (err) {
				msg.reply('something went wrong!');
				console.log(err);
			});
	}
	
	/*
	if (text[1].toLowerCase() == 'delete') {
		if (text.length < 3) {
			msg.reply("not enought arguments use this command.\nTry to use 'help' command.");
			return;
		}

		pb.deletePaste(text[2])
			.then(() => {
				msg.reply(`paste ${text[2]} deleted!`);
			})
			.fail((err) => {
				msg.reply(`error, cannot delete paste ${text[2]}`);
				console.log(err);
			});
	}
	*/
};

module.exports = pastebin;

